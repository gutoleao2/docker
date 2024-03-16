# Desafio Go:

Você terá que publicar uma imagem no docker hub. Quando executarmos:
docker run <seu-user>/fullcycle
Temos que ter o seguinte resultado: Full Cycle Rocks!!

A imagem de nosso projeto Go precisa ter menos de 2MB !

# Execução:
### Buildando o Dockerfile
Faça clone para sua máquina, acesse a pasta app e execute os seguintes comandos:
````
$ docker build -t williamsasantos/fullcycle .
$ docker run williamsasantos/fullcycle:latest
Full Cycle Rocks!!
$ docker image ls -a
REPOSITORY                  TAG       IMAGE ID       CREATED          SIZE
williamsasantos/fullcycle   latest    9b03636db3ae   14 seconds ago   1.9MB
````

### Sem build local (Executando a imagem do dockerhub)
````
$ docker run williamsasantos/fullcycle
Full Cycle Rocks!!
$ docker image ls -a
REPOSITORY                  TAG       IMAGE ID       CREATED          SIZE
williamsasantos/fullcycle   latest    9b03636db3ae   14 seconds ago   1.9MB
````

### Link da imagem no DockerHub: [williamsasantos/fullcycle](https://hub.docker.com/repository/docker/williamsasantos/fullcycle/general) 