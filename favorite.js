import {basic_card} from './main.js'

let faivorit = JSON.parse(localStorage.getItem("faivorit")) || [];
const pokedex_cards = document.getElementById('pokedex_favorite_grid')
const faivoritPageButton = document.getElementById('Favorites')
const HomePageButton = document.getElementById('Home')

window.onload = function(){
    randerList()
    HomePageButton.classList.add('marked')
    faivoritPageButton.classList.remove('marked')
}
if(window.location.pathname === '/html/favorites.html') {
    HomePageButton.addEventListener('click',function(){
        window.location.href = "../index.html";
    
    })
}
function randerList(){
    pokedex_cards.innerHTML = ''
    for( let i = 0 ; i < faivorit.length; i++){
        const cardData = faivorit[i]
        let card = basic_card(cardData)
        card.classList.add('card')
        
        let delete_poxemon = document.createElement('p')
        delete_poxemon.classList.add('delete_poxemon')
        delete_poxemon.innerHTML = '&#10006'
        delete_poxemon.style.zIndex = 3
        delete_poxemon.addEventListener('click', function(){
            deleteFaivorit(cardData)
        })
        card.appendChild(delete_poxemon)
        card.addEventListener('click',function(){
            if(faivorit.findIndex((obj) => obj.id === cardData.id) != -1){
                more_info_modal(cardData)
            }
        })
        pokedex_cards.appendChild(card)
        
        
    }
}
