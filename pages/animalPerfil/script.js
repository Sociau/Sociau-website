window.addEventListener("load", () => {
    const showInfo = (obj, target, element = "p") => {
        for (const key in obj) {
            target.innerHTML += `<${element}>${obj[key]}</${element}>`
        }
    }
    const data = {
        name: "Mestre Karinho",
        apresentation: ["Felino", "Macho", "Adulto", "Porto Médio"],
        aboutMe: "Texto que o usuário colocará sobre o animal",
        address: { city: "Santa luzia", state: "PB" },
        user: "Alphinha",
        comportamento: ["Dócil", "Independente", "Carente"],
        meDouBem: ["Casa", "Apartamento", "Gatos", "Cachorros", "Crianças"],
        cuidadosVet: ["Castrado", "Vacinado", "Vermifurgado"]
    }
    document.getElementById("catName").textContent = data.name
    showInfo(data.apresentation, document.getElementById("labels"))
    document.getElementById("aboutMe").textContent = data.aboutMe
    document.getElementById("city").textContent = data.address.city
    document.getElementById("state").textContent = data.address.state
    document.getElementById("user").textContent = data.user
    showInfo(data.comportamento, document.getElementById("behaviorList"))
    showInfo(data.meDouBem, document.getElementById("meDouBemList"))
    showInfo(data.cuidadosVet, document.getElementById("cuidadosVeterinariosList"))
})

