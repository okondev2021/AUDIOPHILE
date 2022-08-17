from django.urls import path
from . import views


urlpatterns = [
    path('',views.index,name = 'index'),
    path('Headphones',views.headphones,name = 'headphones'),
    path('Earphones',views.earphones,name = 'earphones'),
    path('Speaker',views.speaker,name = 'speaker'),
    path('Product/<str:name>',views.product,name='product'),
    path('Login',views.login_view,name='login'),
    path('Register',views.register_view,name='register'),
    path('Logout',views.logout_view,name='logout'),
    path('Checkout',views.checkout,name='checkout'),

    # api route
    path('Save/<str:name>',views.save,name='save'),
    path('CostPrice/<str:itemname>',views.cost,name='cost'),
    path('AddCart/<str:name>',views.addcart,name='addcart'),
    path('Cart',views.cart,name='cart'),
    path('Cartcount/<str:name>',views.productcount,name='productcount'),
    path('GetItem/<str:name>',views.getitem,name='getitem'),
    path('checkout_details',views.checkout_details,name='checkout_details'),
    path('post_checkout',views.post_checkout,name='post_checkout'),
]