<h1 align=center><b>Mongoose</b></h1>

### **Useful Links**

* Mongoose documentation: https://mongoosejs.com

# **Introdução**

### **ORMs (Object Relational Mapping)**

* Lidar com BDs relacionais (SQL e PostgresSQL)

### **ODMs (Object Document Mapping)**

* Lidar com BDs não-relacionais (MongoDB)

# **Conexão com o Mongoose**

### **Instalar**

* `npm i mongoose`

### **Conectar usando a URI (Uniform Resource Identifier) do banco**

~~~js
import { connect } from 'mongoose';

connect('mongodb://localhost:27017/meu_data_base');
~~~

> Se a conexão falhar, usar `127.0.0.1` em vez de `localhost`.

### **Login e senha**

* Equivalente ao `auth.username` e `auth.password` do `MongoDB`.

~~~js
// Com URI

connect(
  'mongodb://username:password@host:port/meu_data_base',
  options
);

// Com a option

connect(
  'mongodb://localhost:27017/meu_data_base',
  { user: 'user', pass: 'password' }
);
~~~

> Se for passado pela `option`, utilizar variáveis de ambiente para camuflagem.

### **autoIndex**

* Por padrão, o Mongoose construirá automaticamente os índices definidos em seu schema quando se conectar. Isso é ótimo para desenvolvimento, mas não é ideal para grandes implantações de produção, porque as compilações de índice podem prejudicar o desempenho. Ao definir autoIndex como false, o Mongoose não criará índices automaticamente para nenhum modelo associado a essa conexão.

### **dbName**

* Especifica a qual BD se conectar e substitui qualquer BD especificado na cadeia de conexão. É útil quando não se pode especificar um BD padrão na cadeia de conexão, como em algumas mongodb+srv conexões de sintaxe.

> Exemplo: `'mongodb://localhost:27017/meu_data_base'`.

### **Configuração completa**

~~~js
const options = {
  user: 'user', // Usuário do banco de dados.
  pass: 'password', // senha do usuário do banco de dados.
  autoIndex: false, // Não cria index para cada inserção de dado no banco.
  dbName: 'model_example', // Define qual banco de dados vou utilizar.
};

connect('mongodb://localhost:27017/', options);
~~~

# Schemas e models

### **Schema**

* Estrutura básica dos documentos (chaves).

`Exemplo de definição de schema:`

~~~js
import { connect, Schema } from 'mongoose';

connect('mongodb://localhost:27017/model_example');

// Criamos uma interface em TypeScript para representar nosso schema:

interface Book {
  title: string,
  author: string,
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true }});
~~~

> Cada documento do exemplo terá um `title` e um `author`.

### **Parâmetros do Schema**

* **DocType:** Interface que tipa os dados. Interface `Book` no exemplo;
* **Model:** Tipagem do model. Geralmente omitido se o próxio parâmetro não for passado. Como padrão recebe a tipagem do DocType;
* **TInstanceMethods:** Interface com os métodos do schema.

> Cada elemento definido no `Schema` precisa estar presente na `interface`, ou irá resultar em erro.

> Se um elemento obrigatório da `interface` não estiver no `Schema`, ele interpreta como `required: false` ( `undefined` ) e não gera erro.

### **model**

* É necessário um `model` baseado no `Schema` para que a manipulação do Mongoose ocorra.

~~~js
// Repare que aqui importamos também a função 'model' do Mongoose:
import { connect, Schema, model }  from 'mongoose';

// connect('mongodb://localhost:27017/model_example');

interface Book {
  title: string,
  author: string,
}

// Aqui está o nosso schema construído logo acima:

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true }});

// Para acessarmos os métodos disponibilizados pelo Mongoose e
// implementarmos nossa API, criamos um Model do product:

const bookModel = model<Book>('books', bookSchema);
~~~

### **Parâmetros do model**

* **Primeiro:** `string` que representa o nome da coleção no BD;
* **Segundo:** Nome do `schema` referenciado no `model`.

# **Model com Mongoose**

### **Boilerplate da aplicação**

* Criação dos diretórios

~~~sh
mkdir Bookshop && cd Bookshop
mkdir src && cd src && mkdir models services controllers schemas
~~~

* Instalando mongoose e express

~~~properties
npm install mongoose express
~~~

* Instalando as dev dependencies

~~~properties
npm install -D typescript ts-node nodemon @types/express
~~~

* Criação do script `dev` no `package.json` para inicializar o `nodemon`

