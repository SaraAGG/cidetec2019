import csv
from flask import Blueprint
from flask import render_template, request, flash, session, redirect,url_for
from flask import request, jsonify
from functools import wraps

from flask_mail import Message

import requests as req

import pprint
from . import mongo
from . import bcrypt
from datetime import datetime, date
from collections import defaultdict


#from flask import jsonify
from bson.json_util import loads, dumps
import re

from pymongo import ReturnDocument
#from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp

from flask_cors import CORS, cross_origin
#import jwt
import os

import pprint

from flask_login import login_required, login_user

from . import login_manager
from . import mail
from .model import User


import base64

import bson
from bson.objectid import ObjectId

from flask import current_app

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

from flask_cors import CORS, cross_origin

from flask import jsonify

page = Blueprint('page', __name__)

key = 'secret'


"""
Improve login
"""
@page.route('/login', methods=['POST','GET'])
def login():
  #prueba = request.get_json()
  #return jsonify(data = prueba["username"])
  auth_user = {}

  user = mongo.db.users.find_one({
    "username":request.json.get('username'),
    })
  user_to_auth = None
  password = None
  if user is not None:
    for users in user:
      user_to_auth  = user['username']
      password = user['password']
  else:
    return "objecto es None"

  if bcrypt.check_password_hash(password, request.json.get('password')):
    access_token = create_access_token(identity=user_to_auth)

    return dumps({"jwt":access_token,"username":user_to_auth }), 200
  else:
    return "False"
    return dumps({"user":user_to_auth})

@page.route('/register', methods =['POST'])
def register():

  user = mongo.db.users.insert_one({
    "username": request.json.get("username"),
    "password":bcrypt.generate_password_hash(request.json.get("password")),
    "email": request.json.get("email"),
    "first_name": request.json.get("first_name"),
    "last_name": request.json.get("last_name"),
    "gender": request.json.get("gender"),
    "age": request.json.get("age"),
    "occupation": request.json.get("occupation"),
    "birthday": request.json.get ("birthday")
    })

  doc = user.inserted_id

  return dumps({"docs":doc}),200

@page.route('/register_product/', methods=['GET','POST'])
@jwt_required
def register_product():
  """
  0 equivale a nuevo producto,
  1 a producto conocido
  """
  document = mongo.db.product.insert_one({
    "username":get_jwt_identity(),
    "product":[{
            "product_name":request.json.get("product_name"),
            "product_type":request.json.get("product_type"),
            "number_surveys":request.json.get("number_surveys")
      }]

    })
  docs = document.inserted_id

  return dumps({"docs":docs}), 200

@page.route('/projects/', methods=['GET'])
@jwt_required
def get_projects():

  dict_=defaultdict(list)
  for element in mongo.db.product.find({"username":get_jwt_identity()}):
    for i,j in element['product'][0].items():
     if(i=='product_name'):
      print(i,j)
      dict_[i].append(j)

  return dumps({"docs":dict_}),200

@page.route('/emphatize/interview/<product>', methods=['POST'])
@jwt_required
def interview(product):

  document = mongo.db.product.find_one_and_update({
    "username":get_jwt_identity(),
    "product.product_name":product},
    {"$push":{"product":{"emphatize":[{"interview":[{
              "market":request.json.get("market"),
              "gender":request.json.get("gender"),
              "age_range_start":request.json.get("age_range_start"),
              "age_range_end":request.json.get("age_range_end"),
              "description":request.json.get("description")
            }]
          }]
        }
      }
    }
  )
  return dumps({"docs":document}), 200

@page.route('/emphatize/derivation/<product>', methods=['POST'])
@jwt_required
def derivation(product):

  document = mongo.db.product.find_one_and_update({
    "username":get_jwt_identity(),
    "product.product_name":product},
    {"$addToSet":{"product.1.emphatize":{
        "derivation":{
            "attributes":request.json.get("attributes")
            }
          }
        }
      }
    )
  print("soy document ", document)
    
  return dumps({"docs":document}),200

