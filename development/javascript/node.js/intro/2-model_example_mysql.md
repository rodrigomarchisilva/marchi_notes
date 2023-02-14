<!-- markdownlint-disable MD024 -->

# Model Example (SQL)

## Summary

### Driver

Software que permite a comunicação com um BD através de uma aplicação.

---

### Comandos de terminal

* Iniciar pacote node no diretório:

~~~properties
npm init -y
~~~

* Instalar o driver mysql2 para ter acesso ao banco de dados:

~~~properties
npm i mysql2
~~~

* Instalar o body-parser:

~~~properties
npm i express body-parser
~~~

* Instalar o Nodemon para atualizar automaticamente:

~~~properties
npm i nodemon -D
~~~

* Instalar lib Joi para validações:

~~~properties
npm i joi
~~~

* Instalar a lib try/catch para lidar com erros:

~~~properties
npm i express-rescue
~~~

* Instalar lib pra variáveis de ambiente:

~~~properties
npm install dotenv
~~~

* Instalar dependências para testes:

~~~properties
npm install -D mocha chai sinon
~~~

---

### Instalação total unificada

~~~properties
npm init -y && npm i body-parser dotenv express express-rescue joi mysql2 && npm i -D chai mocha nodemon sinon
~~~

---

### Dicas relacionadas ao status

* **Se não definir status ->** O padrão é 200.
* **`sendStatus()` ou `status().end()` ->** Enviar apenas o status na response.

---

### Variáveis de ambiente

* Senha de acesso ao banco de dados, host, porta e nome do banco de dados.
Não é legal deixá-las no código. É possível defini-las no arquivo `.env` da aplicação.
Utilizando a lib `dotenv`, pega-se o conteúdo do `.env` e o deixa acessível via `process.env`.

* **No arquivo .env**

~~~properties
PORT=3000
MYSQL_HOST=localhost
MYSQL_DB_NAME=model_example
MYSQL_USER=root
MYSQL_PASSWORD=secret
~~~

* **Importação e utilização no `index.js`**

~~~javascript
require('dotenv').config();
const PORT = process.env.PORT;
~~~

* **Utilização no `connection.js`**

~~~javascript
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});
~~~

> Adicionar `.env` no `.gitignore` para não commitar o arquivo.

---

### Padrão de status generalista

* **1xx:** Informação;
* **2xx:** Sucesso;
* **3xx:** Redirecionamento;
* **4xx:** Erro do cliente;
* **5xx:** Erro no servidor.

> Lista de status Mozilla: <https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status>

---

### Criando um BD pelo terminal no MySQL

* **Tendo, por exemplo, o arquivo do `model_example.sql` no caminho do terminal**

~~~properties
mysql -u root -h localhost -P 3000 -p < model_example.sql
~~~

---

### Queries com incógnitas

~~~javascript
module.exports = {
  create: async () => {
    const query = 'INSERT INTO characters (name, cartoon) VALUES (?, ?)';
    const [rows] = await connection.execute(query, [name, cartoon]);
    return rows.insertId;
  },
};
~~~

---

### Tratando erros

* **Mostrando mensagem de erro no console**

~~~javascript
console.error(err);
~~~

---

### Validation methods

* **Validação hard-coded com `switch/case`**

~~~javascript
const errors = {
  name_blank: 'O nome não pode estar em branco',
  name_not_string: 'O nome deve ser uma string',
  name_length: 'O nome deve ter no mínimo 3 caracteres',
  user_blank: 'O usuário não pode estar em branco',
  user_not_string: 'O usuário deve ser uma string',
  user_length: 'O usuário deve ter no mínimo 5 caracteres',
};

const blank = (value) => (!value);
const isNotString = (value) => (typeof value !== 'string');
const isLengthLongerThan = (value, min) => (value.length > min);

const validate = (name, user) => {
  const CODE = 422;
  switch(true) {
    case blank(name): return { code, message: error.name_blank }
    case blank(user): return { code, message: error.user_blank }
    case isNotString(name): return { code, message: error.name_not_string }
    case isNotString(user): return { code, message: error.user_not_string }
    case isLengthLongerThan(name, 3): return { code, message: error.name_length }
    case isLengthLongerThan(user, 5): return { code, message: error.user_length }
    default: return {};
  };
};
~~~

* **Validação com `array.every`**

~~~javascript
const postMusic = async (req, res) => {
  const properties = ['name', 'album', 'artistName', 'artistGenre'];
  const valid = properties.every((property) => req.body.hasOwnProperty(property));
  // Ou const valid = properties.every((property) => property in req.body);
  if (!valid) {
    return res.status(400).json({ error: 'Chave obrigatória faltando' });
  };
};
~~~

