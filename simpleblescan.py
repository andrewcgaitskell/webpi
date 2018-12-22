from bluepy import btle
 
print("Connecting...")
dev = btle.Peripheral("98:4F:EE:0C:FB:00")
 
print("Services...")
for svc in dev.services:
  print(str(svc))
  
led3 = btle.UUID("acf1399a-05de-4f19-932d-9b82e23c78bc")
 
ledService = dev.getServiceByUUID(led3)
for ch in ledService.getCharacteristics():
  print str(ch)