@page.route('/emphatize/classification/<product>', methods=['POST'])
@jwt_required
def classification(product):

  document = mongo.db.product.find_one_and_update({
    "username":get_jwt_identity(),
    "product.product_name":product},
    {"$addToSet":{"product.1.emphatize":
        {"classification":{
            "final_attributes":request.json.get("final_attributes")
          }
        }
      }
    }
  )   
  print("soy document", document)
  return dumps({"docs":document}),200

@page.route('/emphatize/update/classification<product>', methods=['POST'])
@jwt_required
def update_classification(product):

  document = mongo.db.product.find_one_and_update({
    "username":get_jwt_identity(),
    "product.product_name":product},
    {"$addToSet":{"product.1.emphatize":{"classification":{
      "final_attributes":request.json.get("final_attributes")
          }
        }
      }
    }  
  )
  print(document)
  return dumps({"docs":document}),200

@page.route('/emphatize/final_attributes/<product>', methods=['POST'])
@jwt_required
def final_attributes(product):

  document = mongo.db.product.find_one_and_update({
    "username":get_jwt_identity(),
    "product.product_name":product},
    {"$addToSet":{"product.1.emphatize":
        {"final":{
          "final_attributes":request.json.get("final_attributes")
            }   
          }
        }
      }
    )
  return dumps({"docs":document}),200
  

###################################
##                               ##
##  FUNCIONES GET PARA CHECAR    ##
##    EL ESTADO DE LA FASE       ##
##        { EMPHATIZE }          ##
##               user            ##
###################################


@page.route('/emphatize/check/interview/<product>', methods=['GET'])
@jwt_required
def interview_check(product):

  document = mongo.db.product.find_one({
    "username":get_jwt_identity(),
    "product.product_name":product,
    })
  docs = {}
  this = {}
  other = {}
  try:
    for k,v in document['product'][1].items():
      docs = k,v
      this[k] = v
      for element in this['emphatize']:
        for i,j in element.items():
          if(i=='interview'):
            other[i]=j
  except:
    pass

  return dumps({"docs":other}),200


@page.route('/emphatize/check/derivation/<product>', methods=['GET'])
@jwt_required
def derivation_check(product):

  document = mongo.db.product.find_one({
    "username":get_jwt_identity(),
    "product.product_name":product})
  docs = {}
  this = {}
  other = {}
  try:
    for k,v in document['product'][1].items():
        docs = k,v
        this[k] = v
        for element in this['emphatize']:
          for i,j in element.items():
            if(i=='derivation'):
              other[i]=j
  except:
    pass
  return dumps({"docs":other}), 200

@page.route('/emphatize/check/classification/<product>', methods=['GET'])
@jwt_required
def classification_check(product):

  document = mongo.db.product.find_one({
    "username":get_jwt_identity(),
    "product.product_name":product})

  new_dict={}
  docs={}
  try:
    for k,v in document['product'][1].items():
      new_dict[k]=v
      for element in new_dict['emphatize']:
        for i, j in element.items():
          if(i=='classification'):
            docs[i]=j
  except:
    pass
  return dumps({"docs":docs}), 200

@page.route('/emphatize/check/final/<product>', methods=['GET'])
@jwt_required
def final_check(product):

  document = mongo.db.product.find_one({
    "username":get_jwt_identity(),
    "product.product_name":product})

  new_dict = {}
  docs={}

  try:
    for k,v in document['product'][1].items():
      new_dict[k]=v
      for element in new_dict['emphatize']:
        for i, j in element.items():
          if(i=='final'):
            docs[i]=j
  except:
    pass

  return dumps({"docs":docs}),200

@page.route('/emphatize/check/final/public/<product>', methods=['GET','POST'])
def final_check_(product):

  document = mongo.db.product.find_one({
    "username":request.json.get("username"),
    "product.product_name":product})

  new_dict = {}
  docs={}

  try:
    for k,v in document['product'][1].items():
      new_dict[k]=v
      for element in new_dict['emphatize']:
        for i, j in element.items():
          if(i=='final'):
            docs[i]=j
  except:
    pass

  return dumps({"docs":docs}),200


