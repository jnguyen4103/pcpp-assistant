from django.shortcuts import render
from rest_framework import views
from .serializers import HardwearSerializer
from rest_framework.response import Response
from django.http import HttpResponse
import json
from django.db.models import Avg, Max, Min, Sum
from django.core import serializers
from .models import Price, CPU, Case, GPU, Memory, Motherboard, power, PriceLink, PCBuild
from django.contrib.auth.models import User

# Create your views here.

class getProductView(views.APIView):
    def get(self, request):
        # Testing finding the min price
        # price = GPU.objects.all().aggregate(Min('minPrice'))
        # g = GPU.objects.filter(minPrice__exact = price["minPrice__min"])
        # gpus = serializers.serialize('json', g)

        hardType = request.query_params["hard"]
        hardid = process_num(request.query_params["id"])

        product = {}
        product["error"] = "Couldn't find product"
        if hardType.lower() == "cpu":
            product = CPU.objects.filter(id=hardid)
            product = serializers.serialize('json', product)
        elif hardType.lower() == "case":
            product = Case.objects.filter(id=hardid)
            product = serializers.serialize('json', product)
        elif hardType.lower() == "gpu":
            product = GPU.objects.filter(id=hardid)
            product = serializers.serialize('json', product)
        elif hardType.lower() == "memory":
            product = Memory.objects.filter(id=hardid)
            product = serializers.serialize('json', product)
        elif hardType.lower() == "motherboard":
            product = Motherboard.objects.filter(id=hardid)
            product = serializers.serialize('json', product)
        elif hardType.lower() == "power":
            product = power.objects.filter(id=hardid)
            product = serializers.serialize('json', product)

        print(type(product))
        return HttpResponse(product, content_type="text/json-comment-filtered")
class HardwareView(views.APIView):

    def get(self, request):
        # Testing finding the min price
        # price = GPU.objects.all().aggregate(Min('minPrice'))
        # g = GPU.objects.filter(minPrice__exact = price["minPrice__min"])
        # gpus = serializers.serialize('json', g)

        hardType = request.query_params["hard"]
        min_hard = process_num(request.query_params["min"])
        max_hard = process_num(request.query_params["max"])

        product = {}
        product["error"] = "was unable to find a product in the price range"
        if hardType.lower() == "cpu":
            product = CPU.objects.filter(minPrice__range = (min_hard, max_hard))
            product = serializers.serialize('json', product)
        elif hardType.lower() == "case":
            product = Case.objects.filter(minPrice__range = (min_hard, max_hard))
            product = serializers.serialize('json', product)
        elif hardType.lower() == "gpu":
            product = GPU.objects.filter(minPrice__range = (min_hard, max_hard))
            product = serializers.serialize('json', product)
        elif hardType.lower() == "memory":
            product = Memory.objects.filter(minPrice__range = (min_hard, max_hard))
            product = serializers.serialize('json', product)
        elif hardType.lower() == "motherboard":
            product = Motherboard.objects.filter(minPrice__range = (min_hard, max_hard))
            product = serializers.serialize('json', product)
        elif hardType.lower() == "power":
            product = power.objects.filter(minPrice__range = (min_hard, max_hard))
            product = serializers.serialize('json', product)

        return HttpResponse(product, content_type="text/json-comment-filtered")

class SeedData(views.APIView):

    def get(self, request):
        #clean priceing
        clean_database(Price)
        clean_database(PriceLink)

        #Power
        clean_database(power)
        print(seedPower())
        
        #motherboard
        clean_database(Motherboard)
        print(seedMboard())

        #memory
        clean_database(Memory)
        print(seedMemory())

        #gpuz
        clean_database(GPU)
        print(seedGPU())

        #case
        clean_database(Case)
        print(seedCase())

        #cpu
        clean_database(CPU)
        print(seedCPU())

        return HttpResponse("hello")

