"""dtPlataform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


from rest_framework import routers
from productCreator import views

from productCreator.views import ChoiceList
from productCreator.views import SurveyList

from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView)



router = routers.DefaultRouter()
router.register(r'register', views.UserRegisterFormViewSet )
router.register(r'products', views.ProductViewSet)
router.register(r'attributes', views.AttributesViewSet)
#router.register(r'questions', views.QuestionViewSet)
router.register(r'survey', views.ChoiceViewSet)
#router.register(r'list', views.ChoiceList, basename ='listview')
#router.register(r'api/token/$',TokenObtainPairView, basename="token_obtain_pair" )
#router.register(r'api/token/refresh/$', TokenRefreshView, basename="token_refresh")

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/token/',TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(r'api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path(r'list/', ChoiceList.as_view(), name='list-choice'),
    path(r'create/', SurveyList.as_view(), name='survey-list' ),
    path('', include(router.urls))
]
