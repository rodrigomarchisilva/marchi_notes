<!-- markdownlint-disable MD024 -->

# Associações do sequelize

## Summary

### 1:1 - Um para um

* **hasOne ->** Tem um relacionamento 1:1 (origem da foreignKey)
* Cada foreign key tem um relacionamento 1:1

> **Exemplo:** Cada pessoa tem uma foto

* **belongsTo ->** Pertencente a um relacionamento 1:1 (recebe a foreignKey)
* Cada dado relacionado da tabela herdeira tem um relacionamento 1:1 com a foreignKey

> **Exemplo:** Cada foto pertence a uma pessoa

---

### 1:N - Um para muitos

* **hasMany ->** Tem um relacionamento 1:N (origem da foreignKey)
* Cada foreign key tem um relacionamento 1:N com a tabela herdeira

> **Exemplo:** Uma pessoa tem varias fotos

* **belongsToMany ->** Pertencente a um relacionamento 1:N (recebe as foreignKeys)
* Cada dado relacionado da tabela herdeira tem um relacionamento 1:N com a foreignKey

> **Exemplo:** Uma foto pertence a varias pessoas

---

### N:N - Muitos para muitos

* **belongsToMany ->** Pertencente a um relacionamento N:N (recebe as foreignKeys)
* Cria os models, gera os migrations, altera o necessário, gera os seeds separadamente na ordem de foreignKeys, altera o necessário, executa os migrations e os seeds

> **Exemplo:** Muitas pessoas podem estar em uma foto e muitas fotos podem ter a mesma pessoa. Usa-se uma tabela de junção.

---

### Utilização dos relacionamentos

* **Eager Loading:** Carrega todos os dados na mesma request. Todas as informações são trazidas, independente se serão usadas ou não. Útil quando se precisa de todos os dados das entidades envolvidas.

* **Lazy Loading:** Consiste em não especificar uma propriedade includes no momento de realizar a query no banco. Assim, cria-se a possibilidade de ter dois usos para o mesmo endpoint.

---

### ACID

* **Atomic (atomicidade):** Ou todas operações têm sucesso, ou a transação toda falha;
* **Consistent (consistência):** Todas regras do BD devem ser respeitadas (estrutura de tabelas, chaves estrangeiras, campos restritos etc.);
* **Isolated (isolamento):** Uma transação não pode interferir na outra. Cada uma deve ser isolada das demais;
* **Durability (durabilidade):** Com a transação finalizada, os dados devem ser alterados permanentemente, só podendo ser alterados por outra transação.

---

## index.js

~~~js
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const { Address, Employee } = require('./models');
const { Book, User } = require('./models');
const config = require('./config/config');

const app = express();
app.use(bodyParser.json());
const sequelize = new Sequelize(config.development);

app.get('/employees', async (_req, res) => {
  try {
    const employees = await Employee.findAll({
      include: { model: Address, as: 'addresses' },
    });

    return res.status(200).json(employees);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  };
});

// Eager loading
app.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
        where: { id },
        // Excluir number do retorno da requisição
        include: [{ model: Address, as: 'addresses', attributes: { exclude: ['number'] } }],
      });

    if (!employee)
      return res.status(404).json({ message: 'Funcionário não encontrado' });

    return res.status(200).json(employee);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
});

// Lazy loading
// app.get('/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
/* const employee = await Employee.findOne({ where: { id } }); */

//     if (!employee)
//       return res.status(404).json({ message: 'Funcionário não encontrado' });

/*        if (req.query.includeAddresses === 'true') {
         const addresses = await Address.findAll({ where: { employeeId: id } });
         return res.status(200).json({ employee, addresses });
       } */

//     return res.status(200).json(employee);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado' });
//   };
// });

// N:N
app.get('/usersbooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { userId: id },
      include: [{ model: Book, as: 'books', through: { attributes: [] } }],
    });

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
});

/* // Transactions sem tratamento -> Erro de inconsistência
app.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, age, city, street, number } = req.body;

    const employee = await Employee.create({ firstName, lastName, age });

    await Address.create({ city, street, number, employeeId: employee.id });

    return res.status(201).json({ message: 'Cadastrado com sucesso' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
}); */