class Pricing(views.APIView):

    def get(self, request):
        
        hardType = request.query_params["hard"]
        key = process_num(request.query_params["key"])

        prices = {}
        prices["error"] = "was unable to find a price for that product"
        if hardType.lower() == "cpu":
            product = CPU.objects.get(id=key)
            prices = Price.objects.filter(priceLink__exact = product.priceLink)
            prices = serializers.serialize('json', prices)
        elif hardType.lower() == "case":
            product = Case.objects.get(id=key)
            prices = Price.objects.filter(priceLink__exact = product.priceLink)
            prices = serializers.serialize('json', prices)
        elif hardType.lower() == "gpu":
            product = GPU.objects.get(id=key)
            prices = Price.objects.filter(priceLink__exact = product.priceLink)
            prices = serializers.serialize('json', prices)
        elif hardType.lower() == "memory":
            product = Memory.objects.get(id=key)
            prices = Price.objects.filter(priceLink__exact = product.priceLink)
            prices = serializers.serialize('json', prices)
        elif hardType.lower() == "motherboard":
            product = Motherboard.objects.get(id=key)
            prices = Price.objects.filter(priceLink__exact = product.priceLink)
            prices = serializers.serialize('json', prices)
        elif hardType.lower() == "power":
            product = power.objects.get(id=key)
            prices = Price.objects.filter(priceLink__exact = product.priceLink)
            prices = serializers.serialize('json', prices)

        return HttpResponse(prices, content_type="text/json-comment-filtered")

class GetComputers(views.APIView):
    
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            product = PCBuild.objects.filter(user = user)
            product = serializers.serialize('json', product)
            return HttpResponse(product, content_type="text/json-comment-filtered")
        return HttpResponse({"User needs to login!"}, content_type="text/json-comment-filtered")

class SaveComputer(views.APIView):
    
    def post(self, request):
        #print(int(request.POST.get("userid")))

        requested_user = User.objects.get(email="sam1998m@gmail.com") #default but it should never get hit
        if request.user.is_authenticated:
            requested_user = request.user
        elif request.POST.get("email", "") != "":
            requested_user = User.objects.get(email=request.POST.get("email"))
        else:
            requested_user = getByIDorName(User, request.POST.get("userid"))

        c = PCBuild(user = requested_user,
                    cpuLink = getByIDorName(CPU, request.POST.get("CPUid")),
                    gpuLink = getByIDorName(GPU, request.POST.get("GPUid")),
                    caseLink = getByIDorName(Case, request.POST.get("caseid")),
                    memoryLink = getByIDorName(Memory, request.POST.get("memoryid")),
                    mboardLink = getByIDorName(Motherboard, request.POST.get("mboardid")),
                    powerLink = getByIDorName(power, request.POST.get("powerid")),
                    name = request.POST.get("name"))
        c.save()
        return HttpResponse({"Success!"}, content_type="text/json-comment-filtered")

def getByIDorName(mtype, idname):
    if idname.isnumeric():
        return mtype.objects.get(pk=int(idname))
    else:
        return mtype.objects.get(name=idname)

def clean_database(data_type):
    data_type.objects.all().delete()

def min_price(p):
    minp = None
    if len(p.items()) == 0:
        return None
    for link, price in p.items():
        new = float(price.strip("$").strip("+"))
        if minp == None or new < minp:
            minp = new

    return minp

def process_num(num, split_string = ""):
    try:
        if num == None:
            return num
        else:
            return float(num.strip(split_string))
    except Exception:
        print(f"this ({num}) wasn't a number: split {split_string}")

def process_field(info, field):
    if field in info:
        return info[field]
    else:
        return None

def seedCPU():
    f = open(r'../../backend/data/good_data/cpu_data.json',)
    data = json.load(f)
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = CPU(name=name, image="missing", minPrice=min_price(price),
                coreClock=process_num(process_field(part_info, "Core Clock"), "GHz"), 
                coreCount=process_num(process_field(part_info, "Core Count"), ""),
                coreFamily=process_field(part_info, "Core Family"),
                manufacturer=process_field(part_info, "Manufacturer"),
                microarchitecture=process_field(part_info, "Microarchitecture"),
                socket=process_field(part_info, "Socket"))
        c.save()

        if len(price.items()) != 0:
            lin = PriceLink(lin="")
            lin.save()
            c.priceLink = lin
            c.save()
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))                
                p = Price(price=cost, link=link, priceLink=lin)
                p.save()
    return "Seeded CPU"

