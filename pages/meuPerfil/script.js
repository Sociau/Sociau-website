import { getAdoptionHistory, getPetById } from "../../services/api/index.js";

window.document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('profile-picture').src = JSON.parse(localStorage.getItem('user')).avatar;
    document.getElementsByClassName('user-name')[0].innerText = JSON.parse(localStorage.getItem('user')).name;
    document.getElementsByClassName('user-address')[0].innerText = (JSON.parse(localStorage.getItem('address')).state).toUpperCase() + ', ' + JSON.parse(localStorage.getItem('address')).city;

    const adoptionHistory = await getAdoptionHistory();

    if (adoptionHistory.pets.length > 0) {
        document.getElementById('no-animals').style.display = 'none';
        document.getElementById("pets").innerHTML = ''

        for (let i = 0; i < adoptionHistory.pets.length; i++) {
            const pet = await getPetById(adoptionHistory.pets[i].pet_id);
            document.getElementById('pets').innerHTML += `
                <a href="./pages/perfilAnimal/index.html?id=${pet.pet.id}" class="animal">
                    <img src="${pet.pet.main_photo}" alt="">
                    <div class="text">
                        <h1>${pet.pet.name}</h1>
                    </div>
                </a>`
        }
    }
})

document.getElementById("contacts-btn").addEventListener("click", async function () {
    const email = JSON.parse(localStorage.getItem("user")).email;
    const whatsapp = (JSON.parse(localStorage.getItem("user")).main_whatsapp).replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");;

    document.getElementById("email").innerText = email;
    document.getElementById("whatsapp").innerText = whatsapp;

    document.getElementsByTagName("main")[0].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    document.getElementById("blurred").style.backgroundColor = "rgba(255, 255, 255, 0.5)";

    document.getElementById("user-data").style.opacity = "0.2";
    document.getElementById("user-animals").style.opacity = "0.2";
    document.getElementById("modal-contact").style.display = "flex";

})

document.addEventListener("click", function (event) {
    const modal = document.getElementById("modal-contact");
    const button = document.getElementById("contacts-btn");

    if (!modal.contains(event.target) && event.target !== button) {
        modal.style.display = "none";
        document.getElementById("user-data").style.opacity = "1";
        document.getElementById("user-animals").style.opacity = "1";
        document.getElementsByTagName("main")[0].style.backgroundColor = "#8b95d1";
        document.getElementById("blurred").style.backgroundColor = "transparent";
    }
});