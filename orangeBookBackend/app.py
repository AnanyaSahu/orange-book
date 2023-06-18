
# # from flask_mysqldb import MySQL
from flask_cors import CORS
# from flask import Flask, render_template, request

from services import service
from account import account
from flask import Flask
from flask import Flask, render_template, request

# # mysql = MySQL()
app = Flask(__name__)
CORS(app)
# # mysql.init_app(app)


# if __name__ == "__main__":
#  app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))

# This method will list all the services
@app.route('/getServices/', methods=['GET'])
def  getServices():
    s = service()
    return s.getServices()

# This method will get the bookings. for the user, input is customer id
@app.route('/getBookings/<int:customerId>', methods=['GET'])
def  getBookings(customerId):
    s = service()
    return s.getBookings(customerId)


# This method will create the bookings. for the user, input is customer id and serviceId
@app.route('/createBookings/<int:customerId>/<int:serviceId>', methods=['POST'])
def  createBookings(customerId, serviceId):
    s = service()
    return s.createBookings(customerId, serviceId)

# This method will cancel the bookings. for the user, input is booking id
@app.route('/cancelBookings/<int:bookingId>', methods=['PUT'])
def  cancelBookings(bookingId):
    s = service()
    return s.cancelBookings(bookingId)

# This method will create the user account, input is firstname, lastname, username, password, email, phone, address
@app.route('/createAccount/<int:firstname>/<string:lastname>/<string:username>/<string:password>/<string:email>/<string:phone>/<string:address>', methods=['POST'])
def  createUserAccount(firstname, lastname, username, password, email, phone, address):
    a = account()
    return a.createUserAccount(firstname, lastname, username, password, email, phone, address)

# This method will verify the user account, input is username, password
@app.route('/verifyAccount/<int:username>/<int:password>', methods=['POST'])
def  verifyUserAccount(username, password):
    a = account()
    return a.verifyUserAccount(username, password)

 
@app.route("/",  methods=['GET'])
def root():
    return render_template('index.html')
    

if __name__=="__main__":
    app.run()