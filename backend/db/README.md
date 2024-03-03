# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## Potential Database Issues
The error message "psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL: Peer authentication failed for user "postgres"" suggests that the authentication method configured for the PostgreSQL server is set to "peer" for the user "postgres", and it's failing to authenticate.

The "peer" authentication method relies on the operating system user identity. It means that to log in as a PostgreSQL user, you must also be a system user with the same name, and you need to be running the `psql` command from that system user.

Here are a few ways to resolve this issue:

1. **Switch to the PostgreSQL System User:**
   If you're currently logged in as a different system user, switch to the PostgreSQL system user and then try to access `psql`:
   ```bash
   sudo -u postgres psql
   ```
   This command will switch to the PostgreSQL system user and then launch `psql`, allowing you to connect without authentication issues.


## Steps to Take Afterwards
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
