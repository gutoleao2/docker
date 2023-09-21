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
- [# 9 - Trabalhando com Volumes](#-9---Trabalhando-com-Volumes)

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
docker ps     -> Os que estão rodando
docker ps -a  -> Todos
```

Para Rodar ou Parar um cotâiner existente
```
docker start primeiro-container     -> docker start <nome-container ou id>
docker stop primeiro-container      -> docker stop <nome-container ou id>
docker stop -f primeiro-container   -> forçar a parada
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
docker run -p 8080:80 nginx       -> O terminal fica 'preso'
docker run -d -p 8080:80 nginx    -> O terminal fica livre
```

* O comando acima significa dizer que quando eu acessar localhost na porta ```8080``` ele deverá direcionar para a porta ```80``` do contâiner.
* Ao rodar o comando acima, percebe-se que o terminal fica 'preso' exibindo logs pois este processo não se encerra só. 
* Para executar o contâiner sem desacoplando o terminal é preciso usar o '```-d```'.


# 6 - Removendo Contâiners
É possível remover contâiners não utilizados ou mesmo em uso.

```
docker rm 9b8898bf88ef                -> rm <id ou nome do contanier>
docker rm 9b8898bf88ef b51d1648d59a   -> rm <ids ou nome do contanier>
docker rm -f 9b8898bf88ef             -> -f força a parada e remoção do processo
```

# 7 - Acessar e Alterar arquivos dentro de um contâiner

Iniciar um contâiner com imagem nginx
```
docker run -d --name nginx -p 8080:80 nginx
```

Executar Comandos dentro do container
```
docker exec nginx ls    -> vai rodar o comando 'ls' dentro do container 
```
* O comando acima, vai executar e sair. Ou seja, entrar no contâiner, listar os diretórios e sair.

Acessar o bash do container
```
docker exec -it nginx bash   -> vai rodar o comando 'bash' dentro do container 
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
docker volume create meu-volume   ->  <meu-volume> é o nome do volume a ser criado
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