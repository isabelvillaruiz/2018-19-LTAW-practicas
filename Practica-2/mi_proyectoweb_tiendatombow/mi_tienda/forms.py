from django import forms

class OrderForm(forms.Form):
    color = forms.ChoiceField(label="",
                                initial='',
                                widget=forms.Select(),
                                required=True)
