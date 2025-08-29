const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
const pets = await petPromise.json()

const templete = document.querySelector("#aniCard")
const wraper = document.createElement("div")

function decideAgeText(age){
    if (!age){
        return "less than a year old"
    }

    return age > 1 ? `${age} years old` : "1 year old"
}

pets.forEach(pet =>{
    const clone = templete.content.cloneNode(true)
    clone.querySelector("h2").textContent = pet.name
    clone.querySelector("p").textContent = pet.description
    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `a ${pet.species} named ${pet.name}`
    const age = new Date().getFullYear() - pet.birthYear
    clone.querySelector(".species").textContent = pet.species
    const ageText = decideAgeText(age)
    clone.querySelector(".age").textContent = ageText
    clone.querySelector('.namehol').textContent = pet.name
    clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}`

    wraper.appendChild(clone)

})

document.querySelector(".animals").appendChild(wraper)

const filterbtn = document.querySelectorAll(".filter-nav a")
filterbtn.forEach(el => {
    el.addEventListener("click", e => handleClick(e))
})

function handleClick(e){
    let target = e.target
    
    if (e.target.classList.contains("bigshow")){
        target = e.target.closest("a")
    }

    e.preventDefault()
    filterbtn.forEach(el =>{
        el.classList.remove("active")
    })
    target.classList.add("active")

    filterPets(target.dataset.filter)
}


function filterPets(species){
    const allpets = document.querySelectorAll(".animal-card")
    if (species == "all"){
        allpets.forEach(el =>{
            el.style.display = ""
        })
    }else {
        allpets.forEach(el => {
            if (el.querySelector(".species").textContent == species){
                el.style.display = ""
            }else {
                el.style.display = "none"
            }
        })
    }
}