from django.contrib import admin
from .models import Blogging, models
from django.db import models


@admin.register(Blogging, )
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'created_at', 'views', 'is_published')
    list_filter = ('category', 'created_at', 'is_published')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_published',)
    ordering = ('-created_at',)
    created_at= models.DateTimeField(auto_now_add=True)

