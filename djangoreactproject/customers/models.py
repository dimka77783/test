from django.db import models


class Customer(models.Model):
    Date = models.CharField("Date", max_length=255)
    Title = models.CharField("Title", max_length=255)
    Аmount = models.CharField("Аmount", max_length=255)
    Distance = models.CharField("Distance", max_length=255)

    def __str__(self):
        return self.Title