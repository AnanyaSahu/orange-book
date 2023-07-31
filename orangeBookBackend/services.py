from database import databaseConnection
# from orangeBookBackendBusinessClass import BusinessObj
import sys
sys.path.insert(0,"..")
from orangeBookBackend.entities.BusinessClass import BusinessObj
from transform import transform
import json


class services:
    def __init__(self):
        pass
        


    
    def getAllServices(self,business, location):
        s =services()
        locationQuery = ""
        businessQuery=""
        whereQuery = ""
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select [businessId],[businessName],[contactNumber] ,[email],[address],[location],[rating] ,[serviceType],[serviceCost] from [dbo].[Business]"
        if(location != "all" or business !="all"):
            whereQuery = " WHERE "
        if(location != 'all' ):
            locationQuery = " [location] = '"+location+"'"
        if( business  != 'all' ):
            businessQuery = " AND ([serviceType] LIKE '"+business +"%' OR [businessName] LIKE '"+ business +"%')"
        finalQuery = query+whereQuery+locationQuery +businessQuery
        newQuery = finalQuery.replace('WHERE  AND', 'WHERE')
        
       
        cursor.execute(newQuery)
        record = cursor.fetchall()
        # d.closeDbConnection()
        businessList = transform('business',record).transformRows()
        

        return {'response':businessList}
    
    
    def getServiceByServiceId(self, serviceId):
        d = databaseConnection()
        msg = ''
        cursor = d.openDbConnection()
        query = "Select * from [dbo].[Business] Where [businessId]="+str(serviceId)+";"
        cursor.execute(query)
        record = cursor.fetchall()
        businessList = transform('business',record).transformRows()
        if(len(businessList)==0):
            msg='No Matching Business'

        return {'response':businessList, 'message':msg}
    
    def createBookings(self, param):
  
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "INSERT INTO [dbo].[UserBooking] VALUES(?,?,?);"
       
        cursor.execute(query, str( param['customerId']),  str(param['serviceId']), 0)
        cursor.commit()
        # d.closeDbConnection()
        return {'message':'Booking has been made'}
        
    def cancelBookings(self, bookingId):
       
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "UPDATE [OrangeBook].[dbo].[UserBooking] SET [isCancelled]= "+ str(1) + " WHERE [bookingId]= '" +str(bookingId)+"';"
       
        cursor.execute(query)
        cursor.commit()
        # d.closeDbConnection()
        return {'message':'Booking has been cancelled'}
    
    def getLocations(self):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select distinct([location]) from [OrangeBook].[dbo].[Business];"
        cursor.execute(query)
        record = cursor.fetchall()
        r= [tuple(row) for row in record]
        query = "Select distinct([location]) from [OrangeBook].[dbo].[Business];"
        return {'response':r}
    
    # def transformBusinessRows(self, record):
    #     businessList = []
    #     for row in record:
    #         businessObj = BusinessObj(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8])
    #         # print(json.dumps(businessObj.__dict__))
    #         businessList.append(json.loads(json.dumps(businessObj.__dict__)))
    #     # print(businessList)
    #     return businessList
           

# s =services()
# s.getAllServices('all','all')


    

    