export const loadHome = async () => {
    const response = await fetch("https://v1.nocodeapi.com/dannzy/spotify/zPUyedlrPGjpPaxn/browse/categories?perPage=5")
    const data = await response.json()
    const loadedData = []
    const items = data.categories.items
    for (const key in items) {
        loadedData.push({
            id: items[key].id,
            name: items[key].name
        })
    }
    // console.log(loadedData)
    return loadedData
}

export const loadAllData = async (reqData) => {
    for (const data in reqData) {
        console.log(data)
    }
    // const response = await fetch("https://v1.nocodeapi.com/dannzy/spotify/zPUyedlrPGjpPaxn/browse/categoryPlaylist?category_id=0JQ5DAqbMKFCbimwdOYlsl")
}


export const loadPlaylist = async (id) => {
    // const response = await fetch(`https://v1.nocodeapi.com/ghost0fuchiha_/spotify/hlNbfhgIUiIRuLJC/playlists?id=${id}`)
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    })
    const data = await response.json()
    const items = data['tracks'].items
    const cover = data['images'][0].url
    const description = data['description']
    const likes = data['followers'].total
    const name = data['name']
    const total = items.length
    const color = data['primary_color']
    console.log(data,99)
    return {
        items,
        cover,
        description,
        likes,
        name,
        total,
        color
    }
}

