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





    // // MAKING SURE AN EMPTY INPUT FIELD IS NOT SUBMIITED
    function display_error(){
        window.location.href = `/Checkout#`;
        document.querySelectorAll('.label_right').forEach(function(label){
            label.style.display = 'none'
        })
        document.querySelectorAll('.input_fields').forEach(function(input){
            if(input.value === ""){
                const name = input.dataset.name
                document.querySelector(`#label_${name}`).style.display='block'
            }
        })
    }

    function clear_error(){
        document.querySelectorAll('.label_right').forEach(function(label){
            label.style.display = 'none'
        })
        checkoutAnimation()
    }

function checkoutAnimation(){
     document.querySelector('main').style.animationPlayState = 'running'
     document.querySelector('.text').style.opacity = '0'
        setTimeout(()=>{
            document.querySelector('.text').style.zIndex = 1
        }, 500)
        setTimeout(()=>{
            document.querySelector('.box').classList.add('reveal')
            document.querySelector('.vehicle').classList.add('revealtruck')

            const element1 = document.querySelector('#door1')
            element1.style.animationName = "open1"
            element1.style.animationPlayState = "running"

            const element2 = document.querySelector('#door2')
            element2.style.animationName = "open2"
            element2.style.animationPlayState = "running"

        }, 1000)
        setTimeout(()=>{
            const position =  document.querySelector('.back').getBoundingClientRect().x
            document.querySelector('.box').style.cssText = `transform: translateX(${100}%);`
        }, 2100)
        setTimeout(()=>{
            const element1 = document.querySelector('#door1')
            element1.style.animationName = "close1"
            element1.style.animationPlayState = "running"

            const element2 = document.querySelector('#door2')
            element2.style.animationName = "close2"
            element2.style.animationPlayState = "running"
        }, 2400)

        setTimeout(()=>{
            document.querySelector('.box').style.opacity = 0
        }, 2600)

        setTimeout(()=>{
            document.querySelector('.vehicle').style.cssText = `transform:translateX(50px)`
        }, 3600)

        setTimeout(()=>{
            document.querySelectorAll('.rays').forEach(function(ray){
                ray.style.opacity = 1
            })

            document.querySelectorAll('.road_sec').forEach(function(road_sec){
                road_sec.style.animationPlayState = 'running'
            })
        }, 3800)
        setTimeout(()=>{
            document.querySelector('.vehicle').style.cssText = `transform:translateX(-60%);transition:2s linear`
        }, 4500)

        setTimeout(()=>{
            document.querySelector('.vehicle').style.cssText = `transform:translateX(100vw)`

            document.querySelector('.road').style.opacity = 0
        }, 7500)
        setTimeout(()=>{
            document.querySelector('.animation').style.opacity = 0
            document.querySelector('.text').innerHTML = "Bye!!"
            document.querySelector('.text').style.cssText = `display: block; opacity: 1; width:100%; height:100%;text-align: center;display: flex;justify-content: center;align-items: center;text-transform: uppercase;font-size: 1.4rem;
            font-weight: bold;color:white`
        },8500) 
        setTimeout(()=>{
            document.querySelector('.successful').style.visibility = 'visible'
            document.querySelector('.shadow').style.display = 'block'
            window.location.href = `/Checkout#`;
        }, 9500)
}




















    // // making sure all required details are entered before purchasing items
    document.querySelector('.pay').addEventListener('click',function(){

        let inputFilelds =  document.querySelectorAll('.userField')
        const allinputfields = Array.from(inputFilelds).every(input => input.value !== "")

        if (allinputfields){

            const radioButtons = document.querySelectorAll(`input[name="paymenttype"]:checked `)

            if(radioButtons.length > 0){

                document.querySelectorAll('.radiodiv').forEach(function(radiodiv){
                    radiodiv.style.cssText = `border: 1px solid #c7c6c6`
                })

                document.querySelectorAll('.emoney_field').forEach(function(emoney_field){
                    emoney_field.style.cssText = `border: 1px solid #c7c6c6`
                })

                const iseEmonyChecked = document.getElementById("radioEmoney").checked
                const isCashChecked = document.getElementById("radiocash").checked

                if(iseEmonyChecked){

                    let radioFilelds =  document.querySelectorAll('.emoneyField')
                    const allemoneyField = Array.from(radioFilelds).every(input => input.value !== "")

                    if(allemoneyField){
                        document.querySelectorAll('.emoney_field').forEach(function(emoney_field){
                            emoney_field.style.cssText = `border: 1px solid #c7c6c6`
                        })
                        clear_error()

                    }
                    else{
                        
                        document.querySelectorAll('.emoneyField').forEach(function(emoneyField){
                            if(emoneyField.value === ""){
                                emoneyField.style.cssText = `border: 1px solid red` 
                            }
                        })
                        window.location.href = `/Checkout#`;   
                    }
                }
                 
                if(isCashChecked){
                    clear_error()
                }
            }
            else{
                document.querySelectorAll('.radiodiv').forEach(function(radiodiv){
                    radiodiv.style.cssText = `border: 1px solid red`
                })
            }
        }
        else{
            display_error()
        }


    })

    



    // ending transaction
    document.querySelector('#transaction_end').addEventListener('click',function(){
        fetch('/post_checkout')
        .then(response => response.json)
        .then(data =>{
            window.location.href = `/`;
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