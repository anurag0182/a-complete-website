from django.urls import path
from .views import Projectroot, blog_detail
urlpatterns= [
    path("blogging/", Projectroot.as_view(), name="home"),
    path("blogging/<slug:slug>/", blog_detail , name="Blog_detail"),
]