def seedCase():
    f = open(r'../../backend/data/good_data/case_data.json',)
    data = json.load(f)
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = Case(name=name, image="missing", minPrice=min_price(price),
            Color=process_field(part_info, "Color"),
            Dimensions=process_field(part_info, "Dimensions"),
            External_Bays=process_field(part_info, "External 5.25\" Bays"),
            Front_Panel_USB=process_field(part_info, "Front Panel USB"),
            Full_Height_Expansion_Slots=process_num(process_field(part_info, "Full-Height Expansion Slots"), ""),
            Half_Height_Expansion_Slots=process_num(process_field(part_info, "Half-Height Expansion Slots"), ""),
            Internal_Twoin_Bays=process_num(process_field(part_info, "Internal 2.5\" Bays"), ""),
            Internal_Threein_Bays=process_num(process_field(part_info, "Internal 3.5\" Bays"), ""),
            Manufacturer=process_field(part_info, "Manufacturer"),
            Maximum_Video_Card_Length=process_field(part_info, "Maximum Video Card Length"),
            Model=process_field(part_info, "Model"),
            Motherboard_Form_Factor=process_field(part_info, "Motherboard Form Factor"),
            Part_num=process_field(part_info, "Part #"),
            Power_Supply=process_field(part_info, "Power Supply"),
            Power_Supply_Shroud=process_field(part_info, "Power Supply Shroud"),
            Side_Panel_Window=process_field(part_info, "Side Panel Window"),
            Type=process_field(part_info, "Type"),
            Volume=process_field(part_info, "Volume"))
        c.save()

        if len(price.items()) != 0:
            lin = PriceLink(lin="")
            lin.save()
            c.priceLink = lin
            c.save()
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))                
                p = Price(price=cost, link=link, priceLink=lin)
                p.save()
    return "Seeded CASE"

def seedGPU():
    f = open(r'../../backend/data/good_data/gpu_data.json',)
    data = json.load(f)
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = GPU(name=name, image="missing", minPrice=min_price(price),
            Boost_Clock = process_num(process_field(part_info, "Boost Clock"), "MHz"),
            Chipset = process_field(part_info, "Chipset"),
            Color = process_field(part_info, "Color"),
            Cooling = process_field(part_info, "Cooling"),
            Core_Clock = process_num(process_field(part_info, "Core Clock"), "MHz"),
            Dvi_Ports = process_num(process_field(part_info, "DVI Ports"), ""),
            DVI_D_Dual_Link = process_num(process_field(part_info, "DVI-D Dual-Link"), ""),
            DisplayPort = process_num(process_field(part_info, "DisplayPort"), ""),
            DisplayPort_Ports = process_num(process_field(part_info, "DisplayPort Ports"), ""),
            Effective_Memory_Clock = process_num(process_field(part_info, "Effective Memory Clock"), "MHz"),
            Expansion_Slot_Width = process_field(part_info, "Expansion Slot Width"),
            External_Power = process_field(part_info, "External Power"),
            Frame_Sync = process_field(part_info, "Frame Sync"),
            HDMI_Ports = process_field(part_info, "HDMI Ports"),
            Interface = process_field(part_info, "Interface"),
            Length = process_field(part_info, "Length"),
            Manufacturer = process_field(part_info, "Manufacturer"),
            Memory = process_num(process_field(part_info, "Memory"), "GB"),
            Memory_Type = process_field(part_info, "Memory Type"),
            Mini_DisplayPort_Ports = process_field(part_info, "Mini-DisplayPort Ports"),
            Mini_HDMI_Ports = process_field(part_info, "Mini-HDMI Ports"),
            Part_num = process_field(part_info, "Part #"),
            TDP = process_num(process_field(part_info, "TDP"), "W"),
            VGA = process_field(part_info, "VGA"))
        c.save()

        if len(price.items()) != 0:
            lin = PriceLink(lin="")
            lin.save()
            c.priceLink = lin
            c.save()
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))                
                p = Price(price=cost, link=link, priceLink=lin)
                p.save()
    return "Seeded GPU"

def seedMemory():
    f = open(r'../../backend/data/good_data/memory_data.json',)
    data = json.load(f)
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = Memory(name=name, image="missing", minPrice=min_price(price),
                CAS_Latency = process_num(process_field(part_info, "CAS Latency"), ""),
                Color = process_field(part_info, "Color"),
                ECC_Registered = process_field(part_info, "ECC / Registered"),
                First_Word_Latency = process_num(process_field(part_info, "First Word Latency"), "ns"),
                Form_Factor = process_field(part_info, "Form Factor"),
                Heat_Spreader = process_field(part_info, "Heat Spreader"),
                Manufacturer = process_field(part_info, "Manufacturer"),
                Modules = process_field(part_info, "Modules"),
                Part_num = process_field(part_info, "Part #"),
                Price_GB = process_field(part_info, "Price / GB"),
                Voltage = process_field(part_info, "Voltage"))
        c.save()

        if len(price.items()) != 0:
            lin = PriceLink(lin="")
            lin.save()
            c.priceLink = lin
            c.save()
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))                
                p = Price(price=cost, link=link, priceLink=lin)
                p.save()
    return "Seeded Memory"

