from django.shortcuts import render
from rest_framework import viewsets,filters
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import Dashboard
from .serializers import DashboardSerializer


# Create your views here.
class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend]

    ordering_fields = ['intensity','topic','region','added','country','relevance''title','likelihood']
    search_fields = ['end_year''sector','topic','region','added','country','source','title',]
    filterset_fields = ['end_year','sector','topic','region','country','pestle','source','title']


class DashboardView(APIView):
    def get(self, request, format=None):
        return render(request,'index.html')