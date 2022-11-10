from django.urls import path
from . views import audiophile


urlpatterns = [
    path('',audiophile.index,name = 'index'),
    path('Headphones',audiophile.headphones,name = 'headphones'),
    path('Earphones',audiophile.earphones,name = 'earphones'),
    path('Speaker',audiophile.speaker,name = 'speaker'),
    path('Product/<str:name>',audiophile.product,name='product'),
    path('Login',audiophile.login_view,name='login'),
    path('Register',audiophile.register_view,name='register'),
    path('Logout',audiophile.logout_view,name='logout'),
    path('Checkout',audiophile.checkout,name='checkout'),

    # api route
    path('Save/<str:itemname>',audiophile.save,name='save'),
    path('AddCart/<str:name>',audiophile.addcart,name='addcart'),
    path('Cart',audiophile.cart,name='cart'),
    path('Cartcount/<str:name>',audiophile.productcount,name='productcount'),
    path('GetItem/<str:name>',audiophile.getitem,name='getitem'),
    path('checkout_details',audiophile.checkout_details,name='checkout_details'),
    path('post_checkout',audiophile.post_checkout,name='post_checkout'),

    # audiophile-admin url
    path('Admin_Product',audiophile.adminproduct,name='adminproduct'),
    path('Admin_create',audiophile.admin_create,name='admin_create'),
]