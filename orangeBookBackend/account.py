from database import databaseConnection
import hashlib


class account:

    
    def __init__(self):
        pass
        

    
    def createUserAccount(self,param):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "INSERT INTO [orange-book].[dbo].[User] VALUES(?,?,?,?,?,?);"
        cursor.execute(query, param['firstname'],  param['lastname'],  param['email'],  param['phone'],  param['address'], param['password'])
        recordKey = cursor.execute("SELECT @@IDENTITY AS ID;").fetchone()[0]
        cursor.commit()
        fetchquery = "SELECT * FROM [orange-book].[dbo].[User] WHERE [userId] =  '"+str(recordKey)+"';"
        record = cursor.execute(fetchquery).fetchall()
        r= [tuple(row) for row in record]  
        # # d.closeDbConnection()
        return {'message':'Account has been created', 'response':r}
    
    def verifyUserAccount(self, param):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "SELECT * FROM [orange-book].[dbo].[User] WHERE [email] =  '"+param['username'] +"' AND  [password] = '"+param['password']+"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        print('record.count')
        print(len(record))
        if(len(record) != 1):
            #   no account
            return {'message':"Invalid Credentials" }
        else:
            r= [tuple(row) for row in record]  
            return {'response':r}
        # d.closeDbConnection()
    
    def getHashValue(self, value):
  
        secret = "5gzgatevdfyslryfdtssksxdgaesrtw34szdea4dsg"
 
       
        newPasswordValue = value+secret
     
        return hashlib.md5(newPasswordValue.encode())
        

        # print(hashed.hexdigest())   


    def getBookings(self,customerId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select * from [orange-book].[dbo].[UserBooking] as ub Inner Join [dbo].[Business] as b on ub.[businessId] = b.[businessId] Where [userId] = '"+str(customerId) +"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        # d.closeDbConnection()
        r= [tuple(row) for row in record]
        return {'response':r}

    def getAccountDetails(self,customerId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "SELECT * FROM [orange-book].[dbo].[User] WHERE [userId] =  '"+str(customerId) +"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        r= [tuple(row) for row in record]  
        # d.closeDbConnection() 
        return {'response':r}
        

    def updateAccountDetails(self, customerId,param):
        d = databaseConnection()
        firstnameQuery = ""
        lastnameQuery =""
        # passwordQuery=""
        emailQuery=""
        phoneQuery=""
        addressQuery=""
        cursor = d.openDbConnection()
        query = "UPDATE [orange-book].[dbo].[User] "
        setQuery = "SET "
        if(param['firstname'] != ''):
            firstnameQuery  = "[firstName] = '"+param['firstname']+ "' "
        if(param['lastname'] != ''):
            lastnameQuery  = " , [lastName] = '"+param['lastname']+ "' "

        # if(param['password'] != ''):
        #     passwordQuery  = "AND [password] = '"+param['password']+ "' "

        if(param['email'] != ''):
            emailQuery  = ", [email] = '"+param['email']+ "' "

        if(param['phone'] != ''):
            phoneQuery  = ", [contactNumber] = "+str(param['phone'])+ " "

        if(param['address'] != ''):
            addressQuery  = ", [address] = '"+param['address']+ "' "


        whereQuery =  " WHERE [userId] =  '"+str(customerId) +"';"
       
        finalQuery = query+setQuery+firstnameQuery+lastnameQuery+emailQuery+phoneQuery+addressQuery+whereQuery
        newQuery= finalQuery.replace('SET AND', 'SET')
        print(newQuery)
        cursor.execute(newQuery)
        record = cursor.fetchall()
        # d.closeDbConnection()
        r= [tuple(row) for row in record]
        return {'response':r}    

# s =account()
# s.updateAccountDetails('100', 'ana', 'sahu','aerfasetjASdhaetrjhsadfh','a@example.com','123456765678','25 wolfe')        