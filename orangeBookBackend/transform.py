import sys
sys.path.insert(0,"..")
from orangeBookBackend.entities.BusinessClass import BusinessObj
from orangeBookBackend.entities.UserClass import UserObj
from orangeBookBackend.entities.UserBookingClass import UserBookingObj
import json

class   transform:
    def __init__(self, transformTpye, record):
         self.transformTpye =transformTpye
         self.record = record

    def transformRows(self):
     if self.transformTpye == 'user':
            return self.transformUserRows(self.record)
     elif self.transformTpye == 'business':
            return self.transformBusinessRows(self.record)
     elif self.transformTpye == 'booking':
            return self.transformBookingRows(self.record)   
        
    def transformBusinessRows(self, record):
        businessList = []
        for row in record:
            businessObj = BusinessObj(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8])
            businessList.append(json.loads(json.dumps(businessObj.__dict__)))
        return businessList
    

    def transformUserRows(self, record):
        # userList = []
        for row in record:
            userObj = UserObj(row[0],row[1],row[2],row[3],row[4],row[5],row[6])
        print(json.loads(json.dumps(userObj.__dict__)))
        return json.loads(json.dumps(userObj.__dict__))
    
    def transformBookingRows(self, record):
        bookingList = []
        for row in record:
            userBookingObj = UserBookingObj(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8], row[9],row[10])
            bookingList.append(json.loads(json.dumps(userBookingObj.__dict__)))
        return bookingList