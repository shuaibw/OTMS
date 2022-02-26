# ▁ ▂ ▄ ▅ ▆ ▇ █ Sphuron █ ▇ ▆ ▅ ▄ ▂ ▁
___
## _An Online Tutor Management System_
##### CSE216 Project for L2/T2 of CSE, BUET
___
Project members:
 - [Anwarul Bashir Shuaib - 1805010](https://github.com/shuaibw/)
 - [Kazi Rakibul Hasan - 1805011](https://github.com/UserSudoName/)
 
Sphuron is an online platform for finding your tutor on STEM subjects.

- Choose your desired subject
- Pick your tutor
- ✨Learn and grow together ✨      

## Demo
A video demo can be found [here](https://drive.google.com/file/d/1q71UoBh5sMf1lcr7WJ2DsyUjSZ4pTwPh/view).

## Tech

Sphuron uses a number of open source projects to work properly.

Backend:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [oracledb] - A Node.js module for Oracle Database access

Frontend
- [HTML]
- [Bootstrap](https://getbootstrap.com/)
- [jQuery]
- [ejs]

## Installation

First install [Node.js](https://nodejs.org/) and [Oracle](https://www.oracle.com/id/database/technologies/oracle-database-software-downloads.html#19c). Be sure to add `node` to your system path.

Create a new user for oracle. Open command prompt, and type the following:
```sh
sqlplus /nolog
connect / as sysdba
create user c##shuaib identified by [password]
```
In line 3, you don't have to put the `[]` in your command prompt when entering the password. You can opt for a different username like `c##anothername`, but the sql dump (located in `db_dump/C##SHUAIB.sql`) has been hard coded to `c##shuaib`. If you are using a different username, be sure to change all the `c##shuaib` from the sql dump to your provided username.

If you have git installed on your computer, clone this project from the terminal, or you can simply download it as `.zip`.
```sh
git clone https://github.com/shuaibw/OTMS/
cd OTMS
```

Configure `.env` variables. If you are using `c##shuaib` as your username, just edit the password here you entered before.
```sh
SESSION_SECRET = "SUPERSECRETKEYNONEWOULDEVERGUESS"
DB_USER = "C##SHUAIB"
DB_PASSWORD = "hr"
DB_CONNSTR = "localhost/orcl"
```
Reconstruct database from `db_dump/C##SHUAIB.sql`. You can do this from any IDE of your choice. I used [Navicat](https://www.navicat.com/en/). You might have to comment out the `DROP TABLE` statements from `C##SHUAIB.sql` for this to work without erros. If you are really having trouble then just skip this dump, and manually run each of the sql files from `sql_queries/` folder.

Install the dependencies and start the server.

```sh
npm i
npm start
```
Go to `localhost:3000/login`. Here you can either create a new account, or login with the following credentials:
```sh
As student
username: shuaib
password: shuaib

As instructor:
username: crick
password: crick
```

For additional information, please refer to our [demo](https://drive.google.com/file/d/1q71UoBh5sMf1lcr7WJ2DsyUjSZ4pTwPh/view).

Kudos to Kazi Rakibul Hasan for his awesome video editing 🎉

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [oracledb]: <https://www.npmjs.com/package/oracledb>
   [ejs]: <https://ejs.co/>
   [HTML]: <https://html.com/>
   [node.js]: <http://nodejs.org>
   [CSS]: <https://developer.mozilla.org/en-US/docs/Web/CSS>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [NodeJS]: <https://nodejs.org/en/>