/* // Unmanaged transactions -> Indica-se manualmente a circunstância em que uma transação deve ser finalizada ou revertida
app.post('/employees', async (req, res) => {
  // Primeiro iniciamos a transação
  const t = await sequelize.transaction();

  try {
    const { firstName, lastName, age, city, street, number } = req.body;

    // Depois executamos as operações
    const employee = await Employee.create(
      { firstName, lastName, age },
      { transaction: t },
    );

    await Address.create(
      { city, street, number, employeeId: employee.id },
      { transaction: t },
    );

    // Se chegou até essa linha, quer dizer que nenhum erro ocorreu.
    // Com isso, podemos finalizar a transação usando a função `commit`.
    await t.commit();

    return res.status(201).json({ message: 'Cadastrado com sucesso' });
  } catch (e) {
    // Se entrou nesse bloco é porque alguma operação falhou.
    // Nesse caso, o sequelize irá reverter as operações anteriores com a função rollback, não sendo necessário fazer manualmente
    await t.rollback();
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
}); */

// Managed transactions -> O próprio Sequelize controla quando deve finalizar ou reverter uma transação
app.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, age, city, street, number } = req.body;

    const result = await sequelize.transaction(async (t) => {
      const employee = await Employee.create({
        firstName, lastName, age
      }, { transaction: t });

      await Address.create({
        city, street, number, employeeId: employee.id
      }, { transaction: t });

      return res.status(201).json({ message: 'Cadastrado com sucesso' });
    });

    // Se chegou até aqui é porque as operações foram concluídas com sucesso,
    // não sendo necessário finalizar a transação manualmente.
    // `result` terá o resultado da transação, no caso um empregado e o endereço cadastrado
  } catch (e) {
    // Se entrou nesse bloco é porque alguma operação falhou.
    // Nesse caso, o sequelize irá reverter as operações anteriores com a função rollback, não sendo necessário fazer manualmente
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));

module.exports = app;
~~~

---

## config

### config.js

~~~js
require('dotenv').config();

const { MS_UN, MS_PW, MS_DB, MS_HN } = process.env;

const credentials = {
  username: MS_UN,
  password: MS_PW,
  database: MS_DB,
  host: MS_HN,
  dialect: 'mysql',
};

module.exports = {
  development: credentials,
  test: credentials,
  production: credentials,
};
~~~

---

## models

### index.js

~~~js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
~~~

### Address.js

~~~js
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    employeeId: { type: DataTypes.INTEGER, foreignKey: true },
    // A declaração da Foreign Key é opcional no model
  },
  {
    timestamps: false,
    tableName: 'Addresses',
    underscored: true,
  });

  Address.associate = (models) => {
    Address.belongsTo(models.Employee,
      { foreignKey: 'employee_id', as: 'employees' });
  };

  return Address;
};
~~~

### Book.js

~~~js
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookId: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    numberPages: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'Books',
    underscored: true,
  });

  return Book;
};
~~~

### Employee.js

~~~js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'Employees',
    underscored: true,
  });

  // Associações do model Employee
  Employee.associate = (models) => {
    // A tabela Employees tem a foreign key employee_id da tabela Address, que será chamada de addresses (note a letra minúscula)
    Employee.hasOne(models.Address,
      { foreignKey: 'employee_id', as: 'addresses' });
  };

  return Employee;
};
~~~

### User.js

~~~js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'Users',
    underscored: true,
  });

  return User;
};
~~~

### UserBook.js

~~~js
module.exports = (sequelize, _DataTypes) => {
  const UserBook = sequelize.define('UserBook',
    {},
    { timestamps: false },
  );

  UserBook.associate = (models) => {
    models.Book.belongsToMany(models.User, {
      as: 'users',
      through: UserBook,
      foreignKey: 'book_id',
      otherKey: 'user_id',
    });
    models.User.belongsToMany(models.Book, {
      as: 'books',
      through: UserBook,
      foreignKey: 'user_id',
      otherKey: 'book_id',
    });
  };

  return UserBook;
};
~~~

---

## migrations

### 20220202181147-create-employees.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name',
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.dropTable('Employees');
  }
};
~~~

### 20220202181512-create-addresses.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onUpdate e onDelete configuram o que deve acontecer ao atualizar ou excluir um usuário. Com CASCADE, todos os produtos daquele usuário serão alterados ou excluídos.
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'employee_id',
        // references indica que o campo employeeId é uma foreign key
        references: {
          // model indica a tabela de origem da foreign key
          model: 'Employees',
          // key indica qual coluna da tabela estrangeira deve ser utilizada para nossa foreign key
          key: 'id',
        },
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.dropTable('Addresses');
  }
};
~~~

### 20220203211047-create-books.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      bookId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'book_id',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      releaseYear: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'release_year',
      },
      numberPages: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'number_pages',
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Books');
  }
};
~~~

