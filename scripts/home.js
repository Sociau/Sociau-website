import { getPets } from '../services/api/index.js'

const petsList = async () => {
    const pets = await getPets() || { pets: [] }

    const state = document.getElementById('state')
    const city = document.getElementById('city')
    const species = document.getElementById('species')
    const gender = document.getElementById('gender')
    const size = document.getElementById('size')

    const uniqueStates = new Set();
    state.innerHTML += await pets.pets.map(pet => {
        const stateName = pet.address.state
        if (!uniqueStates.has(stateName)) {
            uniqueStates.add(stateName)
            return `<option value="${stateName}">${(stateName).toUpperCase()}</option>`
        }
        return ''
    })

    const uniqueCities = new Set();
    city.innerHTML += await pets.pets.map(pet => {
        const cityName = pet.address.city
        if (!uniqueCities.has(cityName)) {
            uniqueCities.add(cityName)
            return `<option value="${cityName}">${(cityName).toUpperCase()}</option>`
        }
        return ''
    })

    const uniqueSpecies = new Set();
    species.innerHTML += await pets.pets.map(pet => {
        const speciesName = pet.species
        if (!uniqueSpecies.has(speciesName)) {
            uniqueSpecies.add(speciesName)
            return `<option value="${speciesName}">${(speciesName).toUpperCase()}</option>`
        }
        return ''
    })


    const uniqueGenders = new Set();
    gender.innerHTML += await pets.pets.map(pet => {
        const genderName = pet.gender
        if (!uniqueGenders.has(genderName)) {
            uniqueGenders.add(genderName)
            return `<option value="${genderName}">${(genderName).toUpperCase()}</option>`
        }
        return ''
    })


    const uniqueSizes = new Set();
    size.innerHTML += await pets.pets.map(pet => {
        const sizeName = pet.size
        if (!uniqueSizes.has(sizeName)) {
            uniqueSizes.add(sizeName)
            return `<option value="${sizeName}">${(sizeName).toUpperCase()}</option>`
        }
        return ''
    })


    await pets.pets.forEach(pet => {
        document.getElementById('pets').innerHTML += `
            <a href="./pages/perfilAnimal/index.html?id=${pet.id}" class="animal">
                <img src="${pet.main_photo}" alt="">
                <div class="text">
                    <h1>${pet.name}</h1>
                    <p>${pet.address.city}</p>
                </div>
            </a>`
    })
}
petsList()
const filterPets = async () => {
    let filter = {}
    const state = document.getElementById('state').value
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
        await pets.pets.forEach(pet => {
            document.getElementById('pets').innerHTML += `
                <a href="./pages/perfilAnimal/index.html?id=${pet.id}" class="animal">
                    <img src="${pet.main_photo}" alt="">
                    <div class="text">
                        <h1>${pet.name}</h1>
                        <p>${pet.address.city}</p>
                    </div>
                </a>`
        })
    }
}

document.getElementById('state').addEventListener('change', filterPets)
document.getElementById('city').addEventListener("change", filterPets)
document.getElementById('species').addEventListener("change", filterPets)
document.getElementById('gender').addEventListener("change", filterPets)
document.getElementById('size').addEventListener("change", filterPets)
document.getElementById('search-btn').addEventListener("click", filterPets)

const translateValue = (value) => (value).toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')