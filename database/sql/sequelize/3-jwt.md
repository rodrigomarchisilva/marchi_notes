<!-- markdownlint-disable MD024 -->

# JWT

## Summary

### Como funciona

1. O navegador pede login e senha;
2. O servidor verifica se o login e senha são válidos;
3. Se sim, o servidor gera dois objetos, tokenInfo (header) + userData e permissions (payload);
4. O navegador coverte o header e o payload em JSON, junta em uma string e usa o algoritmo HMAC para criptografar a string (signature);
5. O navegador cria o token com o header, o payload e a signature;
6. O navegador envia o token ao cliente.

### Na requisição seguinte

1. O navegador envia os dados e o token;
2. O servidor verifica cria novamente a signature;
3. O servidor verifica se as signatures batem;
4. Se sim, o servidor segue coma a requisição.

### HMAC

~~~hash
HMAC(K, m) = hash(K1 + hash(K2 + m))
~~~

* **K:** Chave secreta;
* **m:** Mensagem;
* **hash:** Função de hash escolhida (md5, sha1, sh256, etc.);
* **K1 e K2:** Chaves secretas derivadas da chave original K;
* **+:** Operação de concatenação de strings.

---

### Instalação do JWT

~~~properties
npm i jsonwebtoken
npm i -D mocha chai sinon
npm i -D chai-http
npm i -D nyc (CLI do Istanbul)
~~~

---

### Testes

* **Script**

~~~json
"test": "mocha ./tests/**/*$NAME*.test.js --exit",
~~~

* **BD temporário:** Gerar um banco de dados qualquer definido como BD de development, onde seriam feitas operações de IO.

* **Bibliotecas:** Sequelize Test Helpers <https://www.npmjs.com/package/sequelize-test-helpers?activeTab=readme>

* **Gerar stubs simples direcionando para funções falsas:**
Produzir quase hardcoded, aquilo que se espera da consulta de um modelo do Sequelize (X retorna Y).

* **Plugin Chai HTTP:**
<https://www.chaijs.com/plugins/chai-http/>

---

### Simulação de chamadas http com o método request

* Podemos chamar um `GET` que deve consumir nossa api, sem que pra isso precisemos subir ela manualmente

~~~js
const response = await chai.request(server)
  .get('/exemplo');
~~~

* Da mesma forma, podemos chamar um `POST` passando um `body` e/ou um `header`, por exemplo

~~~js
const response = await chai.request(server)
  .post('/favorite-foods')
  .set('X-API-Key', 'foobar')
  .send({
      name: 'jane',
      favoriteFood: 'pizza'
  });
~~~

---

* **callFake ->** Substitui a chamada do método original, por aquela passada como parâmetro.
* **Conjunto before e after ->** Está um nível antes do teste específico, no escopo principal, pois é possível definir a aplicação e restauração do stub somente uma vez, e utilizar em mais de um teste.

---

### Critérios relevantes da cobertura

* **Cobertura de Funções / Function Coverage:** Cada função/sub-rotina do script foi acionado/chamado?
* **Cobertura de Afirmações / Statement Coverage:** Cada afirmação/definição/comando do script foi executado?
* **Cobertura de Ramificações / Branch Coverage:** Cada situação de ramificação do código (como uma condicional if) foi executada?

* **Script para rodar o nyc**

~~~json
"test": "mocha ./tests --recursive",
"test:coverage": "nyc npm test",
~~~

* **Personalização do script de cobertura:**

~~~json
"test": "mocha ./tests --recursive",
"test:coverage": "nyc --include='src/**/*.js' npm run test",
~~~

> **parâmetro --all:** Para coletar a cobertura de todos os arquivos, mesmo os não referenciados.

Notem aqui, que estamos colocando o código fonte que deve ser coberto (no nosso contexto, seriam /api , /config , /controllers , /migrations , /models e /seeders ) dentro de uma pasta ./src na raiz , para que não seja necessário criar uma lista de exclusão de cobertura (para pasta node_modules ou a própria pasta tests , por exemplo), nesse sentido, também é importante manter a pasta tests na raiz.

