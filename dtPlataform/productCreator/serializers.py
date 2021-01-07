from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

import bcrypt

from .models import Productss
from .models import Attributess
from .models import Choices

from rest_framework import  serializers


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username', 'password', 'first_name', 'last_name', 'email')

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance


class ProductSerializer(serializers.ModelSerializer):

	created_by = serializers.SlugRelatedField(queryset = User.objects.all(), slug_field ='username')

	class Meta:
		model = Productss
		fields = '__all__'



class AttributesSerializer(serializers.ModelSerializer):

	created_by =  serializers.SlugRelatedField(queryset = User.objects.all(), slug_field = 'username')
	product_name  = serializers.SlugRelatedField(queryset = Productss.objects.all(), slug_field ='product')

	class Meta:
		model = Attributess
		fields = '__all__'

class ChoiceSerializer(serializers.ModelSerializer):

	created_by = serializers.SlugRelatedField(queryset = User.objects.all(), slug_field = 'username')
	#attribute_id = serializers.SlugRelatedField(queryset = Attributess.objects.all(), slug_field = 'attribute_id')
	product_id = serializers.SlugRelatedField(queryset = Productss.objects.all(), slug_field = 'product')
	#question_id = serializers.SlugRelatedField(queryset= Questions.objects.all(), slug_field = 'question_text')
	#attribute_= serializers.ReadOnlyField(source ='attribute_id.attribute_id')

	class Meta:
		model = Choices
		fields = ('created_by', 'product_id', 'attribute_id','choice')

