from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login,logout
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from .models import Product,User,CartItem
import json

# Create your views here.
class audiophile():
    def index(request):
        product1 = Product.objects.get(Product_Name = 'YX1 WIRELESS EARPHONES')
        product2 = Product.objects.get(Product_Name = 'XX59 HEADPHONES')
        product3 = Product.objects.get(Product_Name = 'XX99 MARK ONE HEADPHONES')
        product4 = Product.objects.get(Product_Name = 'XX99 MARK TWO HEADPHONES')
        product5 = Product.objects.get(Product_Name = 'ZX7 SPEAKER')
        product6 = Product.objects.get(Product_Name = 'ZX9 SPEAKER')
        # removes all item in cart 
        if 'removeall' in request.POST:
            CartItem.objects.filter(Username = request.user).delete()
            user_name = User.objects.get(username = request.user)
            user_name.Cart.clear()
        # only logged in users can see certain things
        if request.user.is_authenticated:
            cartinfo = CartItem.objects.filter(Username=request.user)
            actual_amount = list()
            for cartinfos in cartinfo:
                multiplied_amount = cartinfos.ProductCount * cartinfos.ProductName.Amount
                actual_amount.append(multiplied_amount)
            context = {
                "product1":product1,
                "product2":product2,
                "product3":product3,
                "product4":product4,
                "product5":product5,
                "product6":product6,
                'cartinfo':cartinfo,
                'actual_amount':actual_amount
            }
            return render(request,'commerce/index.html',context)
        else:
            context = {
                "product1":product1,
                "product2":product2,
                "product3":product3,
                "product4":product4,
                "product5":product5,
                "product6":product6,
            }
            return render(request,'commerce/index.html',context)
            
    def headphones(request):
        product1 = Product.objects.get(Product_Name = 'XX59 HEADPHONES')
        product2 = Product.objects.get(Product_Name = 'XX99 MARK ONE HEADPHONES')
        product3 = Product.objects.get(Product_Name = 'XX99 MARK TWO HEADPHONES')
        if 'removeall' in request.POST:
            CartItem.objects.filter(Username = request.user).delete()
            user_name = User.objects.get(username = request.user)
            user_name.Cart.clear()
        if request.user.is_authenticated:
            cartinfo = CartItem.objects.filter(Username=request.user)
            actual_amount = list()
            for cartinfos in cartinfo:
                multiplied_amount = cartinfos.ProductCount * cartinfos.ProductName.Amount
                actual_amount.append(multiplied_amount)
            context = {
                "product1":product1,
                "product2":product2,
                "product3":product3,
                'cartinfo':cartinfo,
                'actual_amount':actual_amount
            }
            return render(request,'commerce/headphones.html',context)
        else:
            context = {
                "product1":product1,
                "product2":product2,
                "product3":product3
            }
            return render(request,'commerce/headphones.html',context)

    def earphones(request):
        product1 = Product.objects.get(Product_Name = 'YX1 WIRELESS EARPHONES')
        if 'removeall' in request.POST:
            CartItem.objects.filter(Username = request.user).delete()
            user_name = User.objects.get(username = request.user)
            user_name.Cart.clear()
        if request.user.is_authenticated:
            cartinfo = CartItem.objects.filter(Username=request.user)
            actual_amount = list()
            for cartinfos in cartinfo:
                multiplied_amount = cartinfos.ProductCount * cartinfos.ProductName.Amount
                actual_amount.append(multiplied_amount)
            context = {
                "product1":product1,
                'cartinfo':cartinfo,
                'actual_amount':actual_amount
            }
            return render(request,'commerce/earphones.html',context)
        else:
            context = {
                "product1":product1
            }
            return render(request,'commerce/earphones.html',context)

    def speaker(request):
        product1 = Product.objects.get(Product_Name = 'ZX7 SPEAKER')
        product2 = Product.objects.get(Product_Name = 'ZX9 SPEAKER')
        if 'removeall' in request.POST:
            CartItem.objects.filter(Username = request.user).delete()
            user_name = User.objects.get(username = request.user)
            user_name.Cart.clear()
        if request.user.is_authenticated:
            cartinfo = CartItem.objects.filter(Username=request.user)
            actual_amount =list()
            for cartinfos in cartinfo:
                multiplied_amount = cartinfos.ProductCount * cartinfos.ProductName.Amount
                actual_amount.append(multiplied_amount)
            context = {
                "product1":product1,
                "product2":product2,
                'cartinfo':cartinfo,
                'actual_amount':actual_amount
            }
            return render(request,'commerce/speakers.html',context)
        else:
            context = {
                "product1":product1,
                "product2":product2,
            }
            return render(request,'commerce/speakers.html',context)

    def product(request,name):
        if request.user.is_authenticated:
            product = Product.objects.get(Product_Name = name)
            other_product = Product.objects.all().exclude(Product_Name = name).order_by('Product_Name')
            paginator = Paginator(other_product,3)
            page_number = request.GET.get('page')
            other_products = paginator.get_page(page_number)
            User_cart = User.objects.get(username = request.user)
            cartinfo = CartItem.objects.filter(Username=request.user)
            Check_cart = User_cart.Cart.all()  
            if 'removeall' in request.POST:
                CartItem.objects.filter(Username = request.user).delete()
                user_name = User.objects.get(username = request.user)
                user_name.Cart.clear()
            actual_amount = list()
            for cartinfos in cartinfo:
                multiplied_amount = cartinfos.ProductCount * cartinfos.ProductName.Amount
                actual_amount.append(multiplied_amount)
        else:
            return HttpResponseRedirect(reverse('login'))
        return render(request,'commerce/product.html',{'product':product,'other_products':other_products,'Check_cart':Check_cart,'cartinfo':cartinfo,'actual_amount':actual_amount,'User_cart':User_cart})

    def checkout(request):
        cartinfo = CartItem.objects.filter(Username=request.user)
        if cartinfo.count() < 1:
            return HttpResponseRedirect(reverse('index'))
        else:
            if 'removeall' in request.POST:
                CartItem.objects.filter(Username = request.user).delete()
                user_name = User.objects.get(username = request.user)
                user_name.Cart.clear()
        return render (request,'commerce/checkout.html',{'cartinfo':cartinfo})


    # APIS FUNCTIONS

    # REMOVES ALL ITEMS IN USERS CART AFTER ITEMS HAVE BEEN PURCHASED AND TRANSACTION IS SUCCESSFUL
    @csrf_exempt
    def post_checkout(request):
        CartItem.objects.filter(Username = request.user).delete()
        user_name = User.objects.get(username = request.user)
        user_name.Cart.clear()
        return JsonResponse({'error':'none'})

    # GET ALL ITEM PURCHASED, TOTAL AMOUNT, VAT, SHIPPING PRICE
    @csrf_exempt
    def checkout_details(request):
        cartinfo = CartItem.objects.filter(Username=request.user)
        total = 0
        for cartinfos in cartinfo:
            total = total + cartinfos.Final_Price
        vat = 20/100 * total
        shipping = 50 
        grand_total = total+vat+shipping
        return JsonResponse({'total':total,'vat':round(vat),'shipping':shipping,'grand_total':round(grand_total)})

    @csrf_exempt
    # gets the new final price and product count for a single product and saves it
    def save(request,itemname):
        product = Product.objects.get(Product_Name = itemname)
        product_in_user_cart = CartItem.objects.get(Username = request.user,ProductName = product)
        if request.method == 'POST':
            data = json.loads(request.body)
            if data.get('Final_Price') is not None: 
                product_in_user_cart.Final_Price = data['Final_Price']
            if data.get('ProductCount') is not None:
                product_in_user_cart.ProductCount = data['ProductCount']
            product_in_user_cart.save()
            return HttpResponse(status = 204)  
        else:
            return HttpResponse('NO WAY BOSS') 

    @csrf_exempt
    # ADD ITEM TO USERS CART AND REMOVES ITEM
    def addcart(request,name):
        product = Product.objects.get(Product_Name=name)
        User_cart = User.objects.get(username = request.user)
        user_cart = User.objects.get(username = request.user)
        Check_cart = User_cart.Cart.all() 
        if product in Check_cart:
            user_cart.Cart.remove(product)
            CartItem.objects.filter(Username = request.user,ProductName = product).delete()
            return JsonResponse({'inner':'ADD TO CART'})

        else:
            user_cart.Cart.add(product)
            if CartItem.objects.filter(Username = request.user,ProductName = product).exists():
                messages.info(request,'Product already in cart')
            else:
                cartpurchase = CartItem.objects.create(Username = request.user,ProductName = product,Final_Price = product.Amount )
                cartpurchase.save()
            return JsonResponse({'inner':'REMOVE FROM CART'})

    @csrf_exempt
    def getitem(request,name):
        User_cart = User.objects.get(username = request.user)
        Check_cart = User_cart.Cart.all() 
        product = Product.objects.get(Product_Name=name)
        if product in Check_cart:
            iteminfos = CartItem.objects.get(Username = request.user,ProductName = product)
            return JsonResponse({'iteminfos_Product_Name':iteminfos.ProductName.Title,'iteminfos_ProductCount':iteminfos.ProductCount,'iteminfos_Amount':iteminfos.Final_Price,'actualPrice':iteminfos.ProductName.Amount}) 

        else:
            return JsonResponse({'status':'removed'})

    @csrf_exempt
    def cart(request):
        try:
            users_cart = User.objects.get(username = request.user)
            users_cartcount = users_cart.Cart.count()
            return JsonResponse({'cartcount':users_cartcount})
        except User.DoesNotExist:
            return JsonResponse({'cartcount':''})


    @csrf_exempt
    # GETS THE NUMBER OF ITEMS IN USERS CART
    def productcount(request,name):
        product = Product.objects.get(Product_Name=name)
        try: 
            add_numb = CartItem.objects.get(Username = request.user,ProductName = product)
            return JsonResponse({'status':1,'count':add_numb.ProductCount})
        except CartItem.DoesNotExist:
            return JsonResponse({'status':0,'count':'1'})  


