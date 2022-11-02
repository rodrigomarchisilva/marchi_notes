<!-- markdownlint-disable MD024 -->

# Sequelize

## Instalação e primeiras configurações

~~~properties
npm init -y
npm i nodemon sequelize mysql2 dotenv
npm i -D sequelize-cli
npx sequelize-cli init
~~~

* **Criar:** .env
* **Renomear:** config.json -> config.js
* **Substituir:** Código do config.js
* **Alterar:** Linha 8 do models/index.js para o importar arquivo config.js

---

## Ajustes no arquivo config/config.json

* **username, password e database:** Os do BD;
* **host:** Por ser local, o padrão é 127.0.0.1;
* **dialect:** O BD utilizado, por exemplo, "mysql".

---

## Verificações no MySQL

~~~sql
mysql -u root -p
show databases;
show tables from db_name;
show columns from table_name;
~~~

---

## Comandos sequelize

### Ajuda

* **Cheatsheet:** <https://github.com/tryber/Trybe-CheatSheets/tree/master/backend/sequelize/setup>
* **Documentação do Sequelize:** <https://sequelize.org/master/manual/query-interface.html>
* **Listar comandos**

~~~properties
npx sequelize --help
~~~

### Banco de Dados

* **Criar**

~~~properties
npx sequelize db:create
~~~

* **Dropar**

~~~properties
npx sequelize db:drop
~~~

### Criar a tabela no DB do sequelize

* **Sintaxe**

~~~properties
npx sequelize model:generate --name NomeDoModel --attributes nomeDoAtributo:string,outroAtributo:string
~~~

> * **--name:** Nome da tabela, mas no singular
> * **--attributes:** Atributos da tabela, separados por vírgula

* **Gerar**

~~~properties
npx sequelize model:generate --name User --attributes fullName:string
~~~

* **Arquivos criados**

~~~properties
models/user.js e migrations/XXXXXXXXXXXXXX-create-users.js
~~~

### migrations

* **Gerar**

~~~properties
npx sequelize migration:generate --name add-column-phone-table-users
~~~

* **Executar**

~~~properties
npx sequelize db:migrate
~~~

> **Arquivo criado:** `migrations/XXXXXXXXXXXXXX-add-column-phone-table-users.js`

* **Reverter**

~~~properties
npx sequelize db:migrate:undo
~~~

* **Reverter todas**

~~~properties
npx sequelize db:migrate:undo:all
~~~

* **Reverter específica**

~~~properties
npx sequelize db:migrate:undo --to XXXXXXXXXXXXXX-create-users.js
~~~

### seeders

* **Gerar**

~~~properties
npx sequelize seed:generate --name users
~~~

* **Executar**

~~~properties
npx sequelize db:seed:all
~~~

> **Arquivo criado:** `seeders/XXXXXXXXXXXXXX-users.js`

* **Reverter**

~~~properties
npx sequelize db:seed:undo:all
~~~

---

## Substituir programação orientada a objetos por funcional no models/user.js

~~~js
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return User;
};

module.exports = User;
~~~

---

## index.js

~~~js
const express = require('express');
const bodyParser = require("body-parser");

const userController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/user', userController);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
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

## seeders

### 20220201220504-users.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // Código inserido pela Trybe
    return queryInterface.bulkInsert('Users',
    [
      {
        fullName: 'Leonardo',
        email: 'leo@test.com',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        fullName: 'JEduardo',
        email: 'edu@test.com',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // Código inserido pela Trybe
    return queryInterface.bulkDelete('Users', null, {});
  }
};
~~~

---

## migrations

### 20220131193251-create-user.js

~~~js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      // adicionado um novo campo 'email' como feito no model/user.js
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
~~~

### 20220201213223-add-column-phone-table-users.js

~~~js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Lógica inserida pela Trybe
    await queryInterface.addColumn('Users', 'phone_num', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Lógica inserida pela Trybe
    await queryInterface.removeColumn('Users', 'phone_num');
  }
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

### user.js

~~~js
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     fullName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

// Substituindo a programação orientada a objetos por programação funcional

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    // Aqui o datatype da coluna criada é inserido
    phone_num: DataTypes.STRING,
  });

  return User;
};

module.exports = User;
~~~

---

## controllers

### userController.js

~~~js
const express = require('express');
// A importação do User é feita pela pasta e não pelo arquivo User.js, porque tem um index.js lá
const { User } = require('../models');
const router = express.Router();

// Este endpoint usa o método findAll do Sequelize para retorno todos os users.
router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
});

// Este endpoint usa o método findByPk do Sequelize para buscar um usuário pelo id.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método findOne do Sequelize para buscar um usuário pelo id e email.
// URL a ser utilizada para o exemplo http://localhost:3000/user/search/1?email=aqui-o-email
router.get('/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await User.findOne({ where: { id, email }});

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
router.post('/', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const newUser = await User.create({ fullName, email });

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método update do Sequelize para alterar um usuário no banco.
router.put('/:id', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;

    const [updateUser] = await User.update(
      { fullName, email },
      { where: { id } },
    );

    console.log(updateUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    if(!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    console.log(deleteUser) // confira o que é retornado quando o user com o id é ou não encontrado;

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
~~~
