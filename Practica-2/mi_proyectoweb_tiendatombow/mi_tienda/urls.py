from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^ddbb/', views.ddbb),
    url(r'^results.html/', views.results),
    url(r'^gallery/', views.gallery_view),
    url(r'^video/', views.video_view),
    url(r'^order/', views.order_view),
]