#    AUTHENTICATION 
    def login_view(request):
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request,username=username,password =password)
            if user is not None:
                login(request,user)
                if username == 'Audiophileadmin':
                    return HttpResponseRedirect(reverse('audiophile_admin'))
                else:
                    return HttpResponseRedirect(reverse('index'))
            else:
                messages.info(request,'Invalid credentials')
        return render(request,'commerce/login.html')

    def register_view(request):
        if request.method == 'POST':
            username = request.POST['username']
            if username == "":
                messages.info(request,'Enter your details')
            else:   
                email = request.POST['email']
                password = request.POST['password']
                confirm = request.POST['confirmpassword']
                if password == confirm:
                    user = User.objects.create_user(username=username,email=email,password=password)
                    user.save()
                    login(request,user)
                    return HttpResponseRedirect(reverse('index'))
                else:
                    messages.info(request,'Password not the same')
            return render(request,'commerce/register.html')
        else:
            return render(request,'commerce/register.html')

    def logout_view(request):
        logout(request)
        return HttpResponseRedirect(reverse('index'))
    
    # audiophile-admin
    def audiophile_admin(request):
        if request.user.is_authenticated:
            if request.user.username == 'Audiophileadmin':
                if request.method == 'POST':
                    title = request.POST['title']
                    productname = request.POST['productname']
                    productdescription = request.POST['productdescription']
                    productfeature = request.POST['productfeature']
                    amount = request.POST['amount']
                    productimage = request.FILES['productimage']
                    sideimage1 = request.FILES['sideimage1']
                    sideimage2 = request.FILES['sideimage2']
                    sideimage3 = request.FILES['sideimage3']
                    product = Product.objects.create(Title = title,Product_Name = productname,Product_Description = productdescription,Product_Features=productfeature,Amount=amount,Product_Image=productimage,SideImage_1 = sideimage1,SideImage_2 = sideimage2,SideImage_3 = sideimage3)
                    product.save()
                return render(request,'commerce/audiophile-admin.html')
            else:
                return HttpResponse('RESTRICTED SPACE')
        else:
            return HttpResponseRedirect(reverse('login'))