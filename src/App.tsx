import { useEffect, useState } from "react"
import { CharactersTable } from "./CharactersTable"
import { Character, CharactersResponse } from "./rickAndMortyTypes"
import { getCharacters } from "./service"

export const App = () => {
    const [charactersResponse, setCharactersResponse] = useState<CharactersResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getCharacters()
            .then(setCharactersResponse)
            .finally(() => setIsLoading(false))
    }, [])
    
    return (
        <div className="app">
            <h1>Rick and Morty characters</h1>
            <input/>
            <CharactersTable data={charactersResponse?.results || []} loading={isLoading}/>
        </div>
    )
}