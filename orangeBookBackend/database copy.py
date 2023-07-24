import pyodbc

global dbConnection
global cursor



dbConnection = connection = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
            'Server=sqlpython.centralindia.cloudapp.azure.com;'
            'Database=master;'
            'encrypt=yes;'
            'TrustServerCertificate=yes;'
            'UID=sa;'
            'PWD=Sqlserver@123',autocommit = True)
connection.close()

dbConnection=connection = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
            'Server=sqlpython.centralindia.cloudapp.azure.com;'
            'Database=FlashMessages;'
            'encrypt=yes;'
            'TrustServerCertificate=yes;'
            'UID=sa;'
            'PWD=Sqlserver@123',autocommit = True)
print('data base')
