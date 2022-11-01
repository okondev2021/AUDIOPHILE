document.addEventListener('DOMContentLoaded',function(){
    const btn = document.querySelector('#addtocart').innerHTML
    if (btn === 'ADD TO CART'){
        document.querySelector('#cardadd').style.display = 'none'
    }
    else{
        document.querySelector('#cardadd').style.display = 'block'
    }
    // all page
    document.querySelector('#cartimage').addEventListener('click',function(){
        document.querySelector('#cart').style.display = 'block'
        document.querySelector('.shadow').style.display = 'block'
    })
    document.querySelector('#mobile_cartimage').addEventListener('click',function(){
        document.querySelector('#cart').style.display = 'block'
        document.querySelector('.shadow').style.display = 'block'
    })
    document.querySelector('#closecart').addEventListener('click',function(){
        document.querySelector('#cart').style.display = 'none'
        document.querySelector('.shadow').style.display = 'none'
    })
    var total = 0
    document.querySelectorAll('.amount').forEach(function(amount){
        total = total+parseInt(amount.innerHTML)
    })
    document.querySelector('#total').innerHTML = total

    async function itemcount(name){
        await fetch('/Cartcount/'+`${name}`)
        .then(response => response.json())
        .then(data => {
            const number = document.querySelector('#number')
            number.innerHTML = data.count

        })
    }
    itemcount(document.querySelector('#productname').getAttribute('data-name'))

    document.querySelector('#addtocart').addEventListener('click',function(){
       fetch('/AddCart/'+`${this.dataset.name}`)
       .then(response => response.json())
       .then(data => {
            if (window.innerWidth > 767){
                document.querySelector('#addtocart').innerHTML = data.inner
                if (data.inner === 'REMOVE FROM CART'){
                    var sup1 = document.querySelector('#sup')
                    newsup1 =  parseInt(sup1.innerHTML) + 1
                    document.querySelector('#sup').innerHTML = newsup1
                    document.querySelector('#supp').innerHTML = newsup1
                    window.location.href = `http://127.0.0.1:8000/Product/${this.dataset.name}`;             
                }
                else{
                    var sup1 = document.querySelector('#sup')
                    newsup1 = parseInt(sup1.innerHTML) - 1
                    document.querySelector('#sup').innerHTML = newsup1
                    document.querySelector('#supp').innerHTML = newsup1
                    window.location.href = `http://127.0.0.1:8000/Product/${this.dataset.name}`;
                }
           }
           else{ 
                document.querySelector('#addtocart').innerHTML = data.inner

                const productname_incart = document.createElement('div')
                const product_link = document.createElement('a')
                const product_span = document.createElement('span')

                const product_amountp = document.createElement('div')
                const product_amountspan = document.createElement('span')
                const initialamount = document.createElement('span')


                const main_div = document.createElement('div')
                main_div.style.cssText = `display: flex;justify-content: space-between;width: 100%`
                main_div.setAttribute('id','two_11')

                if (data.inner === 'REMOVE FROM CART'){
                    var sup1 = document.querySelector('#mobilesup')
                    newsup1 =  parseInt(sup1.innerHTML) + 1
                    document.querySelector('#mobilesup').innerHTML = newsup1
                    document.querySelector('#supp').innerHTML = newsup1

                    const btn = document.querySelector('#addtocart').innerHTML
                    if (btn === 'ADD TO CART'){
                        document.querySelector('#cardadd').style.display = 'none'
                    }
                    else{
                        document.querySelector('#cardadd').style.display = 'block'
                    }

                    fetch('/GetItem/'+`${this.dataset.name}`)
                    .then(response => response.json())
                    .then(data => {
                        productname_incart.setAttribute('id','productname_incart')
                        productname_incart.setAttribute('class',`productname_${this.dataset.name}`)
                        productname_incart.setAttribute('data-item',`${this.dataset.name}`)

                        product_link.style.cssText = `color: black;text-decoration:none`
                        product_link.setAttribute('href',`Product/${this.dataset.name}`)

                        product_link.innerHTML = data.iteminfos_Product_Name
                        product_span.innerHTML = `${data.iteminfos_ProductCount}`
                        product_span.setAttribute('data-countname',`${this.dataset.name}`)
                        product_span.style.cssText = `margin-left:10px`

                        product_link.append(product_span)
                        productname_incart.append(product_link)

                        main_div.append(productname_incart)

                        // amount
                        product_amountp.setAttribute('id',`amount_${this.dataset.name}`)
                        product_amountp.setAttribute('data-itemprice',`${this.dataset.name}`)
                        product_amountp.append(product_amountspan)
                        product_amountspan.setAttribute('class','amount')
                        product_amountspan.setAttribute('data-initemprice',`${this.dataset.name}`)
                        product_amountspan.innerHTML = data.iteminfos_Amount
                        product_amountp.append(initialamount)
                        initialamount.setAttribute('data-initialPrice',`${this.dataset.name}`)
                        initialamount.innerHTML = data.actualPrice
                        initialamount.style.display = 'none'

                        main_div.append(product_amountp)

                        document.querySelector('#two_1').append(main_div)

                        var total = 0
                        document.querySelectorAll('.amount').forEach(function(amount){
                            total = total+parseInt(amount.innerHTML)
                        })
                        document.querySelector('#total').innerHTML = total
                    })
                }
                else{
                    var sup1 = document.querySelector('#mobilesup')
                    newsup1 = parseInt(sup1.innerHTML) - 1
                    document.querySelector('#mobilesup').innerHTML = newsup1

                    document.querySelector(`[data-item = "${this.dataset.name}"]`).remove()
                    document.querySelector(`[data-itemprice = "${this.dataset.name}"]`).remove()

                    var total = 0
                    document.querySelectorAll('.amount').forEach(function(amount){
                        total = total+parseInt(amount.innerHTML)
                    })
                    document.querySelector('#total').innerHTML = total

                    const btn = document.querySelector('#addtocart').innerHTML
                    if (btn === 'ADD TO CART'){
                        document.querySelector('#cardadd').style.display = 'none'
                    }
                    else{
                        document.querySelector('#cardadd').style.display = 'block'
                    }

                }
           }

       })
    })
    async function cartcount(){
        await fetch('/Cart')
        .then(response => response.json())
        .then(data => {
            if (data.cartcount == '0'){
                document.querySelector('#supp').innerHTML = 0
            }
            else{
                document.querySelector('#supp').innerHTML = data.cartcount
            }
        })
    }
    cartcount()
    
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