* **Script final**

~~~json
"test": "mocha ./tests/**/*$NAME*.test.js --exit",
"test:coverage": "nyc --include='src/**/*.js' npm run test",
~~~

~~~properties
npm run test:coverage
~~~

---

## package.json

~~~json
{
  "name": "api-jwt",
  "version": "1.0.0",
  "main": "./api/server.js",
  "scripts": {
    "prestart": "npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all",
    "start": "nodemon .",
    "test": "mocha ./tests/**/*$NAME*.test.js --exit",
    "test:coverage": "nyc --include='src/**/*.js' npm run test"
  },
  "dependencies": {
    "bcryptjs": "2.4.3",
    "body-parser": "1.19.0",
    "dotenv": "10.0.0",
    "express": "4.17.1",
    "jsonwebtoken": "^8.5.1",
    "moment": "2.29.1",
    "mysql2": "2.3.3",
    "nodemon": "2.0.4",
    "sequelize": "6.15.0",
    "sequelize-cli": "6.4.1"
  },
  "devDependencies": {
    "chai": "^4.3.6",
    "chai-http": "^4.3.0",
    "mocha": "^9.2.0",
    "nyc": "15.1.0",
    "sinon": "^12.0.1"
  }
}
~~~

---

## .sequelizerc

~~~js
const path = require('path');

module.exports = {
  'config': path.resolve('src', 'config', 'config.json'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};
~~~

---

## api

### auth/validateJWT.js

~~~js
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

/* Mesma chave privada que usamos para criptografar o token. Agora, vamos usá-la para descriptografá-lo. Numa aplicação real,
essa chave jamais ficaria hardcoded no código assim, e muitos menos de forma duplicada, mas aqui só estamos interessados em ilustrar seu uso ;) */
const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do header Authorization em todas as rotas que queremos que sejam autenticadas. */
  const token = req.headers['authorization'];

  /* Caso o token não seja informado, simplesmente retornamos o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          id: '3',
          username: 'italssodj',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro, por isso não é necessário fazer validação do tempo.
    Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */

    const user = await User.findOne({ where: { username: decoded.data.username } });

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req. Dessa forma, o usuário estará disponível para outros middlewares que executem em sequência */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso, é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
~~~

### app.js

~~~js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

/* Aqui, importamos nossa função que valida se o usuário está ou não autenticado */
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/api/posts', validateJWT, routes.getPosts);
apiRoutes.post('/api/users', routes.createUsers);
apiRoutes.get('/api/users', routes.getUsers);
apiRoutes.post('/api/login', routes.login);

app.use(apiRoutes);

/*
  Detalhe para a exportação do `app`, já que
  precisaremos dele nos testes com `chaiHttp` e
  para rodar nosso `server.js`
*/
module.exports = app;
~~~

### routes.js

~~~js
const getPosts = require('../controllers/posts');
const createUsers = require('../controllers/createUser');
const login = require('../controllers/login');
const getUsers = require('../controllers/getUsers');

module.exports = {
  getPosts,
  createUsers,
  getUsers,
  login,
};
~~~

### server.js

~~~js
const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
~~~

---

## config

### config.js

~~~js
require('dotenv').config();

const config = {
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  host: process.env.SQL_HOST,
  dialect: 'mysql',
}

module.exports = {
  development: {
    ...config,
    database: 'jwt_exercise_dev'
  },
  test: {
    ...config,
    database: 'jwt_exercise_test'
  },
  production: {
    ...config,
    database: 'jwt_exercise'
  },
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

### Post.js

~~~js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Posts',
  });

  return Post;
};
~~~

### User.js

~~~js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  return User;
};
~~~

---

## migrations

### 20211207130602-users.js

~~~js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Users");
  }
};
~~~

### 20211207140145-posts.js

~~~js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("Posts");
  }
};
~~~

---

## seeders

### 20211207131858-users.js

