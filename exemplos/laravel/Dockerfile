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