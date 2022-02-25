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

Dillinger uses a number of open source projects to work properly.

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

Sphuron requires [Node.js](https://nodejs.org/) v13+ to run.

Configure `.env` variables
```sh
SESSION_SECRET = "SUPERSECRETKEYNONEWOULDEVERGUESS"
DB_USER = "C##SHUAIB"
DB_PASSWORD = "hr"
DB_CONNSTR = "localhost/orcl"
```
Reconstruct database from `db_dump/C##SHUAIB.sql`

Install the dependencies and start the server.

```sh
cd OTMS
npm i
npm start
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [oracledb]: <https://www.npmjs.com/package/oracledb>
   [ejs]: <https://ejs.co/>
   [HTML]: <https://html.com/>
   [node.js]: <http://nodejs.org>
   [CSS]: <https://developer.mozilla.org/en-US/docs/Web/CSS>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [NodeJS]: <https://nodejs.org/en/>
