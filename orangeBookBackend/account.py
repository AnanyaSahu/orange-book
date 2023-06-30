from database import databaseConnection
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import sys
sys.path.insert(0,"..")
from orangeBookBackend.entities.UserClass import UserObj
from orangeBookBackend.entities.BusinessClass import BusinessObj
from services import services
import json
from transform import transform

class account:

    
    def __init__(self):
        pass
        

    
    def createUserAccount(self,param):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "INSERT INTO [orange-book].[dbo].[User] VALUES(?,?,?,?,?,?);"
        cursor.execute(query, str(param['firstname']),  str( param['lastname']),   str(param['email']),  param['phone'],   str(param['address']), str( param['password']))
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
        query = "SELECT [userId],[firstName],[lastName],[email],[contactNumber],[address] FROM [orange-book].[dbo].[User] WHERE [email] =  '"+param['username'] +"' AND  [password] = '"+param['password']+"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        print('record.count')
        print(len(record))
        if(len(record) != 1):
            #   no account
            print('Invalid Credentials')
            return {'message':"Invalid Credentials" }
        else:
            access_token = create_access_token(identity=param['username'])
            print(access_token)
            r= [tuple(row) for row in record]  
            a=account()
            # userData = a.transformUserRows(record)
            userData = transform('user',record).transformRows()
            return {'response':userData, 'message':'Account has been created','access_token':access_token }
        # d.closeDbConnection()


    def getBookings(self,customerId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select b.[businessId] ,b.[businessName],b.[contactNumber],b.[email],b.[address],b.[rating],b.[serviceType],b.[serviceCost],b.[location], ub.[bookingId], ub.[isCancelled] from [orange-book].[dbo].[UserBooking] as ub Inner Join [dbo].[Business] as b on ub.[businessId] = b.[businessId] Where [userId] = '"+str(customerId) +"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        # d.closeDbConnection()
        # r= [tuple(row) for row in record]
        s=services()
        bookedbusinessList = [] 
        a = account()
        # print(record)
        for row in record:
            # do 
            # print(row)
            # transformedListItem = s.transformBusinessRows([row])[0]
            transformedListItem = transform('business',[row]).transformRows()[0]
            transformedListItem['bookingId'] = row[9]
            transformedListItem['isCancelled'] = row[10]
            bookedbusinessList.append(transformedListItem)
        return {'response':bookedbusinessList}

    def getAccountDetails(self,customerId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "SELECT [userId],[firstName],[lastName],[email],[contactNumber],[address] FROM [orange-book].[dbo].[User] WHERE [userId] =  '"+str(customerId) +"';"
       
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
        cursor.commit()
        # recordKey = cursor.execute("SELECT @@IDENTITY AS ID;").fetchone()[0]
        fetchquery = "SELECT * FROM [orange-book].[dbo].[User] WHERE [userId] =  '"+str(customerId)+"';"
        record = cursor.execute(fetchquery).fetchall()
        # r= [tuple(row) for row in record]  
        # a=account()
        # userData = a.transformUserRows(record)
        # d.closeDbConnection()
        # r= [tuple(row) for row in record]'response':userData,
        return { 'message': "Account Updated Successfully"}    
    
    # def transformUserRows(self, record):
    #     # userList = []
    #     for row in record:
    #         userObj = UserObj(row[0],row[1],row[2],row[3],row[4],row[5])
    #         # print(json.dumps(businessObj.__dict__))
    #         # businessList.append(json.loads(json.dumps(businessObj.__dict__)))
    #     # print(businessList)
    #     return json.loads(json.dumps(userObj.__dict__))


# s =account()
# s.getBookings('100')        