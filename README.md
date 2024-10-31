# sveltekit-v2

## About

SvelteKit minimal + prettier, eslint + ローカルDocker環境

追加予定：

- Prisma（10/29追加済み）
- Lucia　→ grabpassとする（10/30追加済み）

## Setup

```terminal
$ git clone https://github.com/bashij/sveltekit-v2.git
$ cd sveltekit-v2
$ docker-compose build
$ docker-compose run --rm app yarn install
$ cp .env.example .env
$ docker-compose run --rm app yarn prisma migrate dev
$ docker-compose up -d
```

## 暫定サンプルレコード作成

```sql
$ docker-compose exec db /bin/bash -c 'mysql -u root -pmysecretpassword'

insert into User (name, email) values('test1', 'test1@example.
com');
insert into User (name, email) values('test2', 'test2@example.
com');
insert into User (name, email) values('test3', 'test3@example.
com');
```
