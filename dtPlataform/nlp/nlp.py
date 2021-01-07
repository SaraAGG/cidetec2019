
"""
attributos = ["duro", "brillante", "ruidoso"]

producto ="Envase de shampoo"

pregunta = "Como te sentirias si el producto"

for index in attributos:
	nueva_pregunta = pregunta + " " + producto + " " + " " + index
	print(nueva_pregunta)
"""


import requests

link = requests.get("https://archive.org/stream/GarciaMarquezGabrielCienAnosDeSoledad1/garcia-marquez-gabriel-cien-anos-de-soledad1_djvu.txt")
print(link.status_code)
link.encoding

print(link.text[:100])