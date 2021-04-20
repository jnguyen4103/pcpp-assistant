from django.contrib import admin
from .models import Price, CPU, Case, GPU, Memory, Motherboard, power, PCBuild

# Register your models here.
admin.site.register(power)
admin.site.register(Motherboard)
admin.site.register(Memory)
admin.site.register(GPU)
admin.site.register(Case)
admin.site.register(CPU)
admin.site.register(Price)
admin.site.register(PCBuild)