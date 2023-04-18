from django.contrib import admin
from .models import Dashboard

import json
from django.conf import settings

# Create your views here.

class db:
    country = Dashboard.objects.all()
    if not country:
        DB = settings.DB_FILE
        with open(DB, encoding='UTF-8') as jsonFile:
            data = json.load(jsonFile)
            for i in data:
                Dashboard.objects.create(**i).save()
    else:
        pass

# Register your models here.
admin.site.register(Dashboard)