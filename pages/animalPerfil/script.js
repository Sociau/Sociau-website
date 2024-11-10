import { getPetById, getAdoptionHistory, getUserById } from "../../services/api/index.js"

window.addEventListener("load", async () => {

    const petData = await getPetById(window.location.href.split("id=")[1])
    const adoptionHistory = await getAdoptionHistory(petData.pet.id)
    const person = await getUserById(adoptionHistory.data[0].person_id)

    const showInfo = (obj, target, element = "p") => {
        for (const key in obj) {
            target.innerHTML += `<${element}>${obj[key]}</${element}>`
        }
    }
    document.getElementById("animalImg").src = petData.pet.main_photo
    document.getElementById("catName").textContent = petData.pet.name
    document.getElementById("breed").textContent = petData.pet.breed
    document.getElementById("age").textContent = petData.pet.age

    if (petData.pet.size === "M") {
        document.getElementById("size").textContent = "Porte Médio"
    } else if (petData.pet.size === "G") {
        document.getElementById("size").textContent = "Porte Grande"
    } else {
        document.getElementById("size").textContent = "Porte Pequeno"
    }

    document.getElementById("gender").textContent = petData.pet.gender === "M" ? "Macho" : "Femea"
    document.getElementById("city").textContent = petData.pet.address.city
    document.getElementById("state").textContent = petData.pet.address.state.toUpperCase()
    document.getElementById("user").textContent = person.person.name
})

