
# # from flask_mysqldb import MySQL
from flask_cors import CORS
# from flask import Flask, render_template, request

from services import services
from account import account
from flask import Flask
from flask import Flask, render_template, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

# # mysql = MySQL()

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'DtlCdt8PfPmkBpUOLve2PZYcXKqLI-3tAaH3FvFOccQ'
jwt = JWTManager(app)
# # mysql.init_app(app)


# if __name__ == "__main__":
#  app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))

# This method will list all the services
@app.route('/getServices/<string:business>/<string:location>', methods=['GET'])
def  getServices(business,location):
    print('getServices method app.py')
    s = services()
    return s.getAllServices(business, location)

@app.route('/getService/<int:serviceId>', methods=['GET'])
def  getServiceByServiceId(serviceId):
    s = services()
    return s.getServiceByServiceId(serviceId)

@app.route('/getLocations', methods=['GET'])
# @jwt_required()
def  getLocations():
    s = services()
    return s.getLocations()

# This method will create the bookings. for the user, input is customer id and serviceId
@app.route('/createBookings', methods=['POST'])
@jwt_required()
def  createBookings():
    s = services()
    print(request.json)
    return s.createBookings(request.json)

# This method will cancel the bookings. for the user, input is booking id
@app.route('/cancelBookings/<int:bookingId>', methods=['PUT'])
@jwt_required()
def  cancelBookings(bookingId):
    s = services()
    return s.cancelBookings(bookingId)

# This method will get the bookings. for the user, input is customer id
@app.route('/getBookings/<int:userId>', methods=['GET'])
@jwt_required()
def  getBookings(userId):
    a = account()
    return a.getBookings(userId)

# This method will create the user account, input is firstname, lastname, username, password, email, phone, address
@app.route('/createAccount', methods=['POST'])
def  createUserAccount():
    print('createUserAccount in python')
    print(request.json)
    a = account()
    return a.createUserAccount(request.json)

# This method will verify the user account, input is username, password
@app.route('/verifyAccount', methods=['POST'])
def  verifyUserAccount():
    print(request.json)
    a = account()
    return a.verifyUserAccount(request.json)

# This method will update the user account, input is firstname, lastname, username, password, email, phone, address
@app.route('/updateAccount/<int:userId>', methods=['PUT'])
@jwt_required()
def  updateUserAccount(userId):
    print(request.json)
    a = account()
    return a.updateAccountDetails(userId, request.json)

# This method will get the account details. for the user, input is customer id
@app.route('/getAccountDetails/<int:userId>', methods=['GET'])
@jwt_required()
def  getAccountDetails(userId):
    a = account()
    return a.getAccountDetails(userId)
 
 
# This method will get the account details. for the user, and reset user password
@app.route('/resetPassword/<string:userId>', methods=['PUT'])
def  resetPassword(userId):
    print(request.json)
    a = account()
    return a.resetPassword(userId, request.json)

@app.route("/",  methods=['GET'])
def root():
    return render_template('index.html')
    

if __name__=="__main__":
    # app.run()
    app.run(host='0.0.0.0',port='8080', ssl_context=('../cert.pem', '../privkey.pem'))