@page.route('/survey/total/<product>', methods=['GET'])
@jwt_required
def total_survey_by_user(product):

  dict_ = defaultdict()
  document = mongo.db.product.find_one_or_404({
    "username":get_jwt_identity(),
    "product.product_name":product})

  for k,v in document['product'][0].items():
    if(k == 'number_surveys'):
      dict_[k]=v
  
  return dumps({"docs":dict_}), 200


@page.route('/survey/count/<product>', methods=['GET'])
@jwt_required
def total_survey_counter(product):

  survey_by_user= total_survey_by_user(product)[0]
  print(survey_by_user)

  search_number = re.findall("[0-9]",survey_by_user)
  formated_search = int(''.join(search_number))
  print(formated_search)

  dict_ = defaultdict()
  clients_dict = defaultdict()
  document = mongo.db.product.find_one_or_404({
    "username":get_jwt_identity(),
    "product.product_name":product})

  for k,v in document['product'][2].items():
    dict_[k]=v

  for i,j in dict_['survey'].items():
    clients_dict[i] = j

  total_surveys=0
  for element, in_list in clients_dict.items():
    for z in in_list:
      total_surveys+=1

  print(total_surveys)

  #if(total_surveys == 2):
  #  email_survey_notification(get_jwt_identity())
  
  return dumps({"docs":total_surveys})



###########################
###########################
##                       ##
##   Funciones POST      ##
##      invitados        ##
##                       ##
###########################
###########################

#informacion en cada parte del scrum
#modificar imagen, tamanio mas grande
#resaltar el proceso de scrum con nada etapa



@page.route('/survey/<username>/<product>', methods=['POST'])
def survey(username, product):


  document = mongo.db.product.find_one_and_update({
    "username":username,
    "product.product_name":product},
    {"$addToSet":{"product.2.survey.clients":{
              "first_name":request.json.get("first_name"),
              "last_name":request.json.get("last_name"),
              "address":request.json.get("address"),
              "email":request.json.get("email"),
              "gender":request.json.get("gender"),
              "age":request.json.get("age"),
              "occupation":request.json.get("occupation"),
              "workplace":request.json.get("workplace"),
              "results":request.json.get("results")
              }
            }
          }
    )

  insert_into_clients_docs = mongo.db.clients.insert_one({
    "first_name":request.json.get("first_name"),
    "last_name":request.json.get("last_name"),
    "address":request.json.get("address"),
    "email":request.json.get("email"),
    "gender":request.json.get("gender"),
    "age":request.json.get("age"),
    "occupation":request.json.get("occupation"),
    "workplace":request.json.get("workplace")
    })

  print(document)
  return dumps({"docs":document}),200





####################
####################
##                ##
##      Mail      ##
##    Service     ##
##                ##  
##                ##
####################

@page.route('/me/email/', methods=['GET'])
@jwt_required
def get_me_email():

  docs = {}
  document = mongo.db.users.find_one({
    "username":get_jwt_identity()})

  return dumps({"docs":document['email']})

@page.route('/email/', methods=['POST'])
@jwt_required
@cross_origin()
def email():


  url = request.json.get("url")
  email = request.json.get("email")
 
  ip ='192.168.0.103:3000/'+url
  msg = Message("Hello",
          sender=current_app.config['MAIL_USERNAME'],
          recipients=[email],
          body=("I invite you to answer the next survey, Link -> {0}").format(ip) )
  mail.send(msg)

  return "200"

#boton sombreado
#bug de classificacion


@page.route('/clients/professions/', methods=['GET'])
@jwt_required
def getProfessions():

  docs = defaultdict(list)
  for element in mongo.db.clients.find({}): 
    if element['occupation']:
      #print(element['occupation'])
      #docs['profession'] = element ['occupation']
      docs['profession'].append (element ['occupation'])
  print(docs)
    
  return dumps({"docs":docs})


