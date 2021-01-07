from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny




from .serializers import ProductSerializer
from .serializers import AttributesSerializer
from .serializers import ChoiceSerializer
from .serializers import UserSerializer

from django.contrib.auth.models import User
from .models import Productss
from .models import Attributess
from .models import Choices


from rest_framework import generics


class UserRegisterFormViewSet(viewsets.ModelViewSet):

	permission_classes = (AllowAny,)

	queryset = User.objects.all()
	serializer_class = UserSerializer

class ProductViewSet(viewsets.ModelViewSet):

	permission_classes = (AllowAny,)

	queryset = Productss.objects.all()
	serializer_class = ProductSerializer

class AttributesViewSet(viewsets.ModelViewSet):

	permission_classes = (AllowAny,)
	queryset = Attributess.objects.all()
	serializer_class = AttributesSerializer



class ChoiceViewSet(viewsets.ModelViewSet):

	permission_classes = (AllowAny,)
	queryset = Choices.objects.all()
	serializer_class = ChoiceSerializer


class ChoiceList(generics.ListAPIView):

	serializer_class = AttributesSerializer
	#queryset = ChoiceList.objects.all()

	def get_queryset(self):

		user = self.request.user
		return Attributess.objects.filter(created_by = user)


class SurveyList(generics.CreateAPIView):

	serializer_class = ChoiceSerializer

	permission_classes = (AllowAny,)


	def get_queryset(self):

		user = self.request.user
		query = Attributess.objects.filter(created_by = user) 
		return query


"""
Una vista  que filtre los atributos
por usuario logeado
"""