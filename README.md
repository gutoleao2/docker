This is about Docker (My notes for docker use are saved here. is my personal source of information)

## Sumário

- [1 - Instalação do WSL 2](#1---Instalação-do-WSL-2)
- [2 - Instalar o Docker com Docker Engine (Docker Nativo)](#2---instalar-o-docker-com-docker-engine-docker-nativo)
- [3 - Começando com Docker (Hello World) !](#3---Começando-com-Docker-(Hello-World)-!)
- [4 - Interagindo com Imagens](#4---Interagindo-com-Imagens)
- [5 - Publicando portas](#5---Publicando-portas)
- [6 - Removendo Contâiners](#6---Removendo-Contâiners)
- [7 - Acessar e Alterar arquivos dentro de um contâiner](#7---Acessar-e-Alterar-arquivos-dentro-de-um-contâiner)
- [8 - Trabalhando com bind mounts](#8---Trabalhando-com-bind-mounts)
- [9 - Trabalhando com Volumes](#9---Trabalhando-com-Volumes)
- [10 - Trabalhando com Imagens](#10---Trabalhando-com-Imagens)
    - [10.1 - Criando primeira imagem com Dockerfile](##10.1---Criando-primeira-imagem-com-Dockerfile)
    - [10.2 - ENTRYPOINT vs CMD](####10.2---ENTRYPOINT-vs-CMD)
    - [10.3 - Publicando imagens no DockerHub](####10.3---Publicando-imagens-no-DockerHub)
- [11 - Networks](#11---Networks)
- [12 - Instalando Framework em um container](#12---Instalando-Framework-em-um-container)
- [13 - Criando ambiente de desenvolvimento para nodejs](#13---Criando-ambiente-de-desenvolvimento-para-nodejs)
- [15 - Docker Compose](#15---Docker-Compose)
    - [15.1 - Buildando imagens com docker-compose](##15.1---Buildando-imagens-com-docker-compose)
    - [15.2 - Criando banco de dados MYSql](##15.2---Criando-banco-de-dados-MYSql)
    - [15.3 - Adicionando app node com docker-compose](##15.3---Adicionando-app-node-com-docker-compose)
    - [15.4 - Adicionando tabela e fazendo o primeiro insert com node em container com o mysql(db)](##15.4---Adicionando-tabela-e-fazendo-o-primeiro-insert-com-node-em-container-com-o-mysql(db))


# 1 - Instalação do WSL 2

### Windows Update

Verifique se seu Windows está atualizado, pois o WSL 2 depende de uma versão atualizada do Hyper-V. Verifique o Windows Update.

### Atualizar o WSL

Com a versão 2004 do Windows 10 ou Windows 11, o WSL já está presente em sua máquina, execute o comando para pegar a versão mais recente do WSL:

``` bash
wsl --update
```

E pegue a versão mais recente do WSL.

### Atribuir a versão default do WSL para a versão 2

A versão 1 do WSL pode ser a padrão em sua máquina, execute o comando abaixo para definir como padrão a versão 2:

``` bash
wsl --set-default-version 2
```

### Instale o Ubuntu

Execute o comando:

```bash
wsl --install
```

Este comando irá instalar o `Ubuntu` como o Linux padrão. 

Se você quiser instalar uma versão diferente do Ubuntu, execute o comando `wsl -l -o`. Será listado todas as versões de Linux disponíveis. Instale a versão escolhida com o comando `wsl --install -d nome-da-distribuicao`.

Sugerimos o Ubuntu (sem versão) por ser uma distribuição popular e que já vem com várias ferramentas úteis para desenvolvimento instaladas por padrão.

Após o término do comando, você deverá criar um **nome de usuário** que poderá ser o mesmo da sua máquina e uma **senha**, este será o usuário **root da sua instância WSL**.

Para abrir uma nova janela do Ubuntu, basta digitar `Ubuntu` no menu iniciar e clicar no ícone do Ubuntu.	

Recomendamos o uso do [Windows Terminal](https://docs.microsoft.com/pt-br/windows/terminal/get-started) como terminal padrão para desenvolvimento no Windows. Ele agregará o shell do Ubuntu, assim como o PowerShell e o CMD em uma única janela.

### (Opcional) Alterar a versão de uma distribuição do Linux de WSL 1 para WSL 2

Se a distribuição Linux que você instalou estiver na versão 1, você pode alterar para a versão 2 com o seguinte comando:

``` bash
wsl --set-version <distribution name> 2
```

# 2 - Instalar o Docker com Docker Engine (Docker Nativo)

Guia de apoio para instalanção:
https://github.com/codeedu/wsl2-docker-quickstart#docker-engine-docker-nativo-diretamente-instalado-no-wsl2

Instale os pré-requisitos:

```
sudo apt update && sudo apt upgrade
sudo apt remove docker docker-engine docker.io containerd runc
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

Adicione o repositório do Docker na lista de sources do Ubuntu:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Instale o Docker Engine

```
sudo apt-get update
```
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Dê permissão para rodar o Docker com seu usuário corrente:

```
sudo usermod -aG docker $USER
```


Reiniciar o WSL via linha de comando do Windows para que não seja necessário autorização root para rodar o comando docker:

```
wsl --shutdown
```


Acessar novamente o Ubuntu e iniciar o serviço do Docker:

```
sudo service docker start
```

Este comando acima terá que ser executado toda vez que o Linux for reiniciado. Se caso o serviço do Docker não estiver executando, mostrará esta mensagem de erro ao rodar comando `docker`:

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

O Docker Compose instalado agora estará na versão 2, para executa-lo em vez de `docker-compose` use `docker compose`.

## Dicas e truques básicos com WSL 2

* A performance do WSL 2 está em se executar tudo dentro do Linux, por isso evite executar seus projetos com ou sem Docker do caminho `/mnt/c`, pois você perderá performance.
* Para abrir o terminal do WSL basta digitar o nome da distribuição no menu Iniciar ou executar `C:\Windows\System32\wsl.exe`.
* O sistema de arquivos do Windows 10/11 é acessível em `/mnt/c`.
* É possível acessar o sistema de arquivos do Linux pela rede do Windows, digite `\\wsl$` no Windows Explorer.
* É possível acessar uma pasta no Windows Explorer digitando o comando ```explorer.exe .```.
* É possível abrir uma pasta ou arquivo com o Visual Studio Code digitando o comando ```code . ou code meu_arquivo.ext```.
* Incrivelmente é possível acessar executáveis do Windows no terminal do Linux executando-os com .exe no final (não significa que funcionarão corretamente).
* É possível executar algumas aplicações gráficas do Linux com WSL 2. Leia este tutorial: [https://medium.com/@dianaarnos/aplica%C3%A7%C3%B5es-gr%C3%A1ficas-no-wsl2-e0a481e9768c](https://medium.com/@dianaarnos/aplica%C3%A7%C3%B5es-gr%C3%A1ficas-no-wsl2-e0a481e9768c).
* Execute o comando ```wsl -l -v``` com o PowerShell para ver as versões de Linux instaladas e seu status atual(parado ou rodando).
* Execute o comando ```wsl --shutdown``` com o PowerShell para desligar todas as distribuições Linux que estão rodando no momento (ao executar o comando, as distribuições do Docker também serão desligadas e o Docker Desktop mostrará uma notificação ao lado do relógio perguntando se você quer iniciar as distribuições dele novamente, se você não aceitar terá que iniciar o Docker novamente com o ícone perto do relógio do Windows).
* Execute com o PowerShell o comando ```wsl --t <distribution name>``` para desligar somente uma distribuição Linux específica.
* Se verificar que o WSL 2 está consumindo muitos recursos da máquina, execute os seguintes comandos dentro do terminal WSL 2 para liberar memória RAM:
```bash
echo 1 | sudo tee /proc/sys/vm/drop_caches
```
* Acrescente `export DOCKER_BUILDKIT=1` no final do arquivo .profile do seu usuário do Linux para ganhar mais performance ao realizar builds com Docker. Execute o comando `source ~/.profile` para carregar esta variável de ambiente no ambiente do seu WSL 2.
* No Windows 11 é possível iniciar o Docker automaticamente, veja a seção: [Dica para Windows 11](#dica-para-windows-11)


# 3 - Começando com Docker (Hello World) !

Depois da devida instalção do WSL e Docker, é possível começar a utilizar essa ferramenta...

Iniciar o serviço do docker

```
sudo service docker start
```

Iniciar o primeiro container

```
docker run hello-world
```
* docker run hello-world -> ```docker run <nome-da-imagem>```
* Caso a imagem 'hello-world' não exista, a imagem será baixada. Caso exista, será executada.
* (Opcional) É boa prática inserir um nome para o container e qual a versão da imagem que se deseja utilizar, portanto o comando completo seria:  
```docker run --name primeiro-container hello-world:latest``` -> ```docker run --name  <nome-container> <nome-da-imagem>:<vesao>```

Vizualizar os containers

```
docker ps           # -> Os que estão rodando
docker ps -a        # -> Todos
```

Para Rodar ou Parar um cotâiner existente
```
docker start primeiro-container                     # -> docker start <nome-container ou id>
docker stop primeiro-container                      # -> docker stop <nome-container ou id>
docker stop -f primeiro-container                   # -> forçar a parada
```

# 4 - Interagindo com Imagens

Para este exemplo, vamos executar a imagem do ubunto.

```
docker run -it ubuntu bash
```
* Sempre que desejarmos executar uma imagem no modo interativo, é preciso passar o '```-it```', em sequência dizer qual é a imagem '```ubuntu```' (nesse caso) e qual o comando que se deseja executar '```bash```'
* O '```-it``` ou ```-i -t```' significa que o processo será acoplado ao terminal onde foi rodado e que o terminal estará liberado para digitação.


Para remover um container ao finalizar o processo 

```
docker run -it --rm ubuntu bash
```

# 5 - Publicando portas

É possível configurar o acesso a um contâiner através de portas.


```
docker run -p 8080:80 nginx                         # -> O terminal fica 'preso'
docker run -d -p 8080:80 nginx                      # -> O terminal fica livre
```

* O comando acima significa dizer que quando eu acessar localhost na porta ```8080``` ele deverá direcionar para a porta ```80``` do contâiner.
* Ao rodar o comando acima, percebe-se que o terminal fica 'preso' exibindo logs pois este processo não se encerra só. 
* Para executar o contâiner sem desacoplando o terminal é preciso usar o '```-d```'.


# 6 - Removendo Contâiners
É possível remover contâiners não utilizados ou mesmo em uso.

```
docker rm 9b8898bf88ef                             # -> rm <id ou nome do contanier>
docker rm 9b8898bf88ef b51d1648d59a                # -> rm <ids ou nome do contanier>
docker rm -f 9b8898bf88ef                          # -> -f força a parada e remoção do processo
```

# 7 - Acessar e Alterar arquivos dentro de um contâiner

Iniciar um contâiner com imagem nginx
```
docker run -d --name nginx -p 8080:80 nginx
```

Executar Comandos dentro do container
```
docker exec nginx ls                # -> vai rodar o comando 'ls' dentro do container 
```
* O comando acima, vai executar e sair. Ou seja, entrar no contâiner, listar os diretórios e sair.

Acessar o bash do container
```
docker exec -it nginx bash          # -> vai rodar o comando 'bash' dentro do container 
```
* O comando acima, vai executar o bash e permanecer até que o usuário queira finalizar.

Acessar o diretório do arquivo 'welcome' do servidor nginx, intalar o 'vim' e  alterar o arquivo index.html
```
cd /usr/share/nginx/html
apt-get update
apt-get install vim
vim index.html (digitar 'i' para conseguir editar, depois ESC :wq! para gravar e sair)
```

# 8 - Trabalhando com bind mounts
Uma imagem é imutável. Mesmo que eu acesse e altere um arquivo dentro de um contâiner, quando ele for parado/reiniciado estes ajustes serão perdidos.

O recurso ```bind mounts``` permite acoplar um diretório do seu computador local com um do seu contâiner. Fazendo isto os arquivos não são perdidos quando o contâiner morrer.

```
docker run -d --name nginx -p 8080:80 --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html nginx 
```
* ```$(pwd)``` é um atalho para capturar a pasta de trabalho atual.
* ```--mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html``` Significa dizer que quero vincular a pasta 'source' com a pasta 'target'.

# 9 - Trabalhando com Volumes
Ao usar o ```bind mounts``` nós estamos simplesmente ligando uma pasta com uma outra. Ao usar ```volumes``` nós criamos 'pequenos hds' que podem inclusive ser compartilhados com outros contâiners. Isto pode siginificar aumento de performance e também facilita o uso pois podemos esquecer algum mapeamento entre as pastas mas ao conectar o volume teremos acesso 

Criar Volumes
```
docker volume create meu-volume         # ->  <meu-volume> é o nome do volume a ser criado
```

Informações de Volumes
```
docker volume inspect meu-volume

- resultado: 
[
    {
        "CreatedAt": "2023-09-21T11:45:35-03:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/meu-volume/_data",
        "Name": "meu-volume",
        "Options": null,
        "Scope": "local"
    }
]
```

Listar Volumes
```
docker volume ls
```
Conectar volume a um contâiner
```
docker run --name nginx -p 8080:80 -d --mount type=volume,source=meu-volume,target=/app nginx
```
Ou
```
docker run --name nginx -p 8080:80 -d -v meu-volume:/app nginx
```

Limpar dados de volume
```
docker volume prune
```

# 10 - Trabalhando com Imagens

Imagens docker são arquivos que contêm todas as informações necessárias para executar um aplicativo ou um serviço em um contêiner. As imagens docker ficam armazenadas em um repositório online chamado Docker Hub, onde você pode baixar, criar e compartilhar imagens com outros usuários.

## 10.1 - Criando primeira imagem com Dockerfile

O Dockerfile é nossa receita que indica tudo o que estará contido na minha imagem.


Exemplo de criação de Dockerfile com uma imagem do nginx:

* 1 - Criar o arquivo Dockerfile
```
# 'FROM' indica a Imagem que quero usar e ':latest', indica a versão
FROM nginx:latest               

# Indica o diretório de trabalho. Onde o programa irá rodar
WORKDIR /app    

# 'RUN' indica que quero rodar um comando
# atualizar os pacotes do linux e instalar o vim
RUN apt-get update && \
    apt-get install vim -y      

# Copiando dados da pasta local 'html' para a pasta 'html' dentro do container
COPY html/ /usr/share/nginx/html
```

* 2 - Fazer o build da imagem

```
docker build -t williamsasantos/nginx-com-vim:latest .  # -> vide explicação abaixo.
```

O -t serve para indicar o nome:     
 -t <usuario_docker_hub>/<nome_que_quero_dar>:versao <local_do_pc_onde_quero_gerar_a_imagem>

* 3 - Verificar a existência da imagem com o nome que foi atribuido.
```
docker images
```

* 4 - Acessar a imagem criada
```
docker run -it williamsasantos/nginx-com-vim bash
```

* 5 - Remover imagem criada ou container
```
docker rm (docker ps -a -q) -f          # -> remove todos os container
docker rmi $(docker images -a -q) -f    # -> remove todas as imagens
```

## 10.2 - ENTRYPOINT vs CMD
CMD: 
    O comando CMD executa algo depois de rodar a imagem e pode ser substituído por um comando ao executar uma imagem.
    Ou seja, ao usar CMD, temos um comando variável.

ENTRYPOINT:
    Utilizando este comando, teremos uma linha de comando fixa. Ou seja, o que estiver declarado na imagem será executado sem a possibilidade de alterações.


* 1 - Criar o arquivo Dockerfile
```
# 'FROM' indica a Imagem que quero usar e ':latest', indica a versão
FROM ubuntu:latest               

ENTRYPOINT [ "echo", "Hello "]  
CMD [ "World !" ]

```

* 2 - Build e Run
```
$ docker build -t williamsasantos/ubuntu:latest .  
$ docker run -t williamsasantos/ubuntu
Hello  World !                                      
$ docker run -t williamsasantos/ubuntu Guto!            # -> adicionar um comando ao final do run
Hello  Guto!                                            # -> O resultado é que ele é executado substituindo o comando existente no dockerfile
```

## 10.3 - Publicando imagens no DockerHub

* 1 - Criar uma imagem a partir da imagem pronta do nginx, e substituir o arquivo index.html por um que criei com meu nome.
    Logo após, irá executar o comando ENTRYPOINT e por fim, o CMD

```
FROM nginx:latest               

WORKDIR /app    

RUN apt-get update && \
    apt-get install vim -y      

COPY html/ /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

* 2 - Build e Run
```
$ docker build -t williamsasantos/nginx-vim:latest . 
$ docker run --rm -d -p 8080:80 williamsasantos/nginx-vim       # -> -d garante que a execução não prenda o terminal. --rm remove o contâiner assim que ele for derrubado.
```

* 3 - Criar conta no DockerHub(https://hub.docker.com/) e fazer Login 

```
$ docker login
Log in with your Docker ID or email address to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com/ to create one.
You can log in with your password or a Personal Access Token (PAT). Using a limited-scope PAT grants better security and is required for organizations using SSO. Learn more at https://docs.docker.com/go/access-tokens/

Username: williamsasantos
Password:

Login Succeeded
```

* 4 - Push ( A partir daqui, qualquer pessoa poderá usar esta imagem apenas rodando o RUN 'docker run williamsasantos/nginx-vim')
```
$ docker push williamsasantos/nginx-vim
Using default tag: latest
The push refers to repository [docker.io/williamsasantos/nginx-vim]
fbc4840017ec: Pushed
latest: digest: sha256:1d243fc8d3812aaf90f9adf41ee5654acd7d5dbd04c67fc43f11396aae3ab13d size: 2403
```


# 11 - Networks
O Docker possui uma rede interna que roda dentro dele.
Um dos principais usos dessas redes, é a comunicação entre containers.
Os principais TIPOS de rede são 'bridge' , 'host', 'overlay' e 'none'.

Comandos comuns no uso de network:
```
docker network ls                                               # -> Lista todas as redes existentes~
docker network prune                                            # -> Remove todas as redes sem uso
docker network inspect bridge                                   # -> Mostra detalhes da rede bridge, como por exemplo quem está nela.
docker network create --driver bridge minharede                 # -> Cria uma rede bridge
$ docker run --rm -d --name nginx --network host nginx          # -> Cria uma rede host
docker run -d -it --name ubuntu1 --network minharede bash       # -> Cria um container dentro de uma rede específica
docker network connect minharede ubuntu3                        # -> Conecta um container já existente a uma rede específica
```

## Bridge
* Este é o tipo de rede padrão. Quando se cria uma network e não se informa um tipo, ele é bridge.

Para exemplificar este tipo de rede, vamos criar dois containers e realizar a inspeção da rede.
Podemos verificar que os dois containers estão usando a rede bridge:

```
docker run -d -it --name ubuntu1 bash               # -> container1
docker run -d -it --name ubuntu2 bash               # -> container2
docker network inspect bridge 
# Resultado: 
[
    {
        "Name": "bridge",
        "Id": "6a1adba54eb29874ce4bdcb59c13b75a353a1afff6abe601406f329b9adb4d57",
        "Created": "2024-02-21T21:20:56.7750646-03:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "452c128002a6b8ed947e97ea8904eb14f6ee4cfa7ab9e28fb8c9980c8fcd35b2": {
                "Name": "ubuntu2",
                "EndpointID": "786d0cb3efdc8e64658226063cdd1d4d4dbadd2fd14b81451ff5e4ccb9e1488b",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "8ae351bc0623d86cc7cbfa68d828cb60c20716ee78281813dcf584e02cb11c42": {
                "Name": "ubuntu1",
                "EndpointID": "2c3a71297869adf640c87a892351fc6cf64dd1131d21a4264813a920705bbbe9",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```


Podemos também acessar um container criado e através dele, fazer um ping para outro container na mesma rede:

```
docker attach ubuntu1                         # -> Acessar um container que esteja rodando de forma não atachada

bash-5.2# ip addr show                        # -> exibir infos de rede dentro de uma máquina linux

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
4: eth0@if5: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

bash-5.2# ping 172.17.0.3/16                    # -> Fazer ping no outro container dentro da rede

ping: bad address '172.17.0.3/16'
bash-5.2# ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3): 56 data bytes
64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.137 ms
64 bytes from 172.17.0.3: seq=1 ttl=64 time=0.218 ms
64 bytes from 172.17.0.3: seq=2 ttl=64 time=0.080 ms
^C
--- 172.17.0.3 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.080/0.145/0.218 ms
```

Obs: Por padrão, utilizando o tipo de rede bridge, não é possível fazer ping pelo nome das máquinas, mas somente pelo ip.
Mas este problema é solucionado ao criar uma nova rede brigde ao invés de usar a rede padrão.

```
$ docker network create --driver bridge minharede                       # -> Criando uma rede bridge
cf96708e5d4f6e348ed9132d8c1c1cbb6dd054fef630a19d726df98d84101ec9
$ docker network ls                                                     # -> Listando as redes
NETWORK ID     NAME        DRIVER    SCOPE
6a1adba54eb2   bridge      bridge    local
c6f288ad4539   host        host      local
cf96708e5d4f   minharede   bridge    local
709f78e2e056   none        null      local
$ docker run -d -it --name ubuntu1 --network minharede bash             # -> Criando um container
491c0d247febbf88b865fc90b5499bdf11e5a3b24bb05f9d19524fe8cabded9f
$ docker run -d -it --name ubuntu2 --network minharede bash             # -> Criando outro container
f141e65b9ab830223e41b41ba0d95364a4914e852715d25d3819f031b058b651
$ docker exec -it ubuntu1 bash                                          # -> Acessando um dos containers
bash-5.2# ping ubuntu2                                                  # -> Fazer ping no outro container dentro da rede
PING ubuntu2 (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.116 ms
64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.120 ms
64 bytes from 172.18.0.3: seq=2 ttl=64 time=0.102 ms
^C
--- ubuntu2 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.102/0.112/0.120 ms
```


## Host
* Este tipo, faz com que o container use a mesma rede do docker host, ou seja ele vai usar a rede do computador onde o docker está rodando.

Para exemplificar este tipo, vamos criar um container com a imagem do nginx.
Ao acessar via console ou navegar o endereço 'http://localhost' direto de minha máquina, devemos ter como retorno a página do nginx.

```
docker run --rm -d --name nginx --network host nginx              # -> Cria e remove o container quando ele for derrubado
e76b77c0b2763ce11224c63319c3d68e098039c4641c3760f930d3b7d0a78015
```
Microsoft Windows [versão 10.0.19045.4046]
(c) Microsoft Corporation. Todos os direitos reservados.

````
C:\Users\will> curl http://localhost        # -> Este comando é na minha máquina, não no container!

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
````

Também é possível inverter, fazendo com que o container acesse a máquina local.
Para este exemplo, vamos supor que existe algum serviço que o container precisa acessar na porta 8000 da máquina local:

```
curl http://host.docker.internal:8000
```


## Overlay
* Quando tenho containers que estão em máquinas e redes diferentes e preciso fazer comunicação entre eles.

## None
* Quando o container não precisa se comunicar com algum outro.

# 12 - Instalando Framework em um container

A dica aqui, é: sempre que precisar criar uma imagem, vá executando os processos de instalação no seu computador e copie os comandos até a finalização do processo, ou seja, até que o framework que você precisa instalar esteja rodando perfeitamente.

Neste caso, vamos usar uma imagem laravel(php):

```
FROM php:7.4-cli

WORKDIR /var/www

RUN apt-get update && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip

# Configuracoes php
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

RUN php composer.phar create-project --prefer-dist laravel/laravel laravel

# rodar e manter o service laravel rodando
ENTRYPOINT [ "php" , "laravel/artisan", "serve"]

# permitir acesso de qualquer host ao servico laravel rodando no container
CMD [ "--host=0.0.0.0" ]
```

Build e execução da imagem
```
docker build -t williamsasantos/laravel:latest .

docker run --rm -d --name laravel -p 8000:8000 williamsasantos/laravel
```
Acessando o navegador na porta indicada, veremos a página do laravel.


No nosso exemplo, usamos o command para indicar que o service laravel poderia ser acessado por qualquer host, ou inserir --host=0.0.0.0.
Por se tratar do CMD podemos então substituir este comando. 
Agora, vamos mudar a porta e manter a permissão de acesso de outra forma:

```
docker run  -d --name laravel -p 8001:8001 williamsasantos/laravel --host=0.0.0.0 --port=8001
```
Acessando novamente o navegador na porta indicada, veremos a página do laravel.

Publiucando a imagem:
```
docker login
docker push williamsasantos/laravel:latest
```

# 13 - Criando ambiente de desenvolvimento para nodejs

Neste exemplo, vamos criar um simples app node com express que vai retornar um 'hello world'.
Aqui a ideia é cria um ambiente com tudo que é necessário para desenvolver e rodar um service nodejs no container, onde o código vai estar no pc local e a execução será no container.

Criando o container com um volume para permitir acesso da minha máquina para uma pasta do container:
```
docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node:15 bash
```

Instalando express e criando o package:
```
cd usr/src/app/
npm install express
npm init -y
touch index.js              # Cria o aquivo index.js
```

Criando um servico (basta editar o arquivo index criado anteriormente):
```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.listen(port, () => console.log('Rodando na porta ' + port))
```

Rodando o service express
```
node index.js
```
Agora, ao acessar localhost na porta 3000, o service deve responder.


* Dica!
É possível criar um dockerfile por cada ambiente, sendo assim vamos criar um para dev e outro para prod.
A nível de exemplo, No caso de prod vamos copiar todo o conteúdo local, no de dev vamos instalar as dependências:

Criando os Dockerfile:

Dockerfile.prod

```
FROM node:15

WORKDIR /usr/src/app

# Copia o conteúdo local para a pasta do workdir
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
```

Para executar o build do arquivo de prod:
```
docker build -t willimasasantos/node-express:latest . -f Dockerfile.prod
```

Dockerfile
```
FROM node:15

WORKDIR /usr/src/app

RUN npm install express && \
    npm init -y 

EXPOSE 3000

CMD [ "node", "index.js" ]
```

# 14 - Otimização utilizando Multistage Building

Neste tópico vamos aprender a otimizar imagens. O objetivo é reduzir ao máximo o tamanho dos nossos containers para o ambiente produtivo, isto não só reduz o tamanho mas também torna mais segura.
No nosso caso estamos usando uma imagem 'php:7.4-cli' e instalando alguns pacotes que acabam deixando a imagem mais pesada do que deveria. 
Então, vamos criar um nome para o primeiro stage do dockerfile e depois, no segundo stage, recuperar dele só o que nos interessa.

* Dica: normalmente as imagens Alpine linux são menores !

Obs: Vamos otimizar a imagem gerada no tópico [12 - Instalando Framework em um container](#12---Instalando-Framework-em-um-container).


Criando nossa imagem:
```
# stage 1
FROM php:7.4-cli AS builder 

WORKDIR /var/www

RUN apt-get update && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip

# Configuracoes php
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

RUN php composer.phar create-project --prefer-dist laravel/laravel laravel


# stage 2
# 0 - Dar nome ao build acima (AS builder na primeira linha - poderia ser qualquer nome)
# 1 - usar a imagem abaixo por ser mais enxuta.
# 2 - setar o diretório de trabalho e remover e limpar o que estiver nele para inserir o que queremos.
# 3 - copiar o conteúdo da pasta '/var/www/laravel' existente no builder do stage 1, para a pasta especificada como workdir     
# 4 - mudar dono da pasta de trabalho para evitar problemas de permissão (chown)
# 5 - expor uma porta e rodar o comando para subir o serviço  
FROM php:7.4-fpm-alpine
WORKDIR /var/www
RUN rm -rf /var/www/html
COPY --from=builder /var/www/laravel .
RUN chown -R www-data:www-data /var/www
EXPOSE 9000
CMD [ "php-fpm" ]
```

Após build e comparação das imagem gerada antes da otimização com a versão de prod vemos a grande diferença de tamanho:
```
$ docker build -t williamsasantos/laravel:prod -f Dockerfile.prod .
$ docker images | grep laravel
williamsasantos/laravel              prod      41404b9d5bf1   23 minutes ago   141MB
williamsasantos/laravel              latest    0df96b95d05c   29 hours ago     555MB
```

# 15 - Docker Compose

Comandos comuns no uso de docker-compose:
```
docker-compose up -d                               # -> subir o que estiver no compose deixando o terminal livre
docker-compose ps                                  # -> listar services do compose
docker-compose down                                # -> derrubar os services do compose
docker-compose up -d --build                       # -> sobe os services rebuildando com o conteúdo que estiver sendo referenciado no compose
```

Docker compose é uma ferramenta complementar ao docker e veio para facilitar o trabalho.
Para montar um ambiente com containers é preciso escrever vários Dockerfiles e subir separadamente.
Com o docker-compose, podemos escrever num único arquivo quais os 'services' que queremos subir e quais as suas configurações e ao final num único comando, subir todo o conteúdo.


No exemplo abaixo, estou usando a versão 3 do docker-compose, subindo dois services/containers, criando e utilizando uma rede
```
version: '3'

services:

  laravel:
    image: williamsasantos/laravel:prod
    container_name: laravel
    networks:
      - laranet
  
  nginx:
    image: williamsasantos/nginx:prod
    container_name: nginx
    networks:
      - laranet
    ports:
      - "8080:80"

networks:
  laranet:
    driver: bridge
```

Rodando o docker compose
```
docker-compose up -d 
```

# 15.1 - Buildando imagens com docker-compose

No exemplo anterior, usamos imagens fixas/específicas dentro do nosso composer.
Agora, vamos referenciar arquivos dockerfile para fazer build delas a fim de que possamos modificar as imagens e que queremos utilizar e havendo mudança, possamos subir container atualizados via compose.


```
version: '3'

services:

  laravel:
    build:
      # pasta onde o docker file está
      context: ../laravel
      # arquivo docker que quero subir
      dockerfile: Dockerfile.prod
    image: williamsasantos/laravel:prod
    container_name: laravel
    networks:
      - laranet
  
  nginx:
    build: 
      # pasta onde o docker file está
      context: ../nginx
      # arquivo docker que quero subir
      dockerfile: Dockerfile.prod
    image: williamsasantos/nginx:prod
    container_name: nginx
    networks:
      - laranet
    ports:
      - "8080:80"

networks:
  laranet:
    driver: bridge

```

Obs!
O compose não identifica mudanças automaticamente, por isto, sempre que houver mudanças é preciso sinalizar para que haja build.

Buildando e subindo de docker-compose:
```
docker-compose up -d --build                       # -> sobe os services rebuildando com o conteúdo que estiver sendo referenciado no compose
```

# 15.2 - Criando banco de dados MYSql 

Vamos criar um docker-compose que tem a finalidade de subir um app nodejs que vai se conectar a um bando de dados mysql.

Criação do docker-compose com o mysql:

```
version: '3'

services:

  db:
    image: mysql:5.7
    # comando padrão para boot no container
    command: --innodb-use-native-aio=0
    container_name: db
    # para que se houver algum problema e o container cair, ele vai subir outro automáticamente
    restart: always
    # se precisar entrar no service de forma interativa, precisa habilitar o tty
    tty: true
    # volumes para que quando o container morrer, não percamos o conteúdo do mysql.
    # ou seja, tudo que for inserido dentro do container na pasta '/var/lib/mysql' será escrito também na pasta local './mysql'
    volumes:
      - ./mysql:/var/lib/mysql
    # Setar variáveis de ambiente no container
    environment:
      - MYSQL_DATABASE=nodedb
      - MYSQL_ROOT_PASSWORD=root
      # - MYSQL_USER=root
    # usar rede específica
    networks:
      - node-network

# criar uma rede
networks:
  node-network:
    driver: bridge
```

# 15.3 - Adicionando app node com docker-compose

Vamos agora, adicionar o nosso app nodejs referenciando o projeto exemplo que usamos no item 13 (#13---Criando-ambiente-de-desenvolvimento-para-nodejs)
```
version: '3'

services:

  nodejs:
    build: 
      context: ./nodejs
    container_name: app
    networks:
      - node-network
    volumes:
      - ./nodejs:/usr/src/app
    tty: true
    ports:
      - "3000:3000"

  db:
    image: mysql:5.7
    # comando padrão para boot no container
    command: --innodb-use-native-aio=0
    container_name: db
    # para que se houver algum problema e o container cair, ele vai subir outro automáticamente
    restart: always
    # se precisar entrar no service de forma interativa, precisa habilitar o tty
    tty: true
    # volumes para que quando o container morrer, não percamos o conteúdo do mysql.
    # ou seja, tudo que for inserido dentro do container na pasta '/var/lib/mysql' será escrito também na pasta local './mysql'
    volumes:
      - ./mysql-volume:/var/lib/mysql
    # Setar variáveis de ambiente no container
    environment:
      - MYSQL_DATABASE=nodedb
      - MYSQL_ROOT_PASSWORD=root
      # - MYSQL_USER=root
    # usar rede específica
    networks:
      - node-network

# criar uma rede
networks:
  node-network:
    driver: bridge
```

# 15.4 - Adicionando tabela e fazendo o primeiro insert com node em container com o mysql(db)

Primeiro, vamos buildar e rodar o docker-compose

```
docker-compose up -d --build
```

Agora, vamos acessar o container DB, depois acessar o mysql e criar um database e tabela
```
docker exec -it db bash
mysql -uroot -p
mysql> use nodedb;
Database changed
mysql> create table people(id int not null auto_increment, name varchar(255), primary key(id));
Query OK, 0 rows affected (0.02 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| nodedb             |
| performance_schema |
| sys                |
+--------------------+
mysql> desc people;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
2 rows in set (0.00 sec)
```

Agora, vamos acessar o container APP, e instalar o pacote npm do mysql e editar o arquivo index.js do nodejs

```
docker exec -t app bash
npm install mysql --save
```

arquivo index.js: 
```
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const configDb = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(configDb);

const sql = `INSERT INTO people(name) values('Guto')`;
connection.query(sql);
connection.end();


app.get('/hello', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.listen(port, () => console.log('Rodando na porta ' + port))
```


Agora vamos rodar o servico devemos ter um insert na tabela people

```
node index.js 
```

Agora, vamos acessar o container DB e validar o insert
```
docker exec -it db bash
mysql -uroot -p

mysql> select * from people;
+----+------+
| id | name |
+----+------+
|  1 | Guto |
+----+------+
1 row in set (0.00 sec)

mysql>
```

