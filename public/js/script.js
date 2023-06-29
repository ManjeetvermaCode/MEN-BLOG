document.addEventListener('DOMContentLoaded',function(){
    const allbuttons=this.querySelectorAll('.searcbtn')
    const searchbar=this.querySelector('.searchbar')
    const searchinput=this.getElementById('searchinput')
    const searchclose=this.getElementById('searchclose')

for(let i=0;i<allbuttons.length;i++){
    allbuttons[i].addEventListener('click',function(){
        searchbar.style.visibility='visible';
        searchbar.classList.add('open')
        this.setAttribute('aria-expanded','true')
        searchinput.focus();
    })

    searchclose.addEventListener('click',function(){
        searchbar.style.visibility='hidden';
        searchbar.classList.remove('open')
        this.setAttribute('aria-expanded','false')
    })
}



})

