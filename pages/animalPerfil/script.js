import { getPetById, getAdoptionHistory, getUserById, updatePet } from "../../services/api/index.js"
let email
let whatsapp

const petData = await getPetById(window.location.href.split("id=")[1])


window.addEventListener("load", async () => {
    const adoptionHistory = await getAdoptionHistory(petData.pet.id)
    let person
    document.getElementById("user").style.display = "none"


    if (adoptionHistory.data[0].person_id === JSON.parse(localStorage.getItem('user')).id) {
        document.getElementById("marcarAdotado").style.display = "block"
        document.getElementById("queroAdotar").style.display = "none"
    } else {
        document.getElementById("marcarAdotado").style.display = "none"
        document.getElementById("queroAdotar").style.display = "block"
    }

    if (petData.pet.adopted) {
        document.getElementById("main-action").innerHTML = "<button class='queroAdotar' id='adotado' disabled>Adotado</button>"
    }

    if (adoptionHistory?.data?.length > 0 && adoptionHistory.data[0].person_id) {
        person = await getUserById(adoptionHistory.data[0].person_id)
        document.getElementById("user").style.display = "flex"
        document.getElementById("user").textContent = person.person.name
        person = await getUserById(adoptionHistory.data[0].person_id)
        email = person.person.email;
        whatsapp = (person.person.main_whatsapp).replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else {
        email = "N/A"
        whatsapp = "N/A"
    }


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
    document.getElementById("city").textContent = petData.pet.city
    document.getElementById("state").textContent = petData.pet.state
    document.getElementById("aboutMe").textContent = petData.pet.about
    showInfo(JSON.parse(petData.pet.temperament), document.getElementById("behaviorList"))
    showInfo(JSON.parse(petData.pet.veterinary_care), document.getElementById("cuidadosVeterinariosList"))
})



document.getElementById("queroAdotar").addEventListener("click", async function () {
    document.getElementById("email").innerText = email;
    document.getElementById("whatsapp").innerText = whatsapp;

    document.getElementsByTagName("main")[0].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    document.getElementById("blurred").style.backgroundColor = "rgba(255, 255, 255, 0.5)";

    document.getElementById("modal-contact").style.display = "flex";

})

document.getElementById("marcarAdotado").addEventListener("click", async function () {
    const formData = new FormData();
    formData.append("adopted", "true");
    await updatePet(petData.pet.id, formData)
})

document.addEventListener("click", function (event) {
    const modal = document.getElementById("modal-contact");
    const button = document.getElementById("queroAdotar");

    if (!modal.contains(event.target) && event.target !== button) {
        modal.style.display = "none";
        document.getElementsByTagName("main")[0].style.backgroundColor = "#8b95d1";
        document.getElementById("blurred").style.backgroundColor = "transparent";
    }
});