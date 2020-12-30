# Bank-Transaction-and-Loan-Processing-System
INSTALLING

To install, run (in the base folder)

1. npm init
2. npm i express
3. npm i pg
4. npm i config

If any code doesn't work in the VSCode integrated terminal (like when setting environmental variables) use the windows terminal instead.

DATABASE INFORMATION

Database used: PostgreSQL

Download PostgreSQLfrom: https://www.postgresql.org/download/windows/

GUI for PostgreSQL: https://www.postgresql.org/ftp/pgadmin/pgadmin4/v4.29/windows/

==================================IMPORTANT===============================

In order to access the database, you need your unique logins. This is stored in the config/default.json file which you see as 
{

    "user":"",
    "password": "",
    "port": 5432,
    "database": ""
    
}

Once you clone the repo, add the values to the above properties as they are stored in your database info (For the port, 5432 should be the default value, but if you changed that too, update that value too.

===============DON'T COMMIT THIS FILE WHEN YOU PUBLISH CHANGES============

As soon as you clone the repo, run these commands
git rm --cached config/default.json
git update-index --skip-worktree config/default.json
git update-index --assume-unchanged config/default.json

Then change like a letter in the config/default.json file just to check its not tracked. If its still tracked, you probably screwed up somewhere, check again. :)