~~~json
"scripts": {
  "dev": "nodemon --watch src/ --ext ts,json --ignore src//*.spec.ts --exec ts-node src/index.ts"
},
~~~

> As alterações necessárias envolvem apenas o BD, então, espera-se que o restante da aplicação funcione sem alterações.

### **Service**

~~~ts
// src/services/BookService.ts

import BookModel from '../models/BookModel';
import { IBook } from '../schemas/BookSchema';

class BookService {
  constructor(private bookModel = new BookModel()) {} 

  public async getBooks(): Promise<IBook[]> {
    const books = await this.bookModel.getBooks();
    return books;
  }

  public async createBook(bookData: object): Promise<IBook> {
    const book = await this.bookModel.createBook(bookData);
    return book;
  }

  public async getBook(id: string): Promise<IBook | null> {
    const data = await this.bookModel.getBook(id);
    return data;
  }

  public async updateBook(id: string, bookData: object): Promise<IBook | null> {
    const data = await this.bookModel.editBook(id, bookData);
    return data;
  }

  public async deleteBook(id: string): Promise<IBook | null> {
    const data = await this.bookModel.deleteBook(id);
    return data;
  }
}

export default BookService;
~~~

### **Controller**

~~~ts
// src/controllers/BookController.ts

import { Request, Response } from 'express';
import BookService from '../services/BookService';

class BookController {
  constructor(private bookService = new BookService()) {}

  notFound = 'Book not found';

  internalError = 'Internal server error';

  public getBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
      const books = await this.bookService.getBooks();

      return res.status(200).send(books);
    } catch (err: unknown) {
      return res.status(500).send({ message: this.internalError });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const book = await this.bookService.createBook(req.body);
      return res.status(201).send(book);
    } catch (err: unknown) {
      return res.status(500).send({ message: this.notFound });
    }
  };

  public getBook = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBook(id);
      if (book) {
        return res.status(200).send(book);
      }
      return res.status(404).send({ message: this.notFound });
    } catch (err: unknown) {
      return res.status(500).send({ message: this.internalError });
    }
  };

  public updateBook = async (req: Request, res: Response):
  Promise<Response> => {
    try {
      const { id } = req.params;
      const book = await this.bookService.updateBook(id, req.body);
      if (book) {
        return res.status(200).send(book);
      }
      return res.status(404).send({ message: this.notFound });
    } catch (err: unknown) {
      return res.status(500).send({ message: this.internalError });
    }
  };

  public deleteBook = async (req: Request, res: Response):
  Promise<Response> => {
    try {
      const { id } = req.params;
      const book = await this.bookService.deleteBook(id);
      if (book) {
        return res.status(200).send(book);
      }
      return res.status(404).send({ message: this.notFound });
    } catch (err: unknown) {
      return res.status(500).send({ message: this.internalError });
    }
  };
}

export default BookController;
~~~

### **App**

~~~ts
// src/app.ts

import express from 'express';
import routes from './routes';
import connection from './models/connection';

class App {
  public express: express.Application;

  public connection: Promise<typeof import('mongoose')>;