~~~js
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        username: 'Raul Seixas',
        password: 'tocaraul',
      },
      {
        id: 2,
        username: 'Cássia Eller',
        password: 'relicario',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
~~~

### 20211207140312-posts.js

~~~js
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Posts',
      [{
        id: 1,
        title: 'título fake',
        content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
      },
      {
        id: 2,
        title: 'título fake',
        content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
      },
      {
        id: 3,
        title: 'título fake',
        content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
      },
      {
        id: 4,
        title: 'título fake',
        content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
      }], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
~~~

---

## controllers

### login.js

~~~js
const { User } = require('../models');
const jwt = require('jsonwebtoken');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
a ela poderá criar ou alterar tokens JWT. */
const secret = 'seusecretdetoken';

module.exports = async (req, res) => {
  try {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

  const user = await User.findOne({ where: { username } });

  if (!user || user.password !== password)
    return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

  /* Criamos uma config básica para o nosso JWT, onde:
  expiresIn -> significa o tempo pelo qual esse token será válido;
  algorithm -> algoritmo que você usará para assinar sua mensagem
  (lembra que falamos do HMAC-SHA256 lá no começo?). */

  /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  /* Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
  Mensagem essa que contém dados do seu usuário e/ou demais dados que você quiser colocar dentro de "data".
  O resultado dessa função será equivalente a algo como: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6Iml0YWxzc29kaiIsInBhc3N3b3JkIjoic2VuaGExMjMifSwiaWF0IjoxNjM4OTc1MTMyLCJleHAiOjE2Mzk1Nzk5MzJ9.hnpmu2p61Il8wdQfmUiJ7wiWXgw8UuioOU_D2RnB9kY */
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  /* Por fim, nós devolvemos essa informação ao usuário. */
  return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
~~~

### posts.js

~~~js
const { Post } = require('../models');

module.exports = async (req, res) => {
  console.log(req.user.dataValues);
  const posts = await Post.findAll({ attributes: { exclude: 'id' } });
  res.status(200).json({ mockPosts: posts });
};
~~~

### createUser.js

~~~js
const { User } = require('../models');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({username, password});

    if (!user) throw Error;

    res.status(201).json({ message: 'Novo usuário criado com sucesso', user: username });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
~~~

### getUsers.js

~~~js
const { User } = require('../models');

module.exports = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) throw Error;

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};
~~~

## tests

### mock/models

#### index.js

~~~js
const Users = require('./Users.json');

const mockCreate = (Instance, data) => {
  if(!data){
    return;
  }

  const newData = data;
  if(!!Instance[0].id) {
    newData.id = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const User = {
  create: async (data) => mockCreate(Users, data),
  findAll: async () => Users,
};

module.exports = {
  User,
};
~~~

#### Users.json

~~~json
[
  {
    "id": 1,
    "username": "Saul Reixas",
    "password": "tocasaul"
  },
  {
    "id": 2,
    "username": "Kássia Lemmer",
    "password": "kelimmar"
  }
]
~~~

### createUsers.test.js

~~~js
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../src/api/app.js');

chai.use(chaiHttp);

// Importação do modelo original, contido em `models`, a partir da raiz
const { User } = require('../src/models');
// Importação do mock utilizado nesse contexto
const { User: userMock }  = require('./mock/models')

const { expect } = chai;

describe('Rota /api/users', () => {

  before(() => {
    sinon.stub(User, 'findAll')
      .callsFake(userMock.findAll);
  });

  after(() => {
    User.findAll.restore();
  });

  describe('Consulta a lista de pessoas usuárias', () => {
    let response;

    before(async () => {
      response = await chai
        .request(server)
        .get('/api/users');
    });

    it(
      'A requisição GET para a rota traz uma lista inicial ' +
      'contendo dois registros de pessoas usuárias',
      () => {
        expect(response.body).to.have.length(2);
      }
    );

    it('Essa requisição deve retornar código de status 200', () => {
      expect(response).to.have.status(200);
    });
  });
});
~~~
