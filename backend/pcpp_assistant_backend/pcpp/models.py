from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class PriceLink(models.Model):
    lin = models.TextField(null = True)
    


class Price(models.Model):
    price = models.DecimalField(decimal_places=2, max_digits=10)
    link = models.TextField(null = True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    def __str__(self):
        return str(self.price)

class CPU(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField(null = True)   
    minPrice = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    coreClock = models.FloatField(null = True)
    coreCount = models.IntegerField(null = True)
    coreFamily = models.CharField(max_length=128, null=True)
    manufacturer = models.CharField(max_length=128, null=True)
    microarchitecture = models.CharField(max_length=128, null=True)
    socket = models.CharField(max_length=64, null=True)

    def __str__(self):
        return self.name

class Case(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField(null = True)
    minPrice = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    Color = models.TextField(null = True)
    Dimensions = models.TextField(null = True)
    External_Bays = models.IntegerField(null = True)
    Front_Panel_USB = models.TextField(null = True)
    Full_Height_Expansion_Slots = models.IntegerField(null = True)
    Half_Height_Expansion_Slots = models.IntegerField(null = True)
    Internal_Twoin_Bays = models.IntegerField(null = True)
    Internal_Threein_Bays = models.IntegerField(null = True)
    Manufacturer = models.TextField(null = True)
    Maximum_Video_Card_Length = models.TextField(null = True)
    Model = models.TextField(null = True)
    Motherboard_Form_Factor = models.TextField(null = True)
    Part_num = models.TextField(null = True)
    Power_Supply = models.TextField(null = True)
    Power_Supply_Shroud = models.TextField(null = True)
    Side_Panel_Window = models.TextField(null = True)
    Type = models.TextField(null = True)
    Volume = models.TextField(null = True)

    def __str__(self):
        return self.name

class GPU(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField(null = True)
    minPrice = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    Boost_Clock = models.FloatField(null = True)
    Chipset = models.TextField(null = True)
    Color = models.TextField(null = True)
    Cooling = models.TextField(null = True)
    Core_Clock = models.FloatField(null = True)
    Dvi_Ports = models.IntegerField(null = True)
    DVI_D_Dual_Link = models.IntegerField(null = True)
    DisplayPort = models.IntegerField(null = True)
    DisplayPort_Ports = models.IntegerField(null = True)
    Effective_Memory_Clock = models.FloatField(null = True)
    Expansion_Slot_Width = models.TextField(null = True)
    External_Power = models.TextField(null = True)
    Frame_Sync = models.TextField(null = True)
    HDMI_Ports = models.TextField(null = True)
    Interface = models.TextField(null = True)
    Length = models.TextField(null = True)
    Manufacturer = models.TextField(null = True)
    Memory = models.IntegerField(null = True)
    Memory_Type = models.TextField(null = True)
    Mini_DisplayPort_Ports = models.TextField(null = True)
    Mini_HDMI_Ports = models.TextField(null = True)
    Part_num = models.TextField(null = True)
    TDP = models.IntegerField(null = True)
    VGA = models.TextField(null = True)

    def __str__(self):
        return self.name

class Memory(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField(null = True)   
    minPrice = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    CAS_Latency = models.IntegerField(null = True)
    Color = models.TextField(null = True)
    ECC_Registered = models.TextField(null = True)
    First_Word_Latency = models.FloatField(null = True)
    Form_Factor = models.TextField(null = True)
    Heat_Spreader = models.TextField(null = True)
    Manufacturer = models.TextField(null = True)
    Modules = models.TextField(null = True)
    Part_num = models.TextField(null = True)
    Price_GB = models.TextField(null = True)
    Voltage = models.TextField(null = True)

    def __str__(self):
        return self.name

class Motherboard(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField(null = True)
    minPrice = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    Chipset = models.TextField(null = True)
    Color = models.TextField(null = True)
    Form_Factor = models.TextField(null = True)
    Manufacturer = models.TextField(null = True)
    Memory_Max = models.IntegerField(null = True)
    Memory_Slots = models.IntegerField(null = True)
    Memory_Speed = models.TextField(null = True)
    Memory_Type = models.TextField(null = True)
    Model = models.TextField(null = True)
    Onboard_Ethernet = models.TextField(null = True)
    Onboard_Video = models.TextField(null = True)
    PCI_Slots = models.IntegerField(null = True)
    PCI_E_one_Slots = models.IntegerField(null = True)
    PCI_E_sixteen_Slots = models.IntegerField(null = True)
    PCI_E_four_Slots = models.IntegerField(null = True)
    PCI_E_eight_Slots = models.IntegerField(null = True)
    Part_num = models.TextField(null = True)
    RAID_Support = models.TextField(null = True)
    SATA_three_Gbs = models.IntegerField(null = True)
    SATA_six_Gbs = models.IntegerField(null = True)
    Socket_CPU = models.TextField(null = True)
    Supports_ECC = models.TextField(null = True)
    USB_two_Headers = models.IntegerField(null = True)
    USB_three_Gen_one_Headers = models.IntegerField(null = True)
    USB_three_Gen_two_Headers = models.IntegerField(null = True)
    USB_three_Gen_twoxtwo_Headers = models.IntegerField(null = True)
    Wireless_Networking = models.TextField(null = True)
    eSATA_threeGbs = models.IntegerField(null = True)
    mSATA_Slots = models.IntegerField(null = True)

    def __str__(self):
        return self.name

class power(models.Model):
    name = models.CharField(max_length=256)
    image = models.TextField(null = True)
    minPrice = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    priceLink = models.ForeignKey(PriceLink, on_delete=models.CASCADE, null = True)

    Color = models.TextField(null = True)
    EPS_Connectors = models.IntegerField(null=True)
    Efficiency = models.TextField(null = True)
    Efficiency_Rating = models.TextField(null=True)
    Fanless = models.TextField(null = True)
    Form_Factor = models.TextField(null = True)
    Length = models.TextField(null = True)
    Manufacturer = models.TextField(null = True)
    Modular = models.TextField(null = True)
    Molex_fourPin_Connectors = models.IntegerField(null = True)
    Output = models.TextField(null = True)
    PCIe_sixtwoPin_Connectors = models.IntegerField(null = True)
    Part_num = models.TextField(null = True)
    SATA_Connectors = models.IntegerField(null = True)
    Type = models.TextField(null = True)
    Wattage = models.IntegerField(null = True)

    def __str__(self):
        return self.name

class PCBuild(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null = True)
    name = models.CharField(max_length=256)
    cpuLink = models.ForeignKey(CPU, on_delete=models.PROTECT, null = True)
    gpuLink = models.ForeignKey(GPU, on_delete=models.PROTECT, null = True)
    caseLink = models.ForeignKey(Case, on_delete=models.PROTECT, null = True)
    memoryLink = models.ForeignKey(Memory, on_delete=models.PROTECT, null = True)
    mboardLink = models.ForeignKey(Motherboard, on_delete=models.PROTECT, null = True)
    powerLink = models.ForeignKey(power, on_delete=models.PROTECT, null = True)

    def __str__(self):
        return str(self.name)

