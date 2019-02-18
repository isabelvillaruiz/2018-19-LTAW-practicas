"""Mi_Tienda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from Mi_Tienda.views import my_funct
from Mi_Tienda.views import my_prod
from Mi_Tienda.views import saludo

"""Definimos una liksta de url que tiene mi tienda
    Url de administracion (ejemplo)
"""
urlpatterns = [
    url(r'^saludo/(\d{1,2})/', saludo),
    url(r'^producto/(\d{1,2})/', my_prod),
    url(r'^ramen/', my_funct),
    url(r'^test/', include(admin.site.urls)),
]

"""Expresiones regurales :D"""
