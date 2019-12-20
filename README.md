# Beacon
## Backend
### create database
* make sure you have docker running in the backround
```bash
$ cd db/user_db/
$ docker build -t my-mysql .
$ docker run -d -p 3306:3306 --name my-mysql \
-e MYSQL_ROOT_PASSWORD=supersecret my-mysql
```

### access database
```bash
$ docker exec -it my-mysql bash
:/# mysql -uroot -p
Enter password: (supersecret)
```

### start users service
```bash
$ cd services/users/
$ npm run dev
```

## Frontend
```bash
$ cd services/frontend/
$ npm start
```