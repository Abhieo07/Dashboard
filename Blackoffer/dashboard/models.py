from django.db import models

# Create your models here.
class Dashboard(models.Model):
    end_year = models.CharField(max_length=255,null=True,blank=True)
    intensity = models.CharField(max_length=255,null=True,blank=True)
    sector = models.CharField(max_length=255,null=True,blank=True)
    topic = models.CharField(max_length=255,null=True,blank=True)
    insight = models.CharField(max_length=255,null=True,blank=True)
    url = models.URLField(max_length=255,null=True,blank=True)
    region = models.CharField(max_length=255,null=True,blank=True)
    start_year = models.CharField(max_length=255,null=True,blank=True)
    impact = models.CharField(max_length=255,null=True,blank=True)
    added = models.CharField(max_length=255,null=True,blank=True)
    published = models.CharField(max_length=255,null=True,blank=True)
    country = models.CharField(max_length=255,null=True,blank=True)
    relevance = models.CharField(max_length=255,null=True,blank=True)
    pestle = models.CharField(max_length=255,null=True,blank=True)
    source = models.CharField(max_length=255,null=True,blank=True)
    title = models.TextField(null=True,blank=True)
    likelihood = models.CharField(max_length=255,null=True,blank=True)

    class Meta:
        verbose_name = 'Dashboard Model'
   
    def __str__(self):
        return f'{self.title}'