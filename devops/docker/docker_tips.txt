Exemplo de clonar um repositório dentro da imagem docker:
docker run --name repo alpine/git clone https://github.com/docker/getting-started.git

docker cp repo:/git/getting-started/ .

cd getting-started

docker build -t docker101tutorial .

docker run -d -p 80:80 --name docker-tutorial docker101tutorial

Docker Hub:

docker tag docker101tutorial /docker101tutorial

docker push /docker101tutorial