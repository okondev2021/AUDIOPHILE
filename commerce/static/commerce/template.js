document.addEventListener('DOMContentLoaded',function(){

    // count items in cart
    async function cartcount(){
        await fetch('/Cart')
        .then(response => response.json())
        .then(data => {
            if (data.cartcount == '0'){
                document.querySelector('#sup').innerHTML = ""
                document.querySelector('#supp').innerHTML = 0
            }
            else{
                document.querySelector('#sup').innerHTML = data.cartcount
                document.querySelector('#supp').innerHTML = data.cartcount
                document.querySelector('#mobilesup').innerHTML = data.cartcount
            }
        })
    }
    cartcount()

    // open cart desktop
    document.querySelector('#cartimage').addEventListener('click',function(){
        document.querySelector('#cart').style.display = 'block'
        document.querySelector('.shadow').style.display = 'block'
    })

    // opn cart mobile/tab
    document.querySelector('#mobile_cartimage').addEventListener('click',function(){
        document.querySelector('#cart').style.display = 'block'
        document.querySelector('.shadow').style.display = 'block'
    })

    // close cart
    document.querySelector('#closecart').addEventListener('click',function(){
        document.querySelector('#cart').style.display = 'none'
        document.querySelector('.shadow').style.display = 'none'
    })

    // get total amount
    var total = 0
    document.querySelectorAll('.amount').forEach(function(amount){
        total = total+parseInt(amount.innerHTML)
    })
    document.querySelector('#total').innerHTML = total

        // mobile navbar
        document.querySelector('#hamburger').addEventListener('click',function(){
            document.querySelector('#hamburger').style.display = 'none'
            document.querySelector('#close').style.display = 'block'
            document.querySelector('.mobile_nav_link').style.visibility = 'visible'
            document.querySelector('.shadow').style.cssText = `display:block;top:1.5%;height:98.5%`
        })
    
    
        document.querySelector('#close').addEventListener('click',function(){
            document.querySelector('#hamburger').style.display = 'block'
            document.querySelector('#close').style.display = 'none'
            document.querySelector('.shadow').style.display = 'none'
            document.querySelector('.mobile_nav_link').style.visibility = 'hidden'
        })
        
})