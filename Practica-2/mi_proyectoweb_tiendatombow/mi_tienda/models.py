from __future__ import unicode_literals
from django import forms
from django.db import models

# Create your models here.

class Order (models.Model):
    Name = models.CharField(max_length=20)
    Address = models.CharField(max_length=100)
    Mail = models.CharField(max_length=100)
    Wishes = models.CharField(max_length=400)

class Product (models.Model):
    name = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.FloatField()