  constructor() {
    this.express = express();
    this.middlewares();
    this.connection = connection();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes() {
    this.express.use(routes);
  }
}

export default App;
~~~

### **Index**

~~~ts
// src/index.ts

import App from './app';

const app = new App().express;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
~~~

### **Routes**

~~~ts
// src/routes.ts

import { Router } from 'express';

import BookController from './controllers/BookController';

const bookController = new BookController();
const routes = Router();

const booksId = '/books/:id';

routes.get('/books', bookController.getBooks);
routes.post('/books', bookController.create);
routes.put(booksId, bookController.updateBook);
routes.delete(booksId, bookController.deleteBook);
routes.get(booksId, bookController.getBook);

export default routes;
~~~

### **tsconfig**

~~~js
// tsconfig.json

{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "typeRoots": [
      "src/@types",
      "./node_modules/@types"
    ],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
~~~

> **Boilerplate:** Seções de código que podem ser incluídas em muitos lugares com pouca ou nenhuma alteração.

# **Reestruturação da aplicação**

### **Conexão com o BD**

* Usando o padrão `singleton` no arquivo connection da pasta models

~~~js
// models/connection.ts

import mongoose from 'mongoose';

const connection = (mongoDatabaseURI = 'mongodb://localhost:/model_example') =>
  mongoose.connect(mongoDatabaseURI);

export default connection;
~~~

> **Singleton:** Objeto ou módulo que, mesmo sendo chamado várias vezes, só é criado uma vez.

### **População do BD**

* Necessário ter o MongoDB de uma das duas formas
    * Instalado;
    * Dockerizado com o cmd `docker run --name mongo-crud -d -p 27017:27017 -e AUTH=no mongo`.

* Abrir o console MongoDB
    * Local;
    * Dockerizado com o cmd `docker exec -it mongo-crud mongo`.

* Executar o código

~~~js
use model_example
db.books.insertMany([
  { title: 'The Dispossessed', author: 'Ursula K. Le Guin', publishedYear: 1974 },
  { title: 'I Am Legend', author: 'Richard Matheson', publishedYear: 1954, weight: '6.4 ounces'  },
  { title: 'The Road', author: 'Cormac McCarthy', publishedYear: 2006 },
  { title: 'Foundation', author: 'Isaac Asimov' },
  { title: '2001: A Space Odyssey', author: 'Arthur C. Clarke', weight: '5.4 ounces' },
]);
~~~

### **Criando Schema Mongoose**

~~~js
// /src/schemas/BookSchema.ts

import { Schema } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  publishedYear: number;
  weight?: string;
}

// Uma vez implementada a IBook, ela fica entre <>, para definir o tipo do Schema.

export const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: false },
  weight: { type: String, required: false }});
~~~

### **Utilizando o método find()**

~~~js
// models/BookModel.ts

import { model as createModel } from 'mongoose';
import { BookSchema, IBook } from '../schemas/BookSchema';

class BookModel {
  // Criado no construtor um model do Mongoose do tipo IBook, passando pro createModel(model do Mongoose) um nome e o schema de referência.

  constructor(private bookModel = createModel<IBook>('books', BookSchema)) {}

  public async getBooks(): Promise<IBook[]> {
    const books = await this.bookModel.find();
    return books;
  }
}

export default BookModel;
~~~

> Ao executar `npm run dev` e fazer uma requisição `GET` para http://localhost:3000/books, ocorre a listagem de todos os livros.

### **Utilizando o método create()**

~~~js
// models/BookModel.ts

  public async createBook(bookData: object): Promise<IBook> {
    const book = await this.bookModel.create(bookData);
    return book;
  }
~~~

> A `createBook` retorna um novo documento do tipo `IBook`, contendo as infos inseridas no BD, além das propriedades `_id` e `__v`.

> **_id:** `id` gerado pelo BD automaticamente;

> **__v:** `version key` que versiona o documento, mas pode ser desabiilitada setando como `false` no `schema`.

~~~ts
// BookSchema.ts

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: false },
  weight: { type: String, required: false },
}, {
  versionKey: false});
~~~

### **Utilizando o método findOne()**

~~~js
// models/BookModel.ts

public async getBook(id: string): Promise<IBook | null> {
  const book = await this.bookModel.findOne({ _id: id });
  return book;
}
~~~

> O mapeamento de `id` para `_id` é necessário porque a chave única de um documento no MongoDB é do tipo `ObjectId`, e sua grafia tem esse `underline`. Já o `id` passado na `URL` como parâmetro de busca, é do tipo `string`.

### **Utilizando o método findOneAndUpdate()**

* Recebe 2 parâmetros:
    * **1.** Um filtro, geralmente o id;
    * **2.** A atualização.

~~~js
// models/BookModel.ts

public async editBook(id: string, bookData: object): Promise<IBook | null> {
  const book = await this.bookModel.findOneAndUpdate(
    { _id: id },
    { ...bookData },
  );
  return book;
}
~~~

> O documento retornado é a versão antes da atualização feita. Para retornar a versão do documento com as atualizações, definir mais um argumento, o `new`, com o valor `true`.

~~~js
//   public async editBook(id: string, bookData: object): Promise<IBook | null> {
//     const book = await this.bookModel.findOneAndUpdate(
//       { _id: id },
//       { ...bookData },
         { new: true },
//     );
//     return book;
//   }
~~~

### **Utilizando o método findOneAndDelete()**

~~~js
// models/BookModel.ts

public async deleteBook(id: string): Promise<IBook | null> {
  const book = await this.bookModel.findOneAndDelete({ _id: id });
  return book;
}
~~~

# **Extra**

