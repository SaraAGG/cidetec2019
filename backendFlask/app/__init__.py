from flask import Flask
#from flask_bootstrap import Bootstrap
#from flask_wtf.csrf import CSRFProtect

from flask_pymongo import PyMongo 
from flask_login import LoginManager
from flask_bcrypt import Bcrypt 
from flask_mail import Mail

import urllib.parse
from flask_cors import CORS
from flask import Flask, jsonify, request

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)

#boostrap = Bootstrap()
# csrf = CSRFProtect()
login_manager = LoginManager()
bcrypt = Bcrypt()



app.config['JWT_TOKEN_LOCATION'] = ['headers']
#app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)

#@jwt.expired_token_loader
#def my_expired_token_callback(expired_token):
#    token_type = expired_token['type']
#    return jsonify({
#        'status': 401,
#        'sub_status': 42,
#        'msg': 'The {} token has expired'.format(token_type)
#    }), 401


app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
username = urllib.parse.quote_plus('marco')
password = urllib.parse.quote_plus('metallica1')

app.config['MONGO_URI'] = 'mongodb+srv://%s:%s@uas-6xetc.mongodb.net/test?retryWrites=true&ssl_ca_certs=/etc/ssl/cert.pem' %(username, password)
app.config['CORS_HEADERS'] = 'Content-Type'

mongo = PyMongo(app)
mail = Mail()
CORS(app)


from app.views import page

def create_app(config):

	app.config.from_object(config)
	login_manager.init_app(app)
	bcrypt.init_app(app)
	mail.init_app(app)

	app.register_blueprint(page)

	return app
