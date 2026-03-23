from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Blogging
from .serializer import Postserializer
from django.shortcuts import render, get_object_or_404
from .models import Blogging as Post

class Projectroot(ListAPIView):
    queryset= Blogging.objects.all()
    serializer_class= Postserializer
@api_view(['GET'])
def blog_detail(request, slug):
    blog = get_object_or_404(Blogging, slug=slug)
    serializer = Postserializer(blog)
    return Response(serializer.data)

