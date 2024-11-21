import { addNewPet } from "../../services/api/index.js"

let selectedVetCare = []
let selectedTemp = []


const checkExists = (includes, id) => {
    let exists = selectedVetCare.includes(includes)

    if (exists) {
        selectedVetCare.splice(selectedVetCare.indexOf(includes), 1)
        document.getElementById(id).style.backgroundColor = "#D9D9D9"
        document.getElementById(id).style.color = "black"
    } else {
        selectedVetCare.push(includes)
        document.getElementById(id).style.backgroundColor = "#7100CA"
        document.getElementById(id).style.color = "white"
    }
}

const vetCareOptions = (option) => {
    switch (option) {
        case "castrado":
            checkExists("Castrado", "castrado")
            break
        case "vacinado":
            checkExists("Vacinado", "vacinado")
            break
        case "vermifugado":
            checkExists("Vermifugado", "vermifugado")
            break
        case "especial":
            checkExists("Precisa de cuidados especiais", "especial")
            break
    }
}

const checkExistsTemp = (includes, id) => {
    let exists = selectedTemp.includes(includes)

    if (exists) {
        selectedTemp.splice(selectedTemp.indexOf(includes), 1)
        document.getElementById(id).style.backgroundColor = "#D9D9D9"
        document.getElementById(id).style.color = "black"
    } else {
        selectedTemp.push(includes)
        document.getElementById(id).style.backgroundColor = "#7100CA"
        document.getElementById(id).style.color = "white"
    }
}

const tempOptions = (option) => {
    switch (option) {
        case "docil":
            checkExistsTemp("Dócil", "docil")
            break
        case "agressivo":
            checkExistsTemp("Agressivo", "agressivo")
            break
        case "calmo":
            checkExistsTemp("Calmo", "calmo")
            break
        case "brincalhao":
            checkExistsTemp("Brincalhão", "brincalhao")
            break
        case "sociavel":
            checkExistsTemp("Sociável", "sociavel")
            break
    }
}

window.addEventListener('load', () => {
    document.getElementById('castrado').addEventListener('click', () => vetCareOptions("castrado"))
    document.getElementById('vacinado').addEventListener('click', () => vetCareOptions("vacinado"))
    document.getElementById('vermifugado').addEventListener('click', () => vetCareOptions("vermifugado"))
    document.getElementById('especial').addEventListener('click', () => vetCareOptions("especial"))

    document.getElementById('docil').addEventListener('click', () => tempOptions("docil"))
    document.getElementById('agressivo').addEventListener('click', () => tempOptions("agressivo"))
    document.getElementById('calmo').addEventListener('click', () => tempOptions("calmo"))
    document.getElementById('brincalhao').addEventListener('click', () => tempOptions("brincalhao"))
    document.getElementById('sociavel').addEventListener('click', () => tempOptions("sociavel"))

    const form = document.querySelector('.adoption-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const sexo = document.getElementById('sexo').value;
        const idade = document.getElementById('idade').value;
        const porte = document.getElementById('porte').value;
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;
        const raca = document.getElementById('raca').value;
        const descricao = document.getElementById('descricao').value;
        const foto = document.getElementById('foto').files[0];

        const data = {
            name: nome,
            species: especie,
            gender: sexo,
            breed: raca,
            age: idade,
            size: porte,
            state: estado,
            city: cidade,
            description: descricao,
            photo: foto,
            vet_care: selectedVetCare,
            temperament: selectedTemp
        }

        await addNewPet(data);

        setTimeout(() => {
            window.location.href = "../../index.html";
        }, 1000);
    })
})