* **Connnection com Mongoose:** https://mongoosejs.com/docs/connections.html;
* **ObjectId no MongoDB:** https://masteringjs.io/tutorials/mongoose/objectid;
* **TypeScript + Mongoose - Schemas:** https://mongoosejs.com/docs/typescript/schemas.html#schema-vs-interface-fields.

# **Estrutura da aplicação**

### **Árvore de arquivos**

~~~properties
|   .env
|   .env.example
|   .eslintrc.json
|   .gitignore
|   docker-compose.yml
|   package.json
|   tsconfig.json
|
\---src
    |   index.ts
    |   server.ts
    |
    +---Controllers
    |       Frame.ts
    |       index.ts
    |       Lens.ts
    |
    +---Interfaces
    |       Frame.ts
    |       Lens.ts
    |
    +---Models
    |       Connection.ts
    |       Frame.ts
    |       index.ts
    |       Lens.ts
    |       MongoModel.ts
    |
    +---Routes
    |       Router.ts
    |
    \---Services
    |       Frame.ts
    |       index.ts
    |       Lens.ts
~~~

### **package.json**

~~~json
{
  "name": "mongoose-poo-example",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "start": "ts-node-dev src/index.ts",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^16.11.7",
    "@typescript-eslint/eslint-plugin": "^5.3.1",
    "@typescript-eslint/parser": "^5.3.1",
    "eslint": "^7.32.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-airbnb-typescript": "^15.0.0",
    "eslint-plugin-editorconfig": "^3.2.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-mocha": "^9.0.0",
    "eslint-plugin-sonarjs": "^0.10.0",
    "ts-node": "^10.4.0",
    "ts-node-dev": "^1.1.8",
    "typescript": "^4.4.3"
  },
  "dependencies": {
    "express": "^4.17.1",
    "express-async-errors": "^3.1.1",
    "mongoose": "^6.1.8",
    "zod": "^3.11.6"
  }
}
~~~

### **tsconfig.json**

~~~json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "typeRoots": [
      "src/@types",
      "./node_modules/@types"
    ],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
~~~

### **eslintrc.json**

~~~json
{
    "root": true,
    "env": {
        "browser": false,
        "node": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "airbnb-base",
        "plugin:editorconfig/noconflict",
        "plugin:mocha/recommended",
        "airbnb-typescript/base"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "sonarjs",
        "editorconfig",
        "mocha"
    ],
    "rules": {
        "no-console": "off",
        "camelcase": "warn",
        "arrow-parens": [
,
            "always"
        ],
        "quotes": [
,
            "single"
        ],
        "implicit-arrow-linebreak": "off",
        "consistent-return": "off",
        "no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        "object-curly-newline": "off",
        "max-params": [
            "error",

        ],
        "max-lines": [
            "error",

        ],
        "max-lines-per-function": [
            "error",
            {
                "max": 20,
                "skipBlankLines": true,
                "skipComments": true
            }
        ],
        "max-len": [
            "error",
            {
                "code": 100
            },
            {
                "ignoreComments": true
            }
        ],
        "complexity": [
            "error",

        ],
        "import/no-extraneous-dependencies": [
            "off"
        ],
        "sonarjs/cognitive-complexity": [
            "error",

        ],
        "sonarjs/no-one-iteration-loop": [
            "error"
        ],
        "sonarjs/no-identical-expressions": [
            "error"
        ],
        "sonarjs/no-use-of-empty-return-value": [
            "error"
        ],
        "sonarjs/no-extra-arguments": [
            "error"
        ],
        "sonarjs/no-identical-conditions": [
            "error"
        ],
        "sonarjs/no-collapsible-if": [
            "error"
        ],
        "sonarjs/no-collection-size-mischeck": [
            "error"
        ],
        "sonarjs/no-duplicate-string": [
            "error"
        ],
        "sonarjs/no-duplicated-branches": [
            "error"
        ],
        "sonarjs/no-identical-functions": [
            "error"
        ],
        "sonarjs/no-redundant-boolean": [
            "error"
        ],
        "sonarjs/no-unused-collection": [
            "error"
        ],
        "sonarjs/no-useless-catch": [
            "error"
        ],
        "sonarjs/prefer-object-literal": [
            "error"
        ],
        "sonarjs/prefer-single-boolean-return": [
            "error"
        ],
        "sonarjs/no-inverted-boolean-check": [
            "error"
        ]
    }
}
~~~

### **.gitignore**

~~~properties
node_modules
.env
~~~

### **.env**

~~~properties
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
~~~

### **.env.example**

