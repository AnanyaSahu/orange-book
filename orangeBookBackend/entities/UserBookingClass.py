from database import databaseConnection


class UserBookingObj:
   # [businessId] ,b.[businessName],b.[contactNumber],b.[email],b.[address],b.[rating],b.[serviceType],b.[serviceCost],b.[location], ub.[bookingId], ub.[isCancelled]
   # [businessId] ,b.[businessName],b.[contactNumber],b.[email],b.[address],b.[rating],b.[serviceType],b.[serviceCost],b.[location], ub.[bookingId], ub.[isCancelled] 
   def __init__(self,  businessId, businessName,contactNumber,email, address, ratings, serviceType ,serviceCost,   location, bookingId, isCancelled):
    self.bookingId = bookingId
    self.businessId =businessId
    self.businessName =businessName
    self.location = location
    self.serviceType = serviceType
    self.serviceCost = serviceCost
    self.email = email
    self.contactNumber = contactNumber
    self.ratings = ratings
    self.address = address
    self.isCancelled =isCancelled

            

           
    

    