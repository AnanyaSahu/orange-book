from database import databaseConnection
from flask_jwt_extended import create_access_token
import sys
sys.path.insert(0,"..")
from services import services
from transform import transform
from werkzeug.security import generate_password_hash, check_password_hash

class account:

    def __init__(self):
        pass
        

    
    def createUserAccount(self,param):
        d = databaseConnection()
        cursor = d.openDbConnection()

        if param['isFacebookUser'] == 0:
            getAccountDeatialsQuery = "SELECT [email] FROM [OrangeBook].[dbo].[User] where [isFacebookUser] = 0;"
            cursor.execute(getAccountDeatialsQuery)
            record = cursor.fetchall()
            # r= [tuple(row) for row in record]  
            for row in record:
                # print (row[0])
                if row[0] == param['email']:
                    return {'message':'Account already exist'}
            query = "INSERT INTO [OrangeBook].[dbo].[User] VALUES(?,?,?,?,?,?,?);"
            
            a =account()
        
            encryptedPassword =generate_password_hash(param['password'])
            print(encryptedPassword)
            cursor.execute(query, str(param['firstname']),  str( param['lastname']),   str(param['email']),  param['phone'],   str(param['address']), str(encryptedPassword), param['isFacebookUser'])
            recordKey = cursor.execute("SELECT @@IDENTITY AS ID;").fetchone()[0]
            cursor.commit()
            fetchquery = "SELECT * FROM [OrangeBook].[dbo].[User] WHERE [userId] =  '"+str(recordKey)+" and [isFacebookUser] = 0';"
        else:
            isFBAccountExist = 0
            getAccountDeatialsQuery = "SELECT [email] FROM [OrangeBook].[dbo].[User] where [isFacebookUser] = 1;"
            cursor.execute(getAccountDeatialsQuery)
            record = cursor.fetchall()
            print('getAccountDeatialsQuery')
            print(record)
            # r= [tuple(row) for row in record]  
            for row in record:
                print (row[0])
                if row[0] == param['email']:
                    isFBAccountExist = 1
                    # return {'message':'FB Account already exist'}
            if isFBAccountExist == 0:
                query = "INSERT INTO [OrangeBook].[dbo].[User] VALUES(?,?,?,?,?,?,?);"
                print('isFBAccountExist no create users for fb account')
                a =account()
                cursor.execute(query, str(param['firstname']),  str( param['lastname']),   str(param['email']),  0,   '', '',  param['isFacebookUser'])
                # recordKey = cursor.execute("SELECT @@IDENTITY AS ID;").fetchone()[0]
                cursor.commit()
            
            fetchquery = "SELECT * FROM [OrangeBook].[dbo].[User] WHERE [email] =  '"+str(param['email'])+"' and [isFacebookUser] = 1;"
                

        
        record = cursor.execute(fetchquery).fetchall()
        print('get user datials')
        print(record)
        r= [tuple(row) for row in record]  
        userData = transform('user',record).transformRows()
        # # d.closeDbConnection()
        return {'message':'Account has been created', 'response':userData}
    
    def verifyUserAccount(self, param):
        a =account()
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "SELECT [userId],[firstName],[lastName],[email],[contactNumber],[address],[password] FROM [OrangeBook].[dbo].[User] WHERE [email] =  '"+param['username'] +"';"
        # print(query)
        cursor.execute(query)
        record = cursor.fetchall()
        # print('record.count')
        # print(len(record))
   

        if(len(record) == 0):
            #   no account
            print('User Not Found')
            return {'message':"User Not Found" }


        if(len(record) == 1):
            databasePassword = check_password_hash( record[0][6], param['password'])
            # print(databasePassword)
            if(databasePassword == False):
                print(record[0][6])
                print('Invalid Credentials')
                return {'message':"Invalid Credentials" }
            else:
                # print('useer found')
                access_token = create_access_token(identity=param['username'])
                # print(access_token)
                r= [tuple(row) for row in record]  
                a=account()
                userData = transform('user',record).transformRows()
                return {'response':userData, 'message':'Account has been created','access_token':access_token }
        # d.closeDbConnection()


    def getBookings(self,customerId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select b.[businessId] ,b.[businessName],b.[contactNumber],b.[email],b.[address],b.[rating],b.[serviceType],b.[serviceCost],b.[location], ub.[bookingId], ub.[isCancelled] from [OrangeBook].[dbo].[UserBooking] as ub Inner Join [dbo].[Business] as b on ub.[businessId] = b.[businessId] Where [userId] = '"+str(customerId) +"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        # d.closeDbConnection()
        # r= [tuple(row) for row in record]
        s=services()
        bookedbusinessList = [] 
        a = account()
        # print(record)
        for row in record:
            transformedListItem = transform('business',[row]).transformRows()[0]
            transformedListItem['bookingId'] = row[9]
            transformedListItem['isCancelled'] = row[10]
            bookedbusinessList.append(transformedListItem)
        return {'response':bookedbusinessList}

    def getAccountDetails(self,customerId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "SELECT [userId],[firstName],[lastName],[email],[contactNumber],[address] FROM [OrangeBook].[dbo].[User] WHERE [userId] =  '"+str(customerId) +"';"
       
        cursor.execute(query)
        record = cursor.fetchall()
        r= [tuple(row) for row in record]  
        userData = transform('user',record).transformRows()
        # d.closeDbConnection() 
        return {'response':userData}
        

    def updateAccountDetails(self, customerId,param):
        d = databaseConnection()
        firstnameQuery = ""
        lastnameQuery =""
        # passwordQuery=""
        emailQuery=""
        phoneQuery=""
        addressQuery=""
        cursor = d.openDbConnection()
        query = "UPDATE [OrangeBook].[dbo].[User] "
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
        # print(newQuery)
        cursor.execute(newQuery)
        cursor.commit()
        # recordKey = cursor.execute("SELECT @@IDENTITY AS ID;").fetchone()[0]
        fetchquery = "SELECT * FROM [OrangeBook].[dbo].[User] WHERE [userId] =  '"+str(customerId)+"';"
        record = cursor.execute(fetchquery).fetchall()
        # r= [tuple(row) for row in record]  
        # a=account()
        # userData = a.transformUserRows(record)
        # d.closeDbConnection()
        # r= [tuple(row) for row in record]'response':userData,
        return { 'message': "Account Updated Successfully"}    

    def resetPassword(self, userid, param):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "SELECT [userId] FROM [OrangeBook].[dbo].[User] WHERE [email] =  '"+userid +"';"
        # print(query)
        cursor.execute(query)
        record = cursor.fetchall()
        # print('record.count')
        # print(len(record))
   
        # databasePassword = check_password_hash( record[0][6], param['password'])
        # print(record[0][6])
        if(len(record) == 0):
            #   no account
            print('User Not Found')
            return {'message':"User Not Found" }
        elif(len(record) == 1):
            encryptedPassword =generate_password_hash(param['password'])
            query = "UPDATE [OrangeBook].[dbo].[User] SET [password] = "+ encryptedPassword + "where [email]= "+userid+";"
            print(query)
            return {'message':"Password has been updated" }


    
    # def transformUserRows(self, record):
    #     # userList = []
    #     for row in record:
    #         userObj = UserObj(row[0],row[1],row[2],row[3],row[4],row[5])
    #         # print(json.dumps(businessObj.__dict__))
    #         # businessList.append(json.loads(json.dumps(businessObj.__dict__)))
    #     # print(businessList)
    #     return json.loads(json.dumps(userObj.__dict__))
# def check_password(raw_password, enc_password):
#     """
#     Returns a boolean of whether the raw_password was correct. Handles
#     encryption formats behind the scenes.
#     """
#     algo, salt, hsh = enc_password.split('$')
#     return hsh == get_hexdigest(algo, salt, raw_password)

# s =account()
# s.getBookings('100')        