~~~properties
MONGO_INITDB_ROOT_USERNAME=example # probably root
MONGO_INITDB_ROOT_PASSWORD=example
~~~

> Como o `.env` não é incluído em projetos públicos, o `.env.example` sinaliza que é necessário um `.env` para quem for usar o projeto.

### **docker-compose**

~~~js
version: '3.4'

services:
  mongo:
    image: mongo:5.0.6
    ports:
      - "27017:27017"
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: '${MONGO_INITDB_ROOT_USERNAME}'
      MONGO_INITDB_ROOT_PASSWORD: '${MONGO_INITDB_ROOT_PASSWORD}'
~~~

# **Interfaces**

###  **Interface de armação de óculos**

~~~ts
// src/Interfaces/Frame.ts

interface Frame {
  material: string,
  color: string,
}

export default Frame;
~~~

### **Zod**

* **Instalação:** `npm i zod`
* **Validações do Zod:** https://github.com/colinhacks/zod#defining-schemas

~~~ts
// src/Interfaces/Frame.ts

import { z } from 'zod';

const FrameSchema = z.object({
  material: z.string(),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
});

type Frame = z.infer<typeof FrameSchema>;

export default Frame;
export { FrameSchema };
~~~

### **Interface (tipo) das lentes**

~~~ts
// src/Interfaces/Lens.ts

import { z } from 'zod';

const lensSchema = z.object({
  degree: z.number(),
  antiGlare: z.boolean(),
  blueLightFilter: z.boolean(),
});

type Lens = z.infer<typeof lensSchema>;

export default Lens;
export { lensSchema };
~~~

### **Tipagem do Lens mostrada pelo VSCode**

~~~ts
// Tipo `Lens` inferido com base no `zod`

type Lens = {
  degree: number;
  antiGlare: boolean;
  blueLightFilter: boolean;
}
~~~

# **Models**

### **Connection**

> O `Mongoose` tem conexão global, ou seja, após a definição da `URI`, há liberdade pra se trabalhar apenas com os `models`.

~~~ts
// src/Models/Connection.ts

import mongoose from 'mongoose';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || 'mongodb://root:example@localhost:27017/GlassesTrybe?authSource=admin',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
~~~

> É aconselhável sempre usar uma `variável de ambiente` para não expor a `URI`.

### **Interface Model**

> O `model` precisa ser `genérico` porque pode receber um objeto `Frame` ou `Lens`, por exemplo.

~~~ts
// src/Models/index.ts

interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(id_: string): Promise<T | null>,
}

export default Model;
~~~

### **Classe MongoModel**

* Criação de uma classe abstrata para os models que usam Mongoose

~~~ts
// src/Models/MongoModel.ts`

import { Model as M, Document } from 'mongoose';
import Model from '.';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });
}

export default MongoModel;
~~~

### **Models**

* Model da armação do óculos

~~~ts
// src/Models/Frame.ts

import { Schema, model as createModel, Document } from 'mongoose';
import Frame from '../Interfaces/Frame';
import MongoModel from './MongoModel';

interface FrameDocument extends Frame, Document { }

const frameSchema = new Schema<FrameDocument>({
  material: String,
  color: String,
});

class FrameModel extends MongoModel<Frame> {
  constructor(model = createModel('Armacoes', frameSchema)) {
    super(model);
  }
}

export default FrameModel;
~~~

> Ao criar o `esquema` e sobrescrever o `construtor` com o valor padrão do `model`, tem-se uma `classe` que funciona como `model` para o `Frame`, com todos os métodos (`create`, `read`, `readOne`) agindo em cima do banco MongoDB.

* Model das lentes

~~~ts
// src/Models/Lens.ts

import { Schema, model as createModel, Document } from 'mongoose';
import Lens from '../Interfaces/Lens';
import MongoModel from './MongoModel';

interface LensDocument extends Lens, Document { }

const lensSchema = new Schema<LensDocument>({
  degree: Number,
  antiGlare: Boolean,
  blueLightFilter: Boolean,
});

class LensModel extends MongoModel<Lens> {
  constructor(model = createModel('Lenses', lensSchema)) {
    super(model);
  }
}

export default LensModel;
~~~

> Agora é possível criar diversas classes para diversos models, apenas criando o esquema (exigido pelo mongoose) e herdando de `MongoModel`. Além disso, se for necessário, os métodos do CRUD podem ser sobrescritos na `subclasse`, de forma a implementar validações ou regras específicas para um model específico.

# **Services**

