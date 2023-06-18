

class service:
    def __init__(self):
        pass
        

    def getBookings(self,customerId):
        print('in service.py')
        # listOfSeatBooked =[]
        # d = databaseConnection()
        # cursor = d.openDbConnection()
        # getTherterQuery = "SELECT [thearerName],[areaId],[rowRange],[ColumnRange] FROM [MoviesWorld].[dbo].[Theater] where [theaterId] = "+theaterId +";"
        # getBookedTickets = "SELECT [seatBooked] FROM [MoviesWorld].[dbo].[Booking] where [theraterId] = "+theaterId +" AND [movieId]='"+ movieId  +"';"
        # cursor.execute(getTherterQuery)
        # record = cursor.fetchall()
        # row = record[0][2].split(',')
        # column =  record[0][3].split(',')
        # listOfSeats = []
        # seatDictionary = {} 
        # cursor.execute(getBookedTickets)
        # record = cursor.fetchall()
        # for i in record:
        #     i[0].split(',')
        #     listOfSeatBooked += i[0].split(',')
        # for i in range (ord(row[1])-ord(row[0])+1):
        #     for j in range(int(column[0]), int(column[1])+1):
        #         seat = chr(ord('A') + i) + '-' + str(j)
        #         listOfSeats.append(seat)
        #         if(seat in listOfSeatBooked): seatDictionary[seat] = 'B'
        #         else: seatDictionary[seat] = 'A'
        
        # outputDict = {'row': row, 'column': column ,'seats': seatDictionary}
        # return {'rows':outputDict}
        return {'response':'response from python api'}
    
    def getServices(self):
        return 'a'
    
    def createBookings(self, customerId, serviceId):
        return 'a'
        
    def cancelBookings(self, bookingId):
        return 'a'
    
    

    