@page.route('/clients/query/users/', methods=['POST'])
@jwt_required
def query_clients():

 
  age = request.json.get("age_range_start")
  age_end = request.json.get("age_range_end")
  male = request.json.get("male",None)
  female = request.json.get("female",None)
  parse_age = int(age)
  parse_end_age = int(age_end)
  occupation = request.json.get("occupation")
  url = request.json.get("url")

  docs={}
  emails = []
  ip ='192.168.0.103:3000/'+url

  while parse_age <= parse_end_age:
    for element in mongo.db.clients.find({
      "occupation":occupation,
      "age": str(parse_age)}):
      if(male is not None and male =='M'):
        if(male in element['gender']):  
          if(element['email']):
            emails.append(element['email'])
      if (female is not None and female == 'F'):     
        if(female in element['gender']): 
          if(element['email']):
            emails.append(element['email'])
    parse_age+=1 
    print(parse_age)

  try:
    msg = Message("Hello",
      sender = current_app.config['MAIL_USERNAME'],
      recipients=emails,
      body=("I invite you to answer the next survey, Link -> {0}").format(ip) )
    mail.send(msg)
  except:
    return "no emails error"

  

  return dumps({"docs":emails}),200


@page.route('/email/notification/', methods=['GET'])
def email_survey_notification():
  
  document = mongo.db.users.find_one({
    "username":check_surveys()})

  msg = Message("Encuesta Terminada",
    sender=current_app.config['MAIL_USERNAME'],
    recipients= [document['email']],
    body="Tu encuesta ha sido finalizada, por favor, continue el proceso")
  mail.send(msg)

  return "200"

def check_surveys():

  counter = {}
  clients_dict = defaultdict()
  username = None
  survey_by_user = {}

  for user in mongo.db.users.find({}):
    if user['username']:
      username = user['username']
      element = mongo.db.product.find_one({"username":username})
      for k,v in element['product'][0].items():
        if(k == 'number_surveys'):
          survey_by_user[username] = v
      try:
        for key, value in element['product'][2].items():
          clients_dict[key] = value
          for i, j in clients_dict['survey'].items():
            for x in range(len(j)+1):
              counter[username] = x
      except:
        pass
  for user, client in counter.items():
    for username, survey in survey_by_user.items():
      if client == int(survey):
        return username

#########################
#########################
##                     ##
##                     ##
##    Metodologia      ##
##                     ##
#########################
#########################

@page.route('/methodology/<product>', methods=['GET'])
@jwt_required
def get_methodology(product):


  docs = {}
  document = mongo.db.product.find_one({
    "username":get_jwt_identity(),
    "product.product_name":product
    })

  for k,v in document['product'][0].items():
    if(k=='product_type'):
      docs[k]=v


  return dumps({"docs":docs}), 200

@page.route('/methodology/type/<product>', methods=['POST'])
@jwt_required
def post_methodology(product):


  document= mongo.db.product.find_one_and_update({
    "username":get_jwt_identity(),
    "product.product_name":product},
    {"$push":{"product.3.methodology":{
      "methodology_type":request.json.get("methodology_type")
        }
      }
    }
  )
  return dumps({"docs":document.inserted_id}),200



###################################################################
###################################################################
##                                                               ##
##                                                               ##
##                                                               ##
##            Data Manipulation Kano/Yang                        ##
##                                                               ##
##                                                               ##
###################################################################
###################################################################

@page.route('/data/answers/', methods=['GET'])
def get_survey_data():

  docs= {}
  results = defaultdict(list)

  document = mongo.db.product.find_one({
    "username":"marck",
    "product.product_name":"taza"
    })
  id=1
  for k,v in document['product'][2]['survey'].items():
    docs[k] = v
    for i,j in docs.items():
      docs = j
      for client in range(len(j)):
        if("results" in j[client]):
          results[id].append(j[client]["results"])
          id+=1

  positive =  defaultdict(list)
  negative = defaultdict(list)

  for element in results:
    for key, value in results[element][0].items():
      if(key == "positive"):
        for i, j in value.items():
          positive[i].append(j)
      if(key == "negative"):
        for i, j in value.items():
          negative[i].append(j) 
     

  print(positive, "\n")
  print(negative, "\n")


  

      
  return dumps({"docs":positive}),200