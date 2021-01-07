#from app import create_app
from flask_pymongo import PyMongo 
import os
import urllib.parse


class Config:
	
	SECRET_KEY = 'pixelmarco'


class DevelopmentConfig(Config):
	
	DEBUG = True
	MAIL_SERVER = "smtp.gmail.com"
	MAIL_PORT = 465
	MAIL_PORT = 587
	MAIL_USE_TLS = True
	MAIL_USERNAME = "ciidetec.robot@gmail.com"
	MAIL_PASSWORD= "metallica_1_h94"


	UPLOAD_FORLDER = '/files/'


	
config = {
	
		  'development':DevelopmentConfig,
		  'default':DevelopmentConfig,

	}