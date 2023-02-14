# Docker no frontend

## Criar um Dockerfile na raíz do projeto, e incluir

~~~docker
FROM node:<VERSION>-alpine
EXPOSE <PORT>
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .
CMD ["npm", "start"]
~~~

Criar um .dockerignore também na raíz do projeto e incluir:

~~~bash
node_modules
~~~

## Executar no diretório em que se encontra o Dockerfile

* Construir a imagem sem nome de repositório ou tag

~~~properties
docker build .
~~~

* Construir a imagem com nome de repositório

~~~properties
docker build -t <REPOSITORY> .
~~~

* Construir a imagem com nome de repositório e tag

~~~properties
docker build -t
~~~

* Visualizar todas imagens e encontrar o ID, se não tiver nomeado

~~~properties
docker image ls
~~~

## Rodar a imagem em um container

* Caso não tenha nomeado

~~~properties
docker run <ID>
~~~

* Caso tenha nomeado apenas o repositório

~~~properties
docker run <REPOSITORY>
~~~

* Caso tenha nomeado com repositório e tag

~~~properties
docker run <REPOSITORY>:<TAG>
~~~

## Acessar aplicativo no browser

* **Local:** `http://localhost:<PORT>/<HOMEPAGE>`
* **Na sua network:** `http://172.17.0.2:<PORT>/<HOMEPAGE>`
