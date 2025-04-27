from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Lesson(models.Model):
    name = models.CharField(max_length=100)
    startTime = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):
        if self.duration == "30":
            self.price = 15.00
        elif self.duration == "60":
            self.price = 30.00
        else:
            self.price = 0.00
        super().save(*args, **kwargs)

class StudioEvent(models.Model):
    name = models.CharField(max_length=100)
    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100, null=True)
    allDay = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.allDay:
            self.end = None
        super().save(*args, **kwargs)



