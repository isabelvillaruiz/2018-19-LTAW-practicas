from django.http import HttpResponse
from django.template import Template, Context



def my_funct(request):
    html = "Hola, que hambre!!!!"

    return HttpResponse(html)

def my_prod(request,param):

    numero = int(param)

    html = "Acceso al producto: %i" % numero ;

    return HttpResponse(html)



def saludo(request,param):


    numero = int(param)
    print('num: ' + numero)

    fp = open('/home/alumnos/ivilla/github/2018-19-LTAW-practicas/Practica-2/Mi_Tienda/Mi_Tienda/test' + numero + '.html');

    t = Template(fp.read())
    fp.close()
    c = Context({'user': 'totoro'})
    html = t.render(c)
    return HttpResponse(html)
