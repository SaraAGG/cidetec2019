from django.contrib import admin

# Register your models here.



from .models import Productss
from .models import Attributess
from .models import Choices




admin.site.register(Productss)
admin.site.register(Attributess)
admin.site.register(Choices)
