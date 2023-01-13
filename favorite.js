
let faivorit = JSON.parse(localStorage.getItem("faivorit")) || [];
const pokedex_cards = document.getElementById('pokedex_favorite_grid')
const faivoritPageButton = document.getElementById('Favorites')
const HomePageButton = document.getElementById('Home')
const pokemon_type_color ={
    normal:   '#A8A77A',
	fire:   '#EE8130',
	water:   '#6390F0',
	electric:   '#F7D02C',
	grass:   '#7AC74C',
	ice:   '#96D9D6',
	fighting:   '#C22E28',
	poison:   '#A33EA1',
	ground:   '#E2BF65',
	flying:   '#A98FF3',
	psychic:   '#F95587',
	bug:   '#A6B91A',
	rock:   '#B6A136',
	ghost:   '#735797',
	dragon:   '#6F35FC',
	dark:   '#705746',
	steel:   '#B7B7CE',
	fairy:   '#D685AD',
    
}
window.onload = function(){
    randerList()
    HomePageButton.classList.add('marked')
    faivoritPageButton.classList.remove('marked')
}
HomePageButton.addEventListener('click',function(){
    window.location.href = "../index.html";

})
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


export function basic_card(pokedex){
    let card = document.createElement('div')
    card.style.width = '282px'
    card.style.height = '100%'
    card.style.justifyContent = "start";
    card.style.flexDirection = 'column' ;
    //id top left
    let id_text = document.createElement('p')
    id_text.classList.add('count_text')
    id_text.innerText = id_text_generator(pokedex.id)
    
    let imag_div = document.createElement('div')
    imag_div.classList.add('card_imeg_and_name')

        let img = document.createElement('img')
        img.classList.add('card_imeg')
        img.src = pokedex.image.hires

        let pictur_text = document.createElement('p')
        pictur_text.classList.add('card_name')
        pictur_text.innerText = pokedex.name.english
        
        imag_div.appendChild(img)
        imag_div.appendChild(pictur_text)
        
        card.appendChild(id_text)
        card.appendChild(imag_div)
        
        return card
    }
    
export function id_text_generator(id){
        if (id > 100){
            return `#${id}`
        }
        if(id > 10){
            return `#0${id}`
        }
        return `#00${id}`
}
    
    
function more_info_modal(pokedex){
        
        let background_more_info = document.createElement('div')
        let more_info_card = document.createElement('div')
        more_info_card.classList.add('more_info_card')
        window.addEventListener('click',function(event){
            event.preventDefault()
        if (event.target == background_more_info) {
            background_more_info.remove()
        }
    })
    background_more_info.classList.add('background_more_info')
    
    //left side of expended card 
    let card = basic_card(pokedex)
    card.style.width = '282px'
    // card.style.justifyContent ='space-between'
    let types =  pokedex_typs(pokedex)
    types.classList.add('types')
    card.appendChild(types)
    more_info_card.appendChild(card)
    //devider
    let hr = document.createElement('hr')
    more_info_card.appendChild(hr)
    //description and stats
    let info_div = document.createElement('div')
    info_div.classList.add('info_div')
    //description
    let description_div = document.createElement('div')
    description_div.style.flexDirection = 'column'
    let description_h2 = document.createElement('h2')
    description_h2.classList.add('description')
    let description_p = document.createElement('p')
    // description_p.style.width = '500px'
    description_h2.innerText = 'Description'
    description_p.innerText = pokedex.description
    description_div.appendChild(description_h2)
    description_div.appendChild(description_p)
    info_div.appendChild(description_div)
    //stats
    let stats_div = document.createElement('div')
    stats_div.classList.add('stats_div')

    //head line stats
    let stats_h2 = document.createElement('h2')
    stats_h2.classList.add('description')
    stats_h2.innerText = 'Stats'
    stats_div.appendChild(stats_h2)
    //stats list
    let stats_grid = document.createElement('div')
    stats_grid.classList.add('stats_gride')
    let stats_hp_def = document.createElement('div')
    let stats_speicel = document.createElement('div')
    let total_stat = document.createElement('div')
    let total_num = 0
    for(let p in pokedex.base){
        total_num += pokedex.base[p]
    }
    stats_hp_def.innerHTML = `HP: ${pokedex.base.HP}<br> Attack: ${pokedex.base.Attack}<br> Defense: ${pokedex.base.Defense}`
    stats_grid.appendChild(stats_hp_def)
    stats_speicel.innerHTML = `Special Atk: ${pokedex.base['Sp. Attack']}<br>  Special Def: ${pokedex.base['Sp. Defense']}<br>  Speed: ${pokedex.base['Speed']}`
    stats_grid.appendChild(stats_hp_def)
    total_stat.innerHTML = `Total: ${total_num}`
    stats_grid.appendChild(stats_hp_def)
    stats_grid.appendChild(stats_speicel)
    stats_grid.appendChild(total_stat)
    stats_div.appendChild(stats_grid)
    info_div.appendChild(stats_div)
    //like_button
    more_info_card.appendChild(isLiked(pokedex))
    more_info_card.appendChild(info_div)
    
    background_more_info.appendChild(more_info_card)
    document.body.appendChild(background_more_info)
}

function pokedex_typs(pokedex){
    let pokedex_typs = document.createElement('div')
    for(let Ptype in pokedex.type){
        let t = pokedex.type[Ptype]
        let type_dev = document.createElement('div')
        type_dev.classList.add('type_dev')
        type_dev.style.backgroundColor = pokemon_type_color[`${t.toLowerCase()}`]
        type_dev.innerText = pokedex.type[Ptype]
        pokedex_typs.appendChild(type_dev)
    }
    return pokedex_typs
    
}

function isLiked(pokedex) {
    let hart = document.createElement('img')
    hart.classList.add('like_box')
    let isLiked = false
    if(faivorit.findIndex((obj) => obj.id === pokedex.id) != -1){
        isLiked = true
        hart.src = '/imags/like.png'
    }
    else{
        isLiked = false
        hart.src = '/imags/noLike.png'
    }
    hart.addEventListener('mouseover',function(){
        hart.src = '/imags/hover.png'
    })
    hart.addEventListener('mouseleave',function(){
        isLiked?
        hart.src = '/imags/like.png':
        hart.src = '/imags/noLike.png'
    })
    hart.addEventListener('click',function(){
        isLiked = !isLiked
        if(isLiked){
            faivorit.push(pokedex)
            localStorage.setItem('faivorit',JSON.stringify(faivorit))
            hart.src = '/imags/like.png'
        }
        else{
            const faivoritToRemove = faivorit.findIndex((obj) => obj.id === pokedex.id)
            faivorit.splice(faivoritToRemove, 1,)
            localStorage.setItem('faivorit',JSON.stringify(faivorit))
            hart.src = '/imags/noLike.png'
        }
        randerList()
    })
    return hart
}

function deleteFaivorit(pokedex){
    const faivoritToRemove = faivorit.findIndex((obj) => obj.id === pokedex.id)
    faivorit.splice(faivoritToRemove, 1,)
    localStorage.setItem('faivorit',JSON.stringify(faivorit))
    randerList()
}
// randerList()