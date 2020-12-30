# Bank-Transaction-and-Loan-Processing-System

************************************************************   STARTUP   ********************************************************************

To install, run (in the base folder)
1. npm init
2. npm i express
3. npm i pg
4. npm i config

If any code doesn't work in the VSCode integrated terminal (like when setting environmental variables) use the windows terminal instead.

************************************************************   DATABASE   ********************************************************************

Database used: PostgreSQL
Download PostgreSQLfrom: https://www.postgresql.org/download/windows/
GUI for PostgreSQL: https://www.postgresql.org/ftp/pgadmin/pgadmin4/v4.29/windows/

In order to access the database, you need your unique logins. This is stored in the config/default.json file which you see as 
{
    "user":"",
    
    
    "password": "",
    
    
    "port": 5432,
    
    
    "database": ""
    
}

Once you clone the repo, add the values to the above properties as they are stored in your database info (For the port, 5432 should be the default value, but if you changed that too, update that value too.

This file has been added to .gitignore, so you shouldn't have to change this info every single time you pull from origin.
