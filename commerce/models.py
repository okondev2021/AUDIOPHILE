from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    Cart = models.ManyToManyField('Product',related_name='cart',blank = True)

    def __str__(self):
        return self.username
    

class Product(models.Model):
    Title = models.CharField(max_length = 200)
    Product_Name = models.CharField(max_length = 10000,default='')
    Product_Description = models.CharField(max_length = 10000)
    Product_Features = models.CharField(max_length = 10000)
    Amount = models.IntegerField()
    Product_Image =  models.CharField(max_length = 700000)
    SideImage_1 =  models.CharField(max_length = 700000)
    SideImage_2 =  models.CharField(max_length = 700000)
    SideImage_3 =  models.CharField(max_length = 700000)

    def __str__(self):
        return self.Title
    
    def serialize(self):
        return {
            "id": self.id,
            'Title':self.Title,
            "Product_Name": self.Product_Name,
            "Product_Description": self.Product_Description,
            "Product_Features":self.Product_Features,
            "Amount":self.Amount
        }
    
    
    

class CartItem(models.Model):
    Username = models.ForeignKey('User',on_delete = models.CASCADE,related_name ='usernamecart')
    ProductName = models.ForeignKey('Product',on_delete = models.CASCADE,related_name = 'productcart')
    ProductCount = models.IntegerField(default = 1)
    Final_Price = models.IntegerField(default = 0)


    def __str__(self):
        return f"{self.Username} bought {self.ProductName}"
    
    def serialize(self):
        return {
            "id": self.id,
            'Username':self.Username,
            "ProductName": self.ProductName,
            "ProductCount": self.ProductCount
        }