### 20220203211047-create-users.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name',
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
~~~

### 20220203211048-create-user-books.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserBooks', {
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
        field: 'book_id',
        references: {
          model: 'Books',
          key: 'book_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('UserBooks');
  }
};
~~~

---

## seeders

### 20220202201432-employees.js

~~~js
'use strict';

/* Modo tradicional */

// module.exports = {
//   async up (queryInterface, _Sequelize) {
//      return queryInterface.bulkInsert('Employees',
//      [
//        {
//          first_name: 'Marcos',
//          last_name: 'Zuck',
//          age: 49,
//        },
//        {
//          first_name: 'Fred',
//          last_name: 'Mercurio',
//          age: 19,
//        },
//        {
//          first_name: 'Ayrton',
//          last_name: 'Keno',
//          age: 51,
//        },
//        {
//          first_name: 'Robin',
//          last_name: 'Mathias',
//          age: 63,
//        },
//      ],
//      {},
//    );
//   },

//   async down (queryInterface, _Sequelize) {
//     return queryInterface.bulkDelete('Employees', null, {});
//   }
// };

/* Eager loading*/

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Employees',
      [
        { first_name: 'Marcos', last_name: 'Zuck', age: 49 },
        { first_name: 'Fred', last_name: 'Mercurio', age: 19 },
        { first_name: 'Ayrton', last_name: 'Keno', age: 51 },
        { first_name: 'Robin', last_name: 'Mathias', age: 63 },
        { first_name: 'Antonio', last_name: 'Augusto', age: 18 },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {});
  },
};
~~~

### 20220202201433-addresses.js

~~~js
'use strict';

/* Modo tradicional */

// module.exports = {
//   async up (queryInterface, _Sequelize) {
//      return queryInterface.bulkInsert('Addresses',
//      [
//        {
//          city: 'Belo Horizonte',
//          street: 'Rua Flórida',
//          number: 1080,
//          employee_id: 1,
//        },
//        {
//          city: 'São Paulo',
//          street: 'Avenida Paulista',
//          number: 1980,
//          employee_id: 2,
//        },
//        {
//          city: 'Fortaleza',
//          street: 'Rua das Enseadas',
//          number: 95,
//          employee_id: 3,
//        },
//        {
//          city: 'Belo Horizonte',
//          street: 'Rua Andaluzita',
//          number: 131,
//          employee_id: 4,
//        },
//        {
//          city: 'Curitiba',
//          street: 'Rua Fria',
//          number: 101,
//          employee_id: 4,
//        },
//      ],
//      {},
//    );
//   },

//   async down (queryInterface, _Sequelize) {
//     return queryInterface.bulkDelete('Addresses', null, {});
//   }
// };

/* Eager loading */

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Addresses',
      [
        { city: 'Belo Horizonte', street: 'Rua Florida', number: 1080, employee_id: 1 },
        { city: 'São Paulo', street: 'Avenida Paulista', number: 1980, employee_id: 2 },
        { city: 'Fortaleza', street: 'Rua das Enseadas', number: 95, employee_id: 3 },
        { city: 'Belo Horizonte', street: 'Rua Andaluzita', number: 131, employee_id: 4 },
        { city: 'Belo Horizonte', street: 'Rua Vicente Alvarenga', number: 80, employee_id: 1 },
        { city: 'Curitiba', street: 'Rua Fria', number: 101, employee_id: 5 },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {});
  },
};
~~~

### 20220203211430-books.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Books',
      [
        { name: 'Livro A', release_year: 2020, number_pages: 111 },
        { name: 'Livro B', release_year: 2019, number_pages: 222 },
        { name: 'Livro C', release_year: 2018, number_pages: 333 },
        { name: 'Livro D', release_year: 2017, number_pages: 444 },
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
~~~

### 20220203211500-users.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Users',
      [
        { first_name: 'Bárbara', last_name: 'Silva', age: 16 },
        { first_name: 'Carlos', last_name: 'Santos', age: 24 },
        { first_name: 'Danilo', last_name: 'Henrique', age: 32 },
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
~~~

### 20220203211512-user-books.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('UserBooks',
      [
        { user_id: 1, book_id: 1 },
        { user_id: 1, book_id: 3 },
        { user_id: 2, book_id: 1 },
        { user_id: 2, book_id: 2 },
        { user_id: 3, book_id: 1 },
        { user_id: 3, book_id: 2 },
        { user_id: 3, book_id: 3 },
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('UserBooks', null, {});
  }
};
~~~
