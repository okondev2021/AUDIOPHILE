document.addEventListener('DOMContentLoaded',function(){

    function Save(name,product_Count,finalPrice){
        fetch('/Save/'+`${name}`,{
            method : 'POST',
            body : JSON.stringify({
                ProductCount : product_Count,
                Final_Price : finalPrice
            })
        })
    }

    function onClickButton(button_data_name){
        // setting item count
        const item_count = document.querySelector('#number').innerHTML
        // applying changes
        document.querySelector(`[data-countname = "${button_data_name}"]`).innerHTML = item_count
        // get the original price
        const mainPrice = document.querySelector(`[data-initialPrice = "${button_data_name}"]`).innerHTML 
        // 
        var saved_total_price = document.querySelector(`[data-initemprice = "${button_data_name}"]`).innerHTML
        // multiplying itemcount with the original price
        saved_total_price = parseInt(item_count) * parseInt(mainPrice)
        // 
        document.querySelector(`[data-initemprice = "${button_data_name}"]`).innerHTML = saved_total_price
        // 
        var total = 0
        document.querySelectorAll('.amount').forEach(function(amount){
            total = total+parseInt(amount.innerHTML)
        })
        document.querySelector('#total').innerHTML = total
        // 
        Save(button_data_name,item_count,saved_total_price)
    }

    // increase the number a particular item is added to a cart
    document.querySelector('#add').addEventListener('click',function(){
        // get and increase the product count
        const count_of_item = document.querySelector('#number').innerHTML
        // 
        document.querySelector('#number').innerHTML = parseInt(count_of_item) + 1
        // 
        onClickButton(this.dataset.name)
    })
    
    // decrease the number a particular item is added to a cart
    document.querySelector('#subtract').addEventListener('click',function(){
        // get and decrease the product count
        const count_of_item = document.querySelector('#number').innerHTML
        // 
        document.querySelector('#number').innerHTML = parseInt(count_of_item) - 1
        // 
        onClickButton(this.dataset.name)
    })
})