* **Validação com a biblioteca `Joi` no controller**

~~~javascript
const Joi = require('joi');

const createAuthor = async (req, res, next) => {
  const { firstName, middleName, lastName } = req.body;
  const { error } = Joi.object({
    firstName: Joi.string().not().empty().required(),
    lastName: Joi.string().not().empty().required(),
  })
    .validate({ firstName, lastName });

  if (error) {
    return next(error);
  }

  const newAuthor = await Author.createAuthor(firstName, middleName, lastName);

  if (newAuthor.error) return next(newAuthor.error);

  return res.status(201).json(newAuthor);
};
~~~

* **Criando um middleware de erro para tratar erros do `Joi`**

~~~javascript
// Esse middleware receberá todos os erros, então é necessário identificar qual o erro que chegou

module.exports = (err, req, res, _next) => {

  if (err.isJoi) {
    return res.status(400).json({ error: err.details[0].message });
  }

  const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ error: { message: err.message } });
};
~~~

> Importar o `errorMiddleware` no `index.js` e inserir `app.use(errorMiddleware);` depois da última rota.

---

### Utilizando o Joi de outra maneira

* **Construindo o esquema de validação**

~~~javascript
const Joi = require('joi');
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).error(new Error('Nome inválido')).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
  access_token: [ Joi.string(), Joi.number() ],
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
}).with('username', 'birth_year').xor('password', 'access_token').with('password', 'repeat_password');

--- Validação de dados:

schema.validate({ username: 'abc', birth_year: 1994 }); // -> { value: { username: 'abc', birth_year: 1994 } }
schema.validate({}); // -> { value: {}, error: '"username" is required' }

// Ou com try/catch:

try {
const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }
~~~

* **Documentação do joi:** <https://joi.dev/api/?v=17.5.0>

---

### Montando um script de testes no npm test

* Podemos executar todos os testes contidos numa pasta

~~~properties
mocha <suaPastaDeTestes> --recursive
~~~

* Podemos também definir um padrão de arquivos de teste

**Ex:** `mocha .<suaPastaDeTestes>/**/*.test.js`

> Esse script executará todos os arquivos com final `test.js` dentro da sua pasta de testes.

* Variável de ambiente `NAME` para definir um arquivo específico e `--exit` força o encerramento do processo do mocha ao final dos testes

~~~json
  "scripts": {
    "test": "mocha ./tests/**/*$NAME*.test.js --exit"
  },
~~~

> **Para chamar ->** `NAME=nomeDoArquivo npm test`

---

## Database

~~~sql
CREATE DATABASE IF NOT EXISTS model_example;

USE model_example;

CREATE TABLE authors (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    middle_name VARCHAR(30),
    last_name VARCHAR(30) NOT NULL,
    birthday DATE,
    nationality VARCHAR(100),
    PRIMARY KEY(id)
);

INSERT INTO authors (first_name,middle_name,last_name,birthday,nationality)

VALUES
    ('George','R. R.','Martin','1948-09-20','norte-americano'),
    ('J.','R. R.','Tolkien','1892-01-03','britânico'),
    ('Isaac',NULL,'Asimov','1920-01-20','russo-americano'),
    ('Frank',NULL,'Herbert','1920-02-11','norte-americano'),
    ('Júlio',NULL,'Verne','1905-03-24','francês');

CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(90) NOT NULL,
    author_id INT(11) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (author_id) REFERENCES authors (id)
);

INSERT INTO books (title, author_id)

VALUES
    ('A Game of Thrones', 1),
    ('A Clash of Kings', 1),
    ('A Storm of Swords', 1),
    ('The Lord of The Rings - The Fellowship of the Ring', 2),
    ('The Lord of The Rings - The Two Towers', 2),
    ('The Lord of The Rings - The Return of The King', 2),
    ('Foundation', 3);
~~~

---

## index.js

~~~js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const authorsRouter = require('./routers/authorsRouter');
const booksRouter = require('./routers/booksRouter');

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
~~~

---

## routers

### authorsRouter.js

~~~js
const express = require('express');
const router = express.Router();

const Author = require('../controllers/Author');

router.get('/', Author.getAll);

router.post('/', Author.findById);

router.get('/:id', );

module.exports = router;
~~~

### booksRouter.js

~~~js
const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

router.get('/search', async (req, res) => {
  const id = req.query.author_id;
  const filteredBooks = await Book.findByAuthorId(id);
  if (!filteredBooks) return res.status(500).json({  message: 'Not found!' });
  res.status(200).json(filteredBooks);
});

router.get('/', async (_req, res) => {
  const books = await Book.getAll();
  res.status(200).json(books);
});

router.post('/', async (req, res) => {
  const { title, author_id } = req.body;
  const bookIsValid = await Book.isValid(title, author_id);
  if (!bookIsValid) return res.status(400).json({ message: 'Dados inválidos' });
  await Book.create(title, author_id);
  res.status(201).json({ message: 'Livro criado com sucesso!' });
});

module.exports = router;
~~~

## models

### connection.js

~~~js
// Importar o módulo do driver mysql2:
const mysql = require('mysql2/promise');

// createPool cria uma pool de conexões com o DB, para gerenciar nossas conexões com ele.
const connection = mysql.createPool({
  // Objeto com as credenciais para estabelecer a conexão.
  user: 'root',
  password: 'ilovesql',
  host: 'localhost',
  database: 'model_example'
});

module.exports = connection;
~~~

### Author.js

~~~js
const connection = require('./connection');

const serialize = (authorData) => {
  return {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name,
  }
}

const getAll = async () => {
  const [authors] = await connection.execute('SELECT id, first_name, middle_name, last_name FROM authors');

  return authors.map(serialize).map(getNewAuthor);
};

const findById = async (id) => {
  const [authorData] = await connection.execute('SELECT id, first_name, middle_name, last_name FROM authors WHERE id=?', [id]);

  if (authorData.length === 0) return null;

  const { firstName, middleName, lastName } = authorData.map(serialize)[0];

  return getNewAuthor({
    id,
    firstName,
    middleName,
    lastName,
  });
};

const create = async (firstName, middleName, lastName) => connection.execute(
  'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?,?,?)',
  [firstName, middleName, lastName],
);

module.exports = {
  getAll,
  findById,
  create,
};
~~~

### Book.js

~~~js
const connection = require('./connection');

const serialize = (bookData) => {
  return {
    title: bookData.title,
    authorId: bookData.author_id,
  }
}

const getAll = async () => {
  const [books] = await connection.execute('SELECT title, author_id FROM books');
  return books.map(serialize);
};

const findByAuthorId = async (id) => {
  const [bookData] = await connection.execute('SELECT title, author_id FROM books WHERE author_id=?', [id]);
  if (bookData.length === 0) return null;
  const filteredBooks = bookData.map(serialize);
  return filteredBooks;
};

const isValid = async (title, author_id) => {
  const [bookData] = await connection.execute('SELECT title, author_id FROM books WHERE author_id=?', [author_id]);
  if (title === '' || author_id === '') return false;
  if (title.length < 3) return false;
  if (bookData.length < 1) return false;
  return true;
};

const create = async (title, author_id) => connection.execute(
  'INSERT INTO model_example.books (title, author_id) VALUES (?,?)',
  [title, author_id],
);

module.exports = {
  getAll,
  findByAuthorId,
  isValid,
  create,
};
~~~

## services

### Author.js

~~~js
const Author = require('../models/Author');

const getNewAuthor = ({id, firstName, middleName, lastName}) => {

  const fullName = [firstName, middleName, lastName]
  .filter(Boolean)
  .join(' ');

  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  };
};

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
};

const getAll = async () => {
  const authors = await Author.getAll();
  return authors.map(getNewAuthor);
};

const findById = async (id) => {
  const author = await Author.findById(id);
  return getNewAuthor(author);
};

const create = async (firstName, middleName, lastName) => {
  const authorValid = isValid(firstName, middleName, lastName);
  if (!authorValid) return false;
  const [ author ] = await Author.create(firstName, middleName, lastName);
  const authorId = author.insertId;
  return getNewAuthor({
    id: authorId,
    firstName,
    middleName,
    lastName,
  });
};

module.exports = {getAll, findById, create};
~~~

## controllers

### Author.js

~~~js
const Author = require('../services/Author');

const getAll = async (_req, res) => {
  const authors = await Author.getAll();
  res.status(200).json(authors);
}

const findById = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  const author = await Author.create(first_name, middle_name, last_name);
  if (!author) return res.status(400).json({ message: 'Dados inválidos' });
  res.status(201).json({ message: 'Autor criado com sucesso! '});
}

const create = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);
  if (!author) return res.status(404).json({ message: 'Not found!' });
  res.status(200).json(author);
}

module.exports = {getAll, findById, create};
~~~
