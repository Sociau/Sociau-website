const config = {
    "baseUrl": "https://www.geonames.org/childrenJSON?geonameId=",
    "Brasil": "3469034",
}

const getStates = async (id) => {
    try {
        const response = await fetch(`${config.baseUrl}${config.Brasil}`, {
            method: 'GET',
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const getCities = async (id) => {
    try {
        const response = await fetch(`${config.baseUrl}${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export { getStates, getCities }