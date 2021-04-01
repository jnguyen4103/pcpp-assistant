from django.db import models

# Create your models here.


class CPU(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField()    
    minPrice = models.DecimalField(decimal_places=2, max_digits=10)
    coreClock = models.FloatField()
    coreCount = models.IntegerField()
    coreFamily = models.CharField(max_length=128)
    manufacturer = models.CharField(max_length=128)
    microarchitecture = models.CharField(max_length=128)
    socket = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class Price(models.Model):
    price = models.DecimalField(decimal_places=2, max_digits=10)
    link = models.TextField()
    item = models.ForeignKey(CPU, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.price)