from rest_framework import serializers
from .models import Blogging
class Postserializer(serializers.ModelSerializer):
    class Meta:
        model= Blogging
        fields= "__all__"