from django.http import HttpResponse
from django.template import Template, Context



def my_funct(request):
    html = "Hola, que hambre!!!!"

    return HttpResponse(html)

def my_prod(request,param):

    numero = int(param)

    html = "Acceso al producto: %i" % numero ;

    return HttpResponse(html)



PLANTILLA = """

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <p>Bienvenido a mi tienda, {{user}} </p>

  </body>
</html>

"""

def saludo(request):
    t = Template(PLANTILLA)
    c = Context({'user': 'totoro'})

    html = t.render(c)
    return HttpResponse(html)
