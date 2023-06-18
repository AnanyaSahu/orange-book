from marshmallow import Schema, fields
from sqlalchemy import Column, String, Integer
# from .entity import Entity, Base


class Booking():
    __tablename__ = 'booking'
    bookingId = Column(Integer)
    businessId = Column(Integer)
    customerId = Column(Integer)
    bookingStatus = Column(String)


    def __init__(self, bookingId, businessId ,customerId, bookingStatus ):
        # Entity.__init__(self, created_by)
        self.bookingId = bookingId
        self.businessId = businessId
        self.customerId = customerId
        self.bookingStatus = bookingStatus

class BookingSchema(Schema):
    bookingId = fields.Number()
    businessId = fields.Number()
    customerId = fields.Number()
    bookingStatus = fields.Str()