def seedMboard():
    f = open(r'../../backend/data/good_data/motherboard_data.json',)
    data = json.load(f)
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = Motherboard(name=name, image="missing", minPrice=min_price(price),
            Chipset = process_field(part_info, "Chipset"),
            Color = process_field(part_info, "Color"),
            Form_Factor = process_field(part_info, "Form Factor"),
            Manufacturer = process_field(part_info, "Manufacturer"),
            Memory_Max = process_num(process_field(part_info, "Memory Max"), "GB"),
            Memory_Slots = process_num(process_field(part_info, "Memory Slots"), ""),
            Memory_Speed = process_field(part_info, "Memory Speed"),
            Memory_Type = process_field(part_info, "Memory Type"),
            Model = process_field(part_info, "Model"),
            Onboard_Ethernet = process_field(part_info, "Onboard Ethernet"),
            Onboard_Video = process_field(part_info, "Onboard Video"),
            PCI_Slots = process_num(process_field(part_info, "PCI Slots"), ""),
            PCI_E_one_Slots = process_num(process_field(part_info, "PCI-E x1 Slots"), ""),
            PCI_E_sixteen_Slots = process_num(process_field(part_info, "PCI-E x16 Slots"), ""),
            PCI_E_four_Slots = process_num(process_field(part_info, "PCI-E x4 Slots"), ""),
            PCI_E_eight_Slots = process_num(process_field(part_info, "PCI-E x8 Slots"), ""),
            Part_num = process_field(part_info, "Part #"),
            RAID_Support = process_field(part_info, "RAID Support"),
            SATA_three_Gbs = process_num(process_field(part_info, "SATA 3 Gb/s"), ""),
            SATA_six_Gbs = process_num(process_field(part_info, "SATA 6 Gb/s"), ""),
            Socket_CPU = process_field(part_info, "Socket / CPU"),
            Supports_ECC = process_field(part_info, "Supports ECC"),
            USB_two_Headers = process_num(process_field(part_info, "USB 2.0 Headers"), ""),
            USB_three_Gen_one_Headers = process_num(process_field(part_info, "USB 3.2 Gen 1 Headers"), ""),
            USB_three_Gen_two_Headers = process_num(process_field(part_info, "USB 3.2 Gen 2 Headers"), ""),
            USB_three_Gen_twoxtwo_Headers = process_num(process_field(part_info, "USB 3.2 Gen 2x2 Headers"), ""),
            Wireless_Networking = process_field(part_info, "Wireless Networking"),
            eSATA_threeGbs = process_num(process_field(part_info, "eSATA 3Gb/s"), ""),
            mSATA_Slots = process_num(process_field(part_info, "mSATA Slots"), ""))
        c.save()

        if len(price.items()) != 0:
            lin = PriceLink(lin="")
            lin.save()
            c.priceLink = lin
            c.save()
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))                
                p = Price(price=cost, link=link, priceLink=lin)
                p.save()
    return "Seeded M Board"

def seedPower():
    f = open(r'../../backend/data/good_data/power_supply_data.json',)
    data = json.load(f)
    for name, info in data.items():
        price = info["buying_info"]
        part_info = info["part_info"]

        c = power(name=name, image="missing", minPrice=min_price(price),
                Color = process_field(part_info, "Color"),
                EPS_Connectors = process_num(process_field(part_info, "EPS Connectors"), ""),
                Efficiency = process_field(part_info, "Efficiency"),
                Efficiency_Rating = process_field(part_info, "Efficiency Rating"),
                Fanless = process_field(part_info, "Fanless"),
                Form_Factor = process_field(part_info, "Form Factor"),
                Length = process_field(part_info, "Length"),
                Manufacturer = process_field(part_info, "Manufacturer"),
                Modular = process_field(part_info, "Modular"),
                Molex_fourPin_Connectors = process_num(process_field(part_info, "Molex 4-Pin Connectors"), ""),
                Output = process_field(part_info, "Output"),
                PCIe_sixtwoPin_Connectors = process_num(process_field(part_info, "PCIe 6+2-Pin Connectors"), ""),
                Part_num = process_field(part_info, "Part #"),
                SATA_Connectors = process_num(process_field(part_info, "SATA Connectors"), ""),
                Type = process_field(part_info, "Type"),
                Wattage = process_num(process_field(part_info, "Wattage"), "W"))
        c.save()

        if len(price.items()) != 0:
            lin = PriceLink(lin="")
            lin.save()
            c.priceLink = lin
            c.save()
            for link, p in price.items():
                cost = float(p.strip("$").strip("+"))                
                p = Price(price=cost, link=link, priceLink=lin)
                p.save()
    return "Seeded Power"