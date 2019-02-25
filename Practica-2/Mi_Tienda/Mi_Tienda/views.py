from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template



def my_funct(request):
    html = "Hola, que hambre!!!!"

    return HttpResponse(html)

def my_prod(request,param):

    numero = int(param)

    html = "Acceso al producto: %i" % numero ;

    return HttpResponse(html)



def saludo(request):


    t = get_template('test.html')
    c = {'user': 'totoro'}
    html = t.render(c)
    return HttpResponse(html)

    """numero = int(param)
    print('num: ' + numero)"""



    """fp = open('/home/alumnos/ivilla/github/2018-19-LTAW-practicas/Practica-2/Mi_Tienda/Mi_Tienda/test.html');"""
    """t = Template(fp.read())"""



    """fp.close()"""
