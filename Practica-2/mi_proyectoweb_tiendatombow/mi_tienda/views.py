# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import Product


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
    return render(request, "order.html", {})

def list(request):


    products_to_show = []
    objects = Product.objects.all()

    for elt in objects:
        products_to_show.append(elt)

    return render(request,'list.html',{'prod_list':products_to_show})


    # -- Obtener la pagina html final
    html = t.render(c)
    return HttpResponse(html)
