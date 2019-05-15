# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from mi_tienda.models import Product
from mi_tienda.models import Order

from mi_tienda.forms import OrderForm


PLANTILLA_LIST = """
<!DOCTYPE html>
<html lang="es" dir="ltr">
<link rel="stylesheet" href="{% static 'styles.css'%}">
  <head>
    <meta charset="utf-8">
    <title>Listado</title>
  </head>
  <body>
    <p>Bienvenido a mi tienda, {{user}}</p>
  </body>
</html>
"""

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})

def gallery_view (request):
    return render(request, "gallery.html", {})

def video_view (request):
    return render(request, "video.html", {})

def order_view (request):
    if request.method == 'POST':
        print("He entrado al POST")
        form = OrderForm(request.POST)
        if form.is_valid():
            products = Product.objects.all()
            print(products)
            #data = form.cleaned_data
            #order_to_save = Order(Name=data['Name'], Address=data['Address'], Mail=data['Mail'], Wishes=data['Wishes'])
            form.save()

            return HttpResponse('<h1>Your order has been placed.</h1><a href="../">Return to main page</a>')
    else:
        form = OrderForm()
        print("Holaa")
    return render(request,'order.html',{"form":form})


def ddbb(request):

    orders_to_show = []
    html = "<h1>Listado de Pedidos</h1>"
    orders = Order.objects.all()

    for order in orders:

        #msg = order.Name + " " + order.Address + " " + order.Mail + " " + order.Wishes
        orders_to_show.append(order);
        #print("Mensaje" + msg);

    return render(request,'ddbb.html',{'ord_list':orders_to_show})



def list(request):


    products_to_show = []
    html = "<h1>Listado de articulos</h1>"
    objects = Product.objects.all()

    for object in objects:
        products_to_show.append(object)
        print(type(object))
        print("Hola");

    return render(request,'list.html',{'prod_list':products_to_show})


def results(request):


    print("hola")
    item_to_find = request.GET.get('Item_Tombow',None)
    products_to_show = []
    html = "<h1>Listado de productos buscados</h1>"
    objects = Product.objects.all()

    for object in objects:
        print("Hola")
        print("Rotu: " + object.name)
        print("Input: " + str(item_to_find))
        #producto_database = producto.name
        if item_to_find == object.name:
            print("Rotu" + object.name)
            products_to_show.append(object)
            print(products_to_show)
    #print(Peticion de productos)

    return render(request, 'results.html',{'ord_list':products_to_show})
