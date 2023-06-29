from database import databaseConnection


class services:
    def __init__(self):
        pass
        


    
    def getAllServices(self,param):
        locationQuery = ""
        businessQuery=""
        whereQuery = ""
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select * from [dbo].[Business]"
        if(param['location'] != "" or param['business'] !=""):
            whereQuery = " WHERE "
        if(param['location'] != '' ):
            locationQuery = " [location] = '"+param['location']+"'"
        if( param['business']  != '' ):
            businessQuery = " AND ([serviceType]='"+ param['business'] +"' OR [businessName]='"+ param['business'] +"')"
        finalQuery = query+whereQuery+locationQuery +businessQuery
        newQuery = finalQuery.replace('WHERE  AND', 'WHERE')
        print(newQuery)
       
        cursor.execute(newQuery)
        record = cursor.fetchall()
        d.closeDbConnection()
        r= [tuple(row) for row in record]
        return {'response':r}
    
    
    def getServiceByServiceId(self, serviceId):
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "Select * from [dbo].[Business] Where [serviceId]="+str(serviceId)+";"
        cursor.execute(query)
        record = cursor.fetchall()
        r= [tuple(row) for row in record]
        return {'response':r}
    
    def createBookings(self, param):
  
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "INSERT INTO [dbo].[UserBooking] VALUES(?,?,?);"
       
        cursor.execute(query, param['customerId'], param['serviceId'], 1)
        cursor.commit()
        d.closeDbConnection()
        return {'message':'Booking has been made'}
        
    def cancelBookings(self, bookingId):
       
        d = databaseConnection()
        cursor = d.openDbConnection()
        query = "UPDATE [orange-book].[dbo].[UserBooking] SET [isCancelled]= "+ str(1) + " WHERE [bookingId]= '" +str(bookingId)+"';"
       
        cursor.execute(query)
        cursor.commit()
        d.closeDbConnection()
        return {'message':'Booking has been cancelled'}
    

# s =service()
# s.getAllServices('','')

    

    