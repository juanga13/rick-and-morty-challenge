export const getCharacters = (search: string, page?: number) => {
    const url = ('https://rickandmortyapi.com/api/character') + '?page=' + (page || 1) + '&name=' + search
    return get(url)
}

export const getEpisodes = (episodes: string[]) => {
    const url = 'https://rickandmortyapi.com/api/episode/['  + episodes.join(',') + ']'
    return get(url)
}

const get = (url: string) => {
    return fetch(url, {
        method: 'GET',
    }).then((res) => {
        if (res.ok) return res.json()
        else throw new Error
    })
}