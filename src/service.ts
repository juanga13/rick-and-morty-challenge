export const getCharacters = (search: string, page?: number) => {
    const url = ('https://rickandmortyapi.com/api/character') + '?page=' + (page || '') + '&name=' + search
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