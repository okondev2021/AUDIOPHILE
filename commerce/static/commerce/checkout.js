document.addEventListener('DOMContentLoaded',function(){

    // get total amount
    var total = 0
    document.querySelectorAll('#amount').forEach(function(amount){
        total = total+parseInt(amount.innerHTML)
    })
    document.querySelector('#total').innerHTML = total               


    document.querySelectorAll('.payment_type').forEach(function(paymenttype){
        paymenttype.style.display = 'none'
    })

    document.querySelectorAll('.payment_option').forEach(function(paymentoption){
        paymentoption.addEventListener('click',function(){
            document.querySelectorAll('.payment_type').forEach(function(paymenttype){
                paymenttype.style.display = 'none'
            })
            document.querySelector(`#payment_${this.dataset.name}`).style.display = 'block'
        })
    })


    // fetch details
    fetch('/checkout_details')
    .then(response => response.json())
    .then(details => {
        document.querySelector('#total_amount').innerHTML = details.total
        document.querySelector('#shipping').innerHTML = details.shipping
        document.querySelector('#vat').innerHTML = details.vat
        document.querySelector('#grandtotal').innerHTML = details.grand_total
    })

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

    function display_error(name){
        window.location.href = `http://127.0.0.1:8000/Checkout#`;
        document.querySelector(`#label_${name}`).style.display='block'
    }

    function clear_error(name){
        document.querySelector(`#label_${name}`).style.display='none'
        document.querySelector('.successful').style.visibility = 'visible'
        document.querySelector('.shadow').style.display = 'block'
        window.location.href = `http://127.0.0.1:8000/Checkout#`;
    }

    // making sure all required details are entered before purchasing items
    document.querySelector('.pay').addEventListener('click',function(){
        document.querySelectorAll('.input_fields').forEach(function(input_fields){
            if (input_fields.value == ""){
               display_error(input_fields.dataset.name)
            }
            else{
                clear_error(input_fields.dataset.name) 
            }
        })
    })

    // ending transaction
    document.querySelector('#transaction_end').addEventListener('click',function(){
        fetch('/post_checkout')
        .then(response => response.json)
        .then(data =>{
            window.location.href = `http://127.0.0.1:8000/`;
        })
    })


    // mobile navbar
    document.querySelector('#hamburger').addEventListener('click',function(){
        document.querySelector('#hamburger').style.display = 'none'
        document.querySelector('#close').style.display = 'block'
        document.querySelector('.mobile_nav_link').style.visibility = 'visible'
        document.querySelector('.shadow').style.cssText = `display:block;top:3%;height:97%`
    })


    document.querySelector('#close').addEventListener('click',function(){
        document.querySelector('#hamburger').style.display = 'block'
        document.querySelector('#close').style.display = 'none'
        document.querySelector('.shadow').style.display = 'none'
        document.querySelector('.mobile_nav_link').style.visibility = 'hidden'
    })


})