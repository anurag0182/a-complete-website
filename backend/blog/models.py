from django.db import models
from django.utils.text import slugify

class Blogging(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    text = models.TextField()
    image = models.ImageField(upload_to="blogging/")
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    category = models.CharField(max_length=100)
    is_published = models.BooleanField(default=True)
    class Meta:
        ordering = ['-created_at'] 


    def save(self, *args, **kwargs):   # ✅ CORRECT PLACE
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

