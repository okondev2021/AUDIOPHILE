document.addEventListener('DOMContentLoaded',function(){
    if(!document.querySelector('#hidden_input').value === 'AudioAnonymous'){
        document.querySelector('#close_icon').addEventListener('click',function(){
            document.querySelector('.error_msg').style.display = 'none'
        })
    }
})