import { getPets } from '../services/api/index.js'
import { getCities, getStates } from "../services/api/citiesApi.js"

const petsList = async () => {
    const states = await getStates()
    const pets = await getPets() || { pets: [] }

    const state = document.getElementById('state')
    const species = document.getElementById('species')

    state.innerHTML += await states.geonames.map(state => {
        return `<option value="${state.adminCodes1["ISO3166_2"]}:${state.geonameId}">${state.toponymName}</option>`
    })

    const uniqueSpecies = new Set();
    species.innerHTML += await pets.pets.map(pet => {
        const speciesName = pet.pet.species
        if (!uniqueSpecies.has(speciesName)) {
            uniqueSpecies.add(speciesName)
            return `<option value="${speciesName}">${speciesName}</option>`
        }
        return ''
    })


    await pets.pets.map(petData => {
        const pet = petData.pet
        const petPhoto = pet.main_photo || ''
        document.getElementById('pets').innerHTML += `
            <a href="./pages/animalPerfil/index.html?id=${pet.id}" class="animal${pet.adopted ? ' adotado' : ''}">
                <img src="${petPhoto}" alt="">
                <div class="text">
                    <h1>${pet.name}</h1>
                    <p>${pet.city}</p>
                </div>
                ${pet.adopted ? '<div class="adotadoText"><p>Adotado</p></div>' : ''}
            </a>`
    })
}
const filterPets = async () => {
    let filter = {}
    const state = (document.getElementById("state").value).split(":")[0]
    const city = document.getElementById('city').value
    const species = document.getElementById('species').value
    const gender = document.getElementById('gender').value
    const size = document.getElementById('size').value
    const search = document.getElementById("search").value

    if (state != "default") {
        filter["state"] = state
    } else {
        delete filter["state"]
    }
    if (city != "default") {
        filter["city"] = city
    } else {
        delete filter["city"]
    }
    if (species != "default") {
        filter["species"] = species
    } else {
        delete filter["species"]
    }
    if (gender != "default") {
        filter["gender"] = gender
    } else {
        delete filter["gender"]
    }
    if (size != "default") {
        filter["size"] = size
    } else {
        delete filter["size"]
    }
    if (search) {
        filter["name"] = search
    }

    const queryString = new URLSearchParams(filter).toString();
    const pets = await getPets(queryString) || { pets: [] }

    document.getElementById("pets").innerHTML = ''

    if (pets.pets.length > 0) {
        await pets.pets.map(petData => {
            const pet = petData.pet
            const petPhoto = pet.main_photo || ''
            document.getElementById('pets').innerHTML += `
                <a href="./pages/animalPerfil/index.html?id=${pet.id}" class="animal${pet.adopted ? ' adotado' : ''}">
                    <img src="${petPhoto}" alt="">
                    <div class="text">
                        <h1>${pet.name}</h1>
                        <p>${pet.city}</p>
                    </div>
                    ${pet.adopted ? '<div class="adotadoText"><p>Adotado</p></div>' : ''}
                </a>`
        })
    }
}

document.getElementById("state").addEventListener("change", async () => {
    const cityInput = document.getElementById("city")

    const cities = await getCities((document.getElementById("state").value).split(":")[1])

    cityInput.innerHTML = `<option value="default">Cidade</option>`

    cityInput.innerHTML += await cities.geonames.map(city => {
        return `<option value="${city.toponymName}">${city.toponymName}</option>`
    })

    cityInput.disabled = false
})

window.addEventListener("load", async () => {
    document.getElementById("city").disabled = true
    await petsList()
    document.getElementById('state').addEventListener('change', filterPets)
    document.getElementById('city').addEventListener("change", filterPets)
    document.getElementById('species').addEventListener("change", filterPets)
    document.getElementById('gender').addEventListener("change", filterPets)
    document.getElementById('size').addEventListener("change", filterPets)
    document.getElementById('search-btn').addEventListener("click", filterPets)
})