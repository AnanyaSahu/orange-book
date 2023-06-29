from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity
)
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

# limiter = Limiter(
#     app,
#     key_func=get_remote_address,
#     default_limits=["1000 per day", "100 per hour"]
# )

# Dummy user database for authentication example
users = [
    {'username': 'admin', 'password': generate_password_hash('admin')}
]

# Authentication endpoint
@app.route('/login', methods=['GET'])
def login():
    # if not request.is_json:
    #     return jsonify({'message': 'Missing JSON in request'}), 400

    username = users[0]['username']
    password = users[0]['password']

    user = next((user for user in users if user['username'] == username), None)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200

# Protected endpoint
@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hello, {current_user}! This is a protected endpoint.'}), 200

# Error handler for JWT authentication failures
@jwt.unauthorized_loader
def unauthorized_loader_callback(error):
    return jsonify({'message': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run()