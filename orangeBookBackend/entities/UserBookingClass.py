from database import databaseConnection


class UserBookingObj:
   
   def __init__(self, bookingId, businessId, businessName, userId, firstName, lastName, email, contactNumber, password, address, serviceCost,location):
    self.bookingId = bookingId
    self.businessId =businessId
    self.businessName =businessName
    self.userId = userId
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    self.contactNumber = contactNumber
    self.password = password
    self.address = address

            

           
    

    