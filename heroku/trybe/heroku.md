heroku create
heroku git:remote -a example-app
git push heroku main

//------------------------------------------------------------------------------

cd example-app
git init
git add .
git commit -m "My first commit"
heroku create -a example-app

//------------------------------------------------------------------------------

heroku stack:set container
git add .
git commit -m "Realizando o deploy"
git push heroku master

//------------------------------------------------------------------------------

Preparando projeto pra deploy:

npx create-react-app meu-primeiro-deploy-heroku

Normalmente, o comando create-react-app já inicia um projeto git, mas se não acontecer...
git init
git add .
git commit -m ‘Initialize project using Create React App’

Listar remotes: git remote -v

Criar repositório no GitHub:

Vincular com SSH:
git remote add origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git

Vincular com HTTPS:
git remote add origin https://github.com/[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git

Listar os remotes pra verificar a associação

//------------------------------------------------------------------------------

Heroku remote:

Adicionar o remote do Heroku com nome random: heroku create # No CLI dentro da pasta do app
Remover o remote do heroku: git remote rm heroku
Dar um nome específico para o repositório: heroku create meu-primeiro-deploy-2930

//------------------------------------------------------------------------------

Nomeação do remote:
Por padrão o nome do remote criado é heroku

Declarar o nome do remoto: heroku create meu-deploy-de-testes-29302 --remote heroku-homolog
Esse comando mantém o remoto heroku se já existir, e cria um novo, o heroku-homolog

Renomear um remote existente: git remote rename heroku heroku-origin
Esse altera o heroku pra heroku-origin

Criar mais de um remote pode ser interessante pra ter versões diferentes de um app
Exemplo: Versão de testes e ambiente de produção

//------------------------------------------------------------------------------

Vincular um app existente a um novo remote:
heroku git:remote -a nome-do-seu-app-heroku --remote nome-do-seu-remote
Se tiver mais de uma app no rep, pode usar o "-a" (--app) pra escolher a app que será usada.
Exemplo: heroku git:remote -a meu-deploy-de-testes-29302 --remote heroku-test
 
//------------------------------------------------------------------------------
 
Buildpack:
Buildpack de app em React (mars/create-react-app): https://github.com/mars/create-react-app-buildpack#usage
Nginx: https://nginx.org/en/
Catálogo de buildpack: https://elements.heroku.com/buildpacks

Utilizar a buildpack: heroku create -b nome-do-buildpack

//------------------------------------------------------------------------------

Fazendo deploy: git push heroku-origin master (heroku-origin é o nome do remoto)
No sucesso, aparecerá: remote: Verifying deploy… done.
O heroku irá igonorar pushs que não forem realizados da branch master. O app no ar será o da master.

Deploy numa branch secundária: git checkout -b branch-teste
git add .
git commit -m ‘Meu primeiro deploy no Heroku!’
git push heroku branch-teste:master

É importante setar as variáveis de ambiente antes de fazer o deploy

//------------------------------------------------------------------------------

Gerenciando os apps:

Listar os serviços em execução: heroku apps
Detalhes de um app específico: heroku apps:info nome-do-seu-app-12345

Variáveis de ambiente:

Setar variáveis: heroku config:set TESTE="texto qualquer" --app nome-do-seu-app-12345
Listar as variáveis: heroku config --app nome-do-seu-app-12345

Logs:

Monitorar as últimas 100 linhas de log: heroku logs --app nome-do-seu-app-12345
Quantidade diferente de linhas de log: heroku logs -n (ou --num) 200 --app nome-do-seu-app-12345
Mostrar os logs em tempo real: heroku logs --tail (ou -t) --app nome-do-seu-app-12345

Removendo um app do Heroku:

Sintaxe: heroku destroy --app nome-do-app-12345 --confirm nome-do-app-12345
Exemplo: heroku destroy --app meu-deploy-de-testes-29302 --confirm meu-deploy-de-testes-29302

//------------------------------------------------------------------------------

Iniciando a aplicação e instalando as dependências:
mkdir app-heroku-ci-cd && cd app-heroku-ci-cd
npm init -y
npm install express dotenv
npm install eslint -D

 // --------------------------------------------------------------

index.js
 
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send(`<h1> Executando na porta: ${port} </h1>`));
app.listen(port, () => console.log(`Online: ${port}`));

// ----------------------------------------------------------------------

Iniciando a configuração do ESLint:
npx eslint --init

Ok to proceed? (y)
aperte enter para continuar
How would you like to use ESLint?
Selecione a opção To check syntax, find problems, and enforce code style
What type of modules does your project use? · commonjs
Selecione a opção CommonJS
Which framework does your project use?
Selecione a opção None of these
Does your project use TypeScript?
Selecione a opção No
Where does your code run? Utilize a barra de espaço para marcar/desmarcar uma opção
Selecione a opção Node
How would you like to define a style for your project?
Selecione a opção Use a popular style guide
Which style guide do you want to follow?
Selecione a opção Airbnb: https://github.com/airbnb/javascript
What format do you want your config file to be in?
Selecione a opção JSON
Would you like to install them now with npm?
Selecione a opção Yes

 // --------------------------------------------------------------
 
Confira em seu arquivo .eslintrc.json se o ecmaVersion veio com a versão 12, caso não, configure manualmente
 
 {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12 // certifique-se de que o valor seja 12
    },
    "rules": {
    }
 }

 // -------------------------------------------------------------
 
Arquivo .gitignore:
 node_modules/
 
 // -------------------------------------------------------------
 
Arquivo Dockerfile:
 
 FROM node:alpine
 WORKDIR /app
 COPY package.json .
 RUN npm install
 COPY . .
 CMD ["node", "index.js"]
 
 // -------------------------------------------------------------
 
arquivo heroku.yml:

 setup : Especifica os complementos e variáveis de configuração a serem criados durante o provisionamento do aplicativo
 Doc: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#setup-defining-your-app-s-environment
 build : Especifica o Dockerfile que será utiliza para construção da imagem
 Doc: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#build-defining-your-build
 release : Especifica as tarefas da fase de liberação a serem executadas
 Doc: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#release-configuring-release-phase
 run : Especifica os tipos de processos e os comandos a serem executados para cada um
 Doc: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#run-defining-the-processes-to-run
 
 Conhecimentos extras na doc: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#run-defining-the-processes-to-run
 
 //------------------------------------------------------------------
 
 Exemplo de heroku.yml:

setup:
  addons:
    - plan: heroku-postgresql
      as: DATABASE
build:
  docker:
    web: Dockerfile
    worker: worker/Dockerfile
release:
  command:
    - ./deployment-tasks.sh
  image: worker
run:
  web: node index.js
  
  //------------------------------------------------------------------
  
Arquivo mais simples:

build:
  docker:
    web: Dockerfile
run:
  web: node index.js
  
Se o comando run não for adicionado ao heroku.yml , por padrão ele utiliza o CMD especificado no Dockerfile
 
 //------------------------------------------------------------------
 
 Iniciar o processo de deploy criando o app (inicie o git e crie um app dentro do Heroku):
 
git init
heroku apps:create rodrigo-app-de-teste-123

// ------------------------------------------------------------------

Verificar a stack:

heroku stack
heroku stack -a nome-da-sua-aplicação # Para o caso de mais de um aplicativo

//--------------------------------------------------------------------

Alterar para utilizar a imagem de um container

heroku stack:set container
heroku stack:set container -a nome-da-sua-aplicação # Para o caso de mais de um aplicativo

Documentação de stacks: https://devcenter.heroku.com/articles/stack

//-------------------------------------------------------------------

Adicionar alterações, commit e push para o remote do Heroku:

git add .
git commit -m "meu primeiro commit na plataforma heroku com Docker"
git push heroku master

//-------------------------------------------------------------------


caso esteja em uma branch diferente da master, e queira fazer o push a partir dela, você deverá apontar sua-branch para a master:

git push heroku sua-branch:master

//----------------------------------------

Acessar a app na URL: https://NOME-DO-APP.herokuapp.com/

//------------------------------------------------

Para criarmos uma action, crie uma pasta .github na raiz do seu projeto. Dentro desta pasta, crie uma nova pasta chamada workflows e então crie o arquivo main.yml.

Repositório do ESlint no marketplace do GitHub: https://github.com/marketplace/actions/run-eslint

on: [push, pull_request]

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
        - name: Verifica o repositório do Git
          uses: actions/checkout@v2

        - name: Instala o node com a versão
          uses: actions/setup-node@v1
          with:
            node-version: 14


        - name: instalando as dependências
          run: npm install

        - name: executando o lint para verificar se a erros
          run: npx eslint .
          
