from django.shortcuts import render
from rest_framework import views
from .serializers import HardwearSerializer
from rest_framework.response import Response
from pcpartpicker import API
from django.http import HttpResponse
import json

# Create your views here.

class HardwareView(views.APIView):

    def get(self, request):
        return HttpResponse("hello")
