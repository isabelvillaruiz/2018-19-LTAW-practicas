from django import forms
from .models import Order

class OrderForm(forms.ModelForm):

    class Meta:
        model = Order
        fields = ['Name','Address','Mail','Wishes']
        labels = {
            'Name': 'Nombre',
            'Address': 'Direccion de envio',
            'Mail':'Email',
            'Wishes':"Deseos"

        }
        widgets = {
            'Name':forms.TextInput(),
            'Address':forms.TextInput(),
            'Mail':forms.TextInput(),
            'Wishes':forms.Textarea(),
            }
