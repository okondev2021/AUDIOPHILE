document.addEventListener('DOMContentLoaded',function(){
    function save(name){
        fetch('/Save/'+`${name}`,{
            method:'POST',
            body : JSON.stringify({
                ProductCount:document.querySelector('#number').innerHTML 
            })
        })
    }
    
    function count(name){
        fetch('/CostPrice/'+`${name}`,{
            method:'POST',
            body : JSON.stringify({
                FinalCount:document.querySelector(`[data-initemprice = "${name}"]`).innerHTML
            })
        })
    }
    
    // increase the number a particular item is added to a cart
        document.querySelector('#add').addEventListener('click',function(){
            // incremeant number.innerHTML
            const numb = document.querySelector('#number').innerHTML
            document.querySelector('#number').innerHTML = parseInt(numb) + 1
            // multiply count with main price
            const countName = document.querySelector('#number').innerHTML 
            document.querySelector(`[data-countname = "${this.dataset.name}"]`).innerHTML = countName
            const mainPrice = document.querySelector(`[data-initialPrice = "${this.dataset.name}"]`).innerHTML 
            document.querySelector(`[data-initemprice = "${this.dataset.name}"]`).innerHTML = parseInt(countName) * parseInt(mainPrice)
            var total = 0
            document.querySelectorAll('.amount').forEach(function(amount){
                total = total+parseInt(amount.innerHTML)
            })
            document.querySelector('#total').innerHTML = total
            save(this.dataset.name)
            count(this.dataset.name)
    
        })
    
    // decrease the number a particular item is added to a cart
        document.querySelector('#subtract').addEventListener('click',function(){
            // decrement number.innerHTML
            const numb = document.querySelector('#number').innerHTML
            document.querySelector('#number').innerHTML = parseInt(numb) - 1
            // multiply count with main price
            const countName = document.querySelector('#number').innerHTML 
            document.querySelector(`[data-countname = "${this.dataset.name}"]`).innerHTML = countName
            const mainPrice = document.querySelector(`[data-initialPrice = "${this.dataset.name}"]`).innerHTML 
            document.querySelector(`[data-initemprice = "${this.dataset.name}"]`).innerHTML = parseInt(countName) * parseInt(mainPrice)
            save(this.dataset.name)
            count(this.dataset.name)
            var total = 0
            document.querySelectorAll('.amount').forEach(function(amount){
                total = total+parseInt(amount.innerHTML)
            })
            document.querySelector('#total').innerHTML = total
        })
})

