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

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]