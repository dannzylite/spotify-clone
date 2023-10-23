function getArtist(artists) {
    let artistsStr = ''
    for (let i = 0; i < artists.length; i++) {
        if (i > 0) {
            artistsStr += ', '
        }
        const name = artists[i].name
        artistsStr += name
    }
    return artistsStr
}

export default getArtist