Some errors that I stumbled upon while trying to get it fixed..


# Potential Database Issues
The error message "psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL: Peer authentication failed for user "postgres"" suggests that the authentication method configured for the PostgreSQL server is set to "peer" for the user "postgres", and it's failing to authenticate.

The "peer" authentication method relies on the operating system user identity. It means that to log in as a PostgreSQL user, you must also be a system user with the same name, and you need to be running the `psql` command from that system user.

Here are a few ways to resolve this issue:

1. **Switch to the PostgreSQL System User:**
   If you're currently logged in as a different system user, switch to the PostgreSQL system user and then try to access `psql`:
   ```bash
   sudo -u postgres psql
   ```
This command will switch to the PostgreSQL system user and then launch `psql`, allowing you to connect without authentication issues.


# Steps to Take Afterwards
After switching to the PostgreSQL system user using `sudo -u postgres psql`, there might be additional steps you'd like to take, depending on your specific requirements and the state of your PostgreSQL installation. Here are some common additional steps you might consider:

1. **Set a Password for the PostgreSQL User:**
	By default, the PostgreSQL user `postgres` doesn't have a password set. You might want to set a password for this user to enhance security. You can set a password using the following SQL command while logged in as the `postgres` user:
   ```sql
   ALTER USER postgres PASSWORD 'new_password';
   ```

2. **Create Additional PostgreSQL Users and Databases:**
	If you're setting up a new PostgreSQL environment, you might want to create additional users and databases for your applications. You can create new users with the `CREATE ROLE` command and databases with the `CREATE DATABASE` command. For example:
```sql
CREATE ROLE my_user WITH LOGIN PASSWORD 'my_password';
CREATE DATABASE my_database OWNER my_user;
```
Client setup:
```javascript
const client = new pg.Pool({
  user: 'your_username', // Use the correct username
  password: 'your_password', // Use the correct password
  port: 5432,
  database: 'capstone_db',
  host: 'localhost',
});
```

These are just some examples of additional steps you might consider after switching to the PostgreSQL system user. The specific actions you take will depend on your application's requirements and your organization's best practices.

# Test Database Output
To view the contents of a database in PostgreSQL, you typically use SQL queries to select data from tables within that database. Here are the basic steps:
	
1. **Connect to the Database:**
   Use the psql command-line interface or a graphical client like pgAdmin to connect to your PostgreSQL database. For example:
   ```bash
   psql -U username -d database_name
   ```
   Replace `username` with your PostgreSQL username and `database_name` with the name of the database you want to connect to.
	
2. **List Tables:**
   You can list all tables in the database by using the `\dt` command in psql:
   ```
   \dt
   ```
   This command will display a list of all tables in the currently connected database.
	
3. **View Table Contents:**
   To view the contents of a specific table, you can use a SELECT query. For example, to view all rows in a table named `my_table`:
   ```sql
   SELECT * FROM my_table;
   ```
   Replace `my_table` with the name of the table you want to view.
	
4. **Filter and Sort Data:**
   You can also use WHERE clauses to filter data and ORDER BY clauses to sort data in your SELECT queries. For example:
   ```sql
   SELECT * FROM my_table WHERE column_name = 'value' ORDER BY column_name;
   ```
	
5. **Perform Joins (if needed):**
   If your database schema involves multiple tables, you may need to perform JOIN operations to combine data from different tables. For example:
   ```sql
   SELECT t1.column1, t2.column2
   FROM table1 t1
   JOIN table2 t2 ON t1.id = t2.table1_id;
   ```
	
6. **Exit psql:**
   Once you're done viewing the contents of the database, you can exit psql by typing:
   ```
   \q
   ```
	
By following these steps and executing appropriate SELECT queries, you can view the contents of your PostgreSQL database.
