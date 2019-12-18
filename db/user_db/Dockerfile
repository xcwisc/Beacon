# Derived from official mysql image
FROM mysql
# Add a database
ENV MYSQL_DATABASE users

COPY create.sql /docker-entrypoint-initdb.d/