from django.shortcuts import render
from rest_framework import views
from .serializers import HardwearSerializer
from rest_framework.response import Response
from django.http import HttpResponse
import json
from .models import Price, CPU

# Create your views here.

class HardwareView(views.APIView):

    def get(self, request):
        return HttpResponse("hello")


class SeedData(views.APIView):

    def get(self, request):
        seedCPU()

        return HttpResponse("hello")


def seedCPU():
    f = open(r'../../backend/data/cpu_data.json',)
    data = json.load(f)
    print(type(data))
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = CPU(name=name, image="missing", minPrice=min_price(price),
                coreClock=process_num(part_info["Core Clock"], "GHz"), coreCount=process_num(part_info["Core Count"], ""),
                coreFamily=part_info["Core Family"], manufacturer=part_info["Manufacturer"],
                microarchitecture=part_info["Microarchitecture"], socket=part_info["Socket"])
        c.save()        
        
        if len(price.items()) != 0:
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))
                p = Price(price=cost, link=link, item = c)
                p.save()
    return "Seeded CPU"

def min_price(p):
    minp = None
    if len(p.items()) == 0:
        return None
    for link, price in p.items():
        new = float(price.strip("$").strip("+"))
        if minp == None or new < minp:
            minp = new

    return minp

def process_num(num, split_string):
    return float(num.strip(split_string))