### **Classe Service**

* Classe abstrata de serviço para depois implementar em outras mais específicas

~~~ts
// src/Services/index.ts

import { ZodError } from 'zod';
import Model from '../Models';

export interface ServiceError {
  error: ZodError;
}
abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }
}

export default Service;
~~~

> Se houverem validações ou formatação, os métodos podem ser sobrescritos na subclasse.

###  **Services**

* Classe Frame que herda da abstrata Service

~~~ts
// src/Services/Frame.ts

import Frame, { FrameSchema } from '../Interfaces/Frame';
import Service, { ServiceError } from '.';
import FrameModel from '../Models/Frame';

class FrameService extends Service<Frame> {
  constructor(model = new FrameModel()) {
    super(model);
  }

  create = async (obj: Frame): Promise<Frame | ServiceError | null> => {
    const parsed = FrameSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default FrameService;
~~~

> Em caso de erro, a chave `success` recebe `false` e o erro fica na chave `error`.

> É possível usar `schema.parse` também, que levanta um erro ao invés de retornar um valor.

* Classe Lens que herda da abstrata Service

~~~ts
// src/Services/Lens.ts

import Lens, { lensSchema } from '../Interfaces/Lens';
import Service, { ServiceError } from '.';
import LensModel from '../Models/Lens';

class LensService extends Service<Lens> {
  constructor(model = new LensModel()) {
    super(model);
  }

  create = async (obj: Lens): Promise<Lens | ServiceError | null> => {
    const parsed = lensSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default LensService;
~~~

# **Controllers**

### **Classe controller**

~~~ts
// src/Controllers/index.ts

import { Request, Response } from 'express';
import Service from '../Services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}
export default Controller;
~~~

### **Controllers**

> Em erros no `service`, o status `400` é retornado com um erro do cliente, já em erros desconhecidos o padrão é retornar status `500` e uma string genérica ao invés do stack do erro.

* Controller da Frame

~~~ts
// src/Controllers/Frame.ts

import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import FrameService from '../Services/Frame';
import Frame from '../Interfaces/Frame';

class FrameController extends Controller<Frame> {
  private _route: string;

  constructor(
    service = new FrameService(),
    route = '/frames',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Frame>,
    res: Response<Frame | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const frame = await this.service.create(body);
      if (!frame) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in frame) {
        return res.status(400).json(frame);
      }
      return res.status(201).json(frame);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Frame | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const frame = await this.service.readOne(id);
      return frame
        ? res.json(frame)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default FrameController;
~~~

* Controller da Lens

~~~ts
// src/Controllers/Frame.ts

import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import FrameService from '../Services/Frame';
import Frame from '../Interfaces/Frame';

class FrameController extends Controller<Frame> {
  private _route: string;

  constructor(
    service = new FrameService(),
    route = '/frames',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Frame>,
    res: Response<Frame | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const frame = await this.service.create(body);
      if (!frame) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in frame) {
        return res.status(400).json(frame);
      }
      return res.status(201).json(frame);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Frame | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const frame = await this.service.readOne(id);
      return frame
        ? res.json(frame)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default FrameController;
~~~

# **Routes**

~~~ts
// src/Routes/Router.ts

import { Router } from 'express';
import Controller from '../Controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;
~~~

# **Server**

### **Criação do App**

~~~ts
// src/server.ts

import express, { Router } from 'express';
import connectToDatabase from './Models/Connection';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public startServer(port = 3001) {
    connectToDatabase();
    const actualPort = process.env.PORT || port;
    return this.app.listen(
      actualPort,
      () => console.log('Estamos online na porta: ', actualPort),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }
}

export default App;
~~~

# **Index**

~~~ts
// src/index.ts
import FrameController from './Controllers/Frame';
import LensController from './Controllers/Lens';
import Frame from './Interfaces/Frame';
import Lens from './Interfaces/Lens';
import CustomRouter from './Routes/Router';
import App from './server';

const server = new App();

const lensController = new LensController();
const frameController = new FrameController();

const lensRouter = new CustomRouter<Lens>();
lensRouter.addRoute(lensController);

const frameRouter = new CustomRouter<Frame>();
frameRouter.addRoute(frameController);

server.addRouter(lensRouter.router);
server.addRouter(frameRouter.router);

server.startServer();
~~~

# **Extras**

* **Documentação Mongoose:** https://mongoosejs.com/docs/typescript.html
* **Guia TS + Mongoose no Node.js:** https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1