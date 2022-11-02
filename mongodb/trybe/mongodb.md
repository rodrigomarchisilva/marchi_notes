<!-- markdownlint-disable MD022 MD031 MD032 -->

# MongoDB

## Comandos básicos

* Iniciar: `sudo service mongod start`
* Status: `sudo service mongod status`
* Parar: `sudo service mongod stop`
* Reiniciar: `sudo service mongod restart`

## Inicialização

* Iniciar com o sistema: `sudo systemctl enable mongod.service`
* Não iniciar com o sistema: `sudo systemctl disable mongod.service`

## Conectando

* Acessar o MongoDB Shell: `mongo`
* Usar porta diferente da 27017: `mongo --port 19000`
* Sair da instância: `exit`

## Interfaces visuais

* MongoDB Compass
* MongoDB for VS Code
* NoSQLBooster for MongoDB

## Mongo + Docker

### Fluxo

1. Com o Docker instalado e em execução, obter a imagem mongo: `docker pull mongo`
2. Iniciar instância
    * Executar última versão da imagem (`-p porta:porta` para escolher a porta): `docker run --name <nome-do-container> -d mongo`
    * Executar versão específica (exemplo: `mongo:5.0`): `docker run --name <nome-do-container> -d mongo:tag`
3. Executar o mongo no container: `docker exec -it <nome-do-container-ou-id> mongo`

### Importar do local para o container

* mongoimport importa um JSON, CSV ou TSV criados por mongoexport
    1. Copiar o arquivo para o container: `docker cp nome-do-arquivo.json <nome-do-contêiner-ou-id>:/tmp/nome-do-arquivo.json.json`
    2. Importar o JSON para o MongoDB: `docker exec <nome-do-contêiner-ou-id> mongoimport -d <nome-do-banco> -c <nome-da-coleção> --file /tmp/nome-do-arquivo.json`

## BDs, Coleções e Documentos

BDs | Coleções | Documentos
:---: | :---: | :---:
Bancos | Tabelas | Linhas

~~~js
use nomeDoBanco
db.nomeDaColecao.insertOne({ x: 1 })
~~~

A função insertOne() cria tanto o banco de dados nomeDoBanco, como a coleção nomeDaColecao, caso eles não existam. Se existirem, apenas mapeia o documento a ser inserido dentro deles e, por fim, executa a operação.

### Criação explícita de coleção

* `db.createCollection()`: Criar uma coleção e especificar uma série de parâmetros, como o tamanho máximo do documento ou as regras de validação para os documentos
  * Especificando o collation: `db.createCollection( "nomeDaColecao", { collation: { locale: "pt" } } );`

### Criação de documento

* É feito o insert de um JSON, entretanto, os dados são armazenados em BSON (Binary JSON)

~~~json
{
    "_id": 1,
    "nome": "Jose",
    "endereco": {
        "logradouro": "Rua 1",
        "regiao": "Zona Norte",
        "cidade": "São Paulo",
        "uf": "SP"
    }
},
{
    "_id": 2,
    "nome": "Maria",
    "endereco": {
        "logradouro": "Rua 2",
        "cidade": "Belo Horizonte",
        "uf": "MG"
    }
}
~~~

_id | nome | endereço | cidade | uf
:---: | :---: | :---: | :---: | :---:
1 | Jose | Rua 1 | São Paulo | SP
2 | Maria | Rua 2 | Belo Horizonte | MG

> Para validar estruturas de documentos usar o [Schema Validation](https://www.mongodb.com/docs/manual/core/schema-validation/)

## Insert

### db.collection.insertOne()

* Exemplo (sem especificar o _id):

~~~js
try {
   db.products.insertOne( { item: "card", qty: 15 } );
} catch (e) {
   print (e);
};
~~~

* Retorno (tendo sido feita a inserção automática do _id):

~~~js
{
   "acknowledged" : true,
   "insertedId" : ObjectId("56fc40f9d735c28df206d078")
}
~~~

### db.collection.insertMany()

* Exemplo (sem especificar os _ids):

~~~js
try {
   db.products.insertMany( [
      { item: "card", qty: 15 },
      { item: "envelope", qty: 20 },
      { item: "stamps" , qty: 30 }
   ] );
} catch (e) {
   print (e);
}
~~~

* Retorno (tendo sido feita a inserção automática dos _ids):

~~~js
{
   "acknowledged" : true,
   "insertedIds" : [
      ObjectId("56fc40f9d735c28df206d078"),
      ObjectId("56fc40f9d735c28df206d079"),
      ObjectId("56fc40f9d735c28df206d07a")
   ]
}
~~~

## Find

* O valor 1 é para true (retornar valor do campo) e o 0 para false

### db.collection.findOne()

* Exemplo (removendo o _id que vem por padrão):

~~~js
db.movies.findOne(
    { "title" : "Forrest Gump" },
    { "title" : 1, "imdb_rating" : 1, "_id": 0 }
)
~~~

* Retorno:

~~~js
{
    "title" : "Forrest Gump",
    "imdb_rating" : 8.8
}
~~~

> O find retorna apenas os 20 primeiros resultados do MongoDB.
> Utilizar o comando it para mostrar os 20 resultados seguintes.

### db.movies.countDocuments({})

* Retorna a qtd de documentos de uma coleção. Pode receber um critério de seleção para mostrar apenas a qtd de documentos que o satisfazem.

## Tipos e comparações

### db.collection.find( { qty: { $gt: 4 } } )

* Greater than ($gt) retorna os documentos que o campo qty seja maior que 4.
* Por ser um operador de integers, não retorna casos em que a qty tenha outro tipo.

## find()

* Retorna todos os documentos da coleção:

~~~js
db.movies.find()
~~~

* Retorna por igualdade:

~~~js
db.movies.find( { title: "Forrest Gump" } )
~~~

* Retorna atributo do subdocumento ("subdocumento.atributo"):

~~~js
db.movies.find( { "endereco.cidade": "São Paulo" } )
~~~

* Retorna apenas o atributo requirido da coleção toda:

~~~js
db.movies.find( {}, { endereco: 1 } )
~~~

## limit()

### db.collection.find(query).limit(número)

* Retornar os 5 primeiros documentos da coleção bios:

~~~js
db.bios.find().limit(5)
~~~

## pretty()

* Retorna os documentos da coleção em formato legível:

~~~js
db.bios.find().limit(5).pretty()
~~~

## skip()

* Retorna os documentos após pular o número de documentos especificado:

~~~js
db.bios.find().skip(5)
~~~

* Exemplo de skip com limit:

~~~js
db.bios.find().limit(5).skip(5)
~~~

## Operadores de comparação

* Sintaxe: `{ <campo>: { <$operador>: <valor> } }`

### less than (menor que)

~~~js
db.inventory.find({ qty: { $lt: 20 } })
~~~

### less than or equal to (menor ou igual a)

~~~js
db.inventory.find({ qty: { $lte: 20 } })
~~~

### greater than or equal to (maior ou igual a)

~~~js
db.inventory.find({ qty: { $gte: 20 } })
~~~

### equal to (igual a)

~~~js
db.inventory.find({ qty: { $eq: 20 } })
~~~

* É equivalente ao find sem operador:

~~~js
db.inventory.find({ qty: 20 })
~~~

### not equal to (diferente de)

~~~js
db.inventory.find({ qty: { $ne: 20 } })
~~~

### in (dentro de)

~~~js
db.inventory.find({ qty: { $in: [25, 50, 75] } })
~~~

> Apesar de ser possível fazer com or, o in é mais indicado para comparações de igualdade com mais de um valor para o mesmo atributo.

### not in (fora de)

~~~js
db.inventory.find({ qty: { $nin: [25, 50, 75] } })
~~~

> O retorno também incluirá documentos que não tenham o atributo qty.

## Operadores lógicos

### not

* Sintaxe: `{ $not: { <operador ou expressão> } }`

~~~js
db.inventory.find({ qty: { $not: { $gt: 20 } } })
~~~

> Retorna todos os documentos em que qty não é 20 e que não tenham o atributo qty.

### or

* Sintaxe: `{ $or: [ { <expressão> }, { <expressão> }, ... ] }`

~~~js
db.inventory.find({ $or: [{ qty: { $lt: 20 } }, { price: 10 }] })
~~~

### not or

* Sintaxe: `{ $nor: [ { <expressão> }, { <expressão> }, ... ] }`

~~~js
db.inventory.find({ $nor: [{ qty: { $lt: 20 } }, { price: 10 }] })
~~~

> Retorna todos os documentos que não tenham qty menor que 20 e o preço igual a 10.

### and

* Sintaxe: `{ $and: [ { <expressão> }, { <expressão> }, ... ] }`

> É uma short-circuit evaluation. Se um não passar, o resto não é avaliado.

* Múltiplas expressões especificando o mesmo atributo

    ~~~js
      db.inventory.find({
        $and: [
                { price: { $ne: 1.99 } },
                { price: { $exists: true } }
            ]
      })
    ~~~

* Múltiplas expressões especificando o mesmo operador

    ~~~js
      db.inventory.find({
          $and: [
              { price: { $gt: 0.99, $lt: 1.99 } },
              {
                  $or: [
                      { sale : true },
                      { qty : { $lt : 20 } }
                  ]
              }
          ]
      })
    ~~~

### exists

* Sintaxe: `{ campo: { $exists: <boolean> } }`

~~~js
db.inventory.find({ qty: { $exists: true } })
~~~

> Se for true, retorna inclusive se o campo tiver o valor null.

### sort

* Sintaxe: `db.colecao.find().sort({ "campo": "1 ou -1"})`

> 1 retorna crescente e -1 decrescente.

~~~js
db.colecao.find().sort({ nomeDoAtributo: 1 }) // certo
db.colecao.sort({ nomeDoAtributo: 1 }) // errado
~~~

> Só pode ser usado com um método de busca antes.

~~~js
db.example.find().sort({ "price": 1 }).pretty()
~~~

## Removendo documentos

### deleteOne()

~~~js
db.inventory.deleteOne({ status: "D" })
~~~

> Remove o primeiro caso que atende o critério.

### deleteMany()

~~~js
db.inventory.deleteMany({})
~~~

> Remove todos que satisfaçam a condição. Sem parâmetros remove todos da coleção.

## $all

~~~js
db.inventory.find({ tags: { $all: ["red", "blank"] } });
~~~

> tags é um array e $all retorna todos os documentos que no array da chave tag contenham red e blank.

* Utilizando como substituto para o $and:

~~~js
db.inventory.find(
  { tags: { $all: [ "ssl", "security" ] } }
);
//-----------------------------------------
db.inventory.find(
  {
    $and: [
      { tags: "ssl" },
      { tags: "security" }
    ]
  }
);
~~~

## $elemMatch

* Verifica se há um elemento num array que satisfaça os critérios.

~~~js
db.scores.find(
  { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
);
~~~

* No caso de um array de objetos também pode ser utilizado.

~~~js
db.survey.find(
  { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
);
~~~

* Para basear a busca em apenas um campo do subobjeto, não é necessaŕio usar o $elemMatch.

~~~js
db.survey.find(
  { results: { $elemMatch: { product: "xyz" } } }
);
//-----------------------------------------
db.survey.find(
  { "results.product": "xyz" }
);
~~~

## $size

* Encontrar um array com um tamanho específico.

~~~js
db.products.find(
  { tags: { $size: 2 } }
);
~~~

## $expr

* Utilizado para comparar valores de atributos de um documento.

~~~js
db.monthlyBudget.find(
  {
    $expr: { $gt: [ "$spent", "$budget" ] }
  }
);
~~~

> As "$" mostram que as strings referenciam campos.

## $regex

* Utilizado para buscar por um padrão regex.

~~~js
db.products.find({ sku: { $regex: /789$/ } });
~~~

> O exemplo retorna todos documentos que o sku termina com 789.

## $mod

* Operação módulo, que encontra o resto da divisão de um número por outro.

~~~js
db.inventory.find({ qty: { $mod: [4, 0] } });
~~~

> Retorna todos os documentos que o resto da divisão de qty por 4 é 0.

## updateOne()

* Altera apenas o primeiro documento equivalente aos critérios de seleção.

~~~js
db.inventory.updateOne(
  { item: "paper" },
  { $set: { "size.uom": "cm", status: "P" } }
);
~~~

## updateMany()

* Altera todos campos que satisfazem o critério.

~~~js
db.inventory.updateMany(
  { "qty": { $lt: 50 } },
  { $set: { "size.uom": "in", status: "P" } }
);
~~~

## $set

* Se o campo existe, ele altera, se não existe, ele cria todo caminho.

### Alteração top-level (primeiro nível)

~~~js
db.products.update(
  { _id: 100 },
  { $set: {
      quantity: 500,
      details: { model: "14Q3", make: "xyz" },
      tags: [ "coats", "outerwear", "clothing" ]
    }
  }
);
~~~

> O array é substituído por completo.
​
### Alteração em documentos embedados

~~~js
db.products.update(
  { _id: 100 },
  { $set: { "details.make": "zzz" } }
);
~~~
​
> Utiliza-se dot notation para trabalhar com subdocumentos.
​
### Alterações em arrays
​
* É usado o dot notation pra indicar o índice que deve ser alterado.
​
~~~js
db.products.update(
  { _id: 100 },
  { $set: {
      "tags.1": "rain gear",
      "ratings.0.rating": 2
    }
  }
);
~~~
​
## $mul
​
* Multiplica valores existentes.

~~~js
db.products.update(
  { _id: 1 },
  { $mul: { price: NumberDecimal("1.25"), qty: 2 } }
);
~~~
​
> Multiplica price por 1.25 e qty por 2.
​
* Cria novos campos com valor 0 e tipo declarado.
​
~~~js
db.products.update(
  { _id: 2 },
  { $mul: { price: NumberLong("100") } }
);
~~~
​
> É possível multiplicar usando tipos diferentes, mas permanece o tipo original.
​
## $inc
​
* Incrementa ou decrementa valores de um campo.
​
~~~js
db.increment.update(
  { sku: "abc123" },
  { $inc: { quantity: -2, "metrics.orders": 1 } }
);
~~~
​
> Decrementa quantity em 2 e incrementa metrics.order em 1.
​
## $max e $min
​
* $max altera o valor do campo se o valor passado for maior.
​
~~~js
db.collection.updateMany({}, { $max: { campo: 75 } });
~~~
​
* $min altera o valor do campo se o valor passado for menor.
​
~~~js
db.collection.updateMany({}, { $min: { campo: 42 } });
~~~
​
* Pode ser utilizado para comparação de números ou datas.
​
~~~js
db.tags.insertOne(
  {
    _id: 1,
    dateEntered: ISODate("2019-10-01T05:00:00Z")
  }
);
​
db.tags.update(
  { _id: 1 },
  {
    $min: { dateEntered: new Date("2019-09-25") }
  }
);
~~~
​
## $currentDate
​
* Insere a data atual em um campo.
​
* Sintaxe: `{ $currentDate: { <campo>: <typeSpecification>, ... } }`
​
~~~js
db.customers.updateOne(
  { _id: 1 },
  { $currentDate: {
      lastModified: true,
      "cancellation.date": { $type: "timestamp" }
    }, $set: {
      "cancellation.reason": "user request",
      status: "D"
    }
  }
);
~~~
​
> No typeSpecification, usar true para o formato `Date` ou `{ $type: "timestamp" }`.
​
> Também é possível usar `{ $type: "timestamp" }` para o formato Timestamp.
​
## $rename
​
* Alterar o nome de um campo.
​
~~~js
db.fruits.updateOne(
  { name: "Banana" },
  { $rename: {
      "name": "productName"
    }
  }
);
~~~
​
> É possível utilizar com `updateOne()` e `updateMany()`.
​
## $unset
​
* Remove um ou mais campos.
​
~~~js
db.fruits.updateMany(
  { productName: "Banana" },
  { $unset: { quantity: "" } }
);
~~~
​
## $push
​
* Adiciona novo valor a um array.
​
* Sintaxe: `{ $push: { <campo1>: <valor1>, ... } }`
​
### $each
​
* Adiciona múltiplos valores.
​
### $slice
​
* Limita o número de elementos e requer o `$each`.
​
### $sort
​
* Ordena os elementos e requer o `each`.
​
### $position
​
* Especifica a posição que será inserido o valor e requer o `$each`. Sem ele, o `$push` adiciona no final.
​
### Ordem de execução
​
1. Altera o array para adicionar na posição correta;
2. Aplica `$sort`;
3. Aplica `$slice`;
4. Armazena o array.
​
### Adicionar um valor
​
~~~js
use sales;
db.supplies.updateOne(
  { _id: 1 },
  {
    $push: {
      items: {
        "name": "notepad",
        "price":  35.29,
        "quantity": 2,
      },
    },
  },
  { upsert: true },
);
~~~
​
> `upsert` é utilizado para adicionar o documento junto ao `$push`.
​
### Adicionar múltiplos valores
​
~~~js
db.supplies.updateOne(
  {},
  {
push: {
      items: {
each: [
          {
            "name": "pens",
            "price": 56.12,
            "quantity": 5,
          },
          {
            "name": "envelopes",
            "price": 19.95,
            "quantity": 8,
          },
        ],
      },
    },
  },
  { upsert: true },
);
~~~
​
### Múltiplos modificadores
​
~~~js
db.supplies.updateOne(
  { _id: 1 },
  {
    $push: {
      items: {
        $each: [
          {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
          },
          {
            "name": "envelopes",
            "price": 19.95,
            "quantity": 8,
          },
          {
            "name": "pens",
            "price": 56.12,
            "quantity": 5,
          },
        ],
        $sort: { quantity: -1 },
        $slice: 2,
      },
    },
  },
  { upsert: true },
);
~~~
​
## $pop
​
* Remover o primeiro ou último elemento de um array.
​
### Removendo o primeiro
​
~~~js
db.supplies.updateOne({ _id: 1 }, { $pop: { items: -1 } });
~~~
​
### Removendo o último
​
~~~js
db.supplies.updateOne({ _id: 1 }, { $pop: { items: 1 } });
~~~
​
## $pull
​
* Remove tudo de um array ou os valores que atenderem ao critério.
​
### Remover todos por igualdade
​
~~~js
db.supplies.updateMany(
  {},
  {
pull: {
      items: {
        name: { $in: ["pens", "envelopes"] },
      },
    },
  },
);
~~~
​
> Remover objetos do array `items` em que a chave `name` é igual a `"pens"` ou `"envelopes"`.
​
### Remover todos por condição

~~~js
db.profiles.updateOne(
  { _id: 1 },
  {
    $pull: {
      votes: { $gte: 6 },
    },
  },
);
~~~

### Remover itens num array de documentos

~~~js
db.survey.updateMany(
  {},
  {
    $pull: {
      results: { score: 8 , item: "B" },
    },
  },
);
~~~

> Se dentro do array `results` houverem outros arrays, não dá mais pra usar `$pull`.
​
## $addToSet

* Regras

    1. Se o campo não existir, ele será criado no formato array;
    2. Se o campo existe e não é array, a operação não acontece;
    3. Se for passado um documento igual a algum existente no array, não funciona.
​
### Adicionando ao array
​
~~~js
db.inventory.updateOne(
  { _id: 1 },
  { $addToSet: { tags: "accessories" } },
);
~~~
​
> Adiciona `accessories` desde que não exista no array.
​
### Se o valor existir
​
~~~js
db.inventory.updateOne(
  { _id: 1 },
  { $addToSet: { tags: "camera"  } },
);
//-----------------------------------
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
~~~
​
> No exemplo, `camera` já existia no array, então retornou a mensagem de erro.
​
### Inserindo diversos valores
​
~~~js
db.inventory.updateOne(
  { _id: 2 },
  {
addToSet: {
      tags: {
each: ["camera", "electronics", "accessories"],
      },
    },
  },
);
~~~
​
> Se um valor já existir no array, ele não será adicionado, mas o resto será.
​
## Array filters
​
### Alteração estática
​
~~~js
db.recipes.updateOne(
  { title: "Panqueca Simples" },
  { $set: { "ingredients.1.unit": "xícara" } }
);
~~~
​
> É passado o índice `1` para identificação do elemento.
​
### Alteração dinâmica
​
~~~js
db.recipes.updateOne(
  { title: "Panqueca Simples" },
  {
    $set : {
      "ingredients.$[elemento].name": "Farinha Integral",
    },
  },
  { arrayFilters: [ { "elemento.name": "Farinha" } ] },
);
~~~
​
> Onde o `name` do elemento dinâmico era `"Farinha"`, foi trocado por `"Farinha Integral"`.
​
~~~js
db.recipes.updateOne(
  { title: "Panqueca Simples" },
  {
    $set : {
      "ingredients.$[elemento].unit": "xícara",
    },
  },
  { arrayFilters: [ { "elemento.name": "Farinha Integral" } ] },
);
~~~
​
> Condicionado pela propriedade `name` para alterar a propriedade `unit`.
​
~~~js
db.recipes.updateMany( // Passamos de updateOne para updateMany.
  {}, // Retiramos a restrição do título.
  {
    $set : {
      "ingredients.$[elemento].unit": "xícara", // Setamos `unit` como "xícara",
      "ingredients.$[elemento].name": "Farinha Integral", // `name` como "Farinha Integral".
    },
  },
  { arrayFilters: [ { "elemento.name": "Farinha" } ] }, // Filtramos os arrays que o valor da propriedade `name` seja "Farinha".
);
~~~
​
> Fazer as alterações passadas em todos os documentos da seleção com `name` igual a `"Farinha"`.