on: quando os jobs são executados;
jobs: jobs que serão executados;
name: nome da ação;
runs-on: versão da máquina a ser utilizada na action;
https://docs.github.com/pt/actions/using-github-hosted-runners/about-github-hosted-runners
steps: podem executar comandos, configurações ou ações no repositório;
uses: actions/checkout@v2: Esta é uma ação que verifica seu repositório e baixa-o para o executor do github, permitindo que você execute ações em seu código (como ferramentas de teste). Você deve usar a ação de checkout sempre que seu fluxo de trabalho for executado no código do repositório ou se estiver usando uma ação definida no repositório.
uses: actions/setup-node@v1 : Esta é uma ação para configuração do node.
with: node-version: 14 : Aqui é definido qual versão do node será usada.
run : Esse comando executa comandos CLI.

//------------------------------------------------------------------------------

Push para um repositório no GitHub (cria o rep, aponta o projeto pro remote, add, commit e push):

git add .
git commit -m "adicionando arquivos ao github"
git branch -M master
git remote add origin git@github.com:SEU-USUARIO/SEU-APP.git
git push -u origin master

Para ver a action: https://github.com/seu-nome-de-usuario/seu-repositorio/actions
Também é interessante dar o PR em outra branch pra visualizar

//------------------------------------------------------------------------------

Implementando CD em um repositório com Heroku:

3 formas de fazer deploy no Heroku:
Heroku Git: utilizamos no dia anterior, para realizar o deploy da aplicação front-end;
GitHub: utilizado para conectar a um repositório do GitHub;
Container Registry: utilizado para realizar o deploy com Docker.

Com o deploy já feito, para add o CD, atrelar o rep do GH ao app do Heroku pelo site do Heroku:
Ir na aba Deploy;
Deployment method -> GH;
Procurar o repositório;
Selecionar a branch e clicar no Enable Automatic Deploys;
No manual deploy é possível dar deploy manualmente em uma branch específica.

//------------------------------------------------------------------------------

Como hospedar um banco de dados SQL:

Plataformas para disponibilzar BD:
AWS, Google Cloud, Heroku e Hostinger.

Criando uma nova conta no Supabase:
Criar um novo DB: Clique no New project e selecionar o nome do github;
Adicionar nome, senha e região do BD - a região (South America(São Paulo) terá um ping melhor);
Aguardar cerca de 2 minutos até que fique online.

Iniciar um app Node.js, com sequelize, postgres e outros recursos:
  mkdir supabase-with-sequelize && cd supabase-with-sequelize
  npm init -y
  npm install sequelize sequelize-cli express dotenv
  npm install pg pg-hstore
  
Iniciar a config do sequelize: npx sequelize-cli init

//------------------------------------------------------------------------------

config.js:


// config/config.js
require('dotenv/config');

const { HOST, PASSWORD_POSTGRES, DATABASE, DB_USERNAME, DB_PORT } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": PASSWORD_POSTGRES,
    "database": DATABASE,
    "host": HOST,
    "port": DB_PORT,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": PASSWORD_POSTGRES,
    "database": DATABASE,
    "host": HOST,
    "port": DB_PORT,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": PASSWORD_POSTGRES,
    "database": DATABASE,
    "host": HOST,
    "port": DB_PORT,
    "dialect": "postgres"
  }
}

//------------------------------------------------------------------------------

Adicionar as variáveis ao .env:

PASSWORD_POSTGRES= # aqui vai ser a senha que você criou
HOST= # o link para onde o banco está hospedado
DATABASE=postgres
DB_USERNAME=postgres
DB_PORT= # porta que o Supabase fornece
HOST === servidor onde o banco esta sendo hospedado

# EXEMPLO
PASSWORD_POSTGRES=13244
HOST=db.minhaurldeconexao.supabase.co
DATABASE=meubanco
DB_USERNAME=userhost
DB_PORT=6543

Encontrar o link do BD:
Ir nas configs do supabase e em Database;
Connection info: Informações de config do BD;
Copiar o host do connection info e colar no host da variável de ambiente

Alterar o index do model para ele procurar o arquivo config.js:
const config = require(__dirname + '/../config/config.js')[env];

Criar uma tabela de Products no BD:
npx sequelize model:generate --name Product --attributes name:string,description:string

Executar a migration para criar a tabela:
npx sequelize db:migrate

Torna-se possível ver a tabela no supabase em Table editor

//------------------------------------------------------------------------------

Arquivo index.js:

const express = require('express')

const { Product } = require('./models')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.post('/product', async (req, res) => {

  const { name, description } = req.body;

  const product = await Product.create({ name, description });

  return res.status(201).json(product);
});

app.listen(port, () => console.log(`Servidor online na porta ${port}`));

//------------------------------------------------------------------------------

Executar o node para fazer a requisição: node index

Fazer uma requisição no Postman ou Insomnia e verificar as alterações que ocorreram no supabase
