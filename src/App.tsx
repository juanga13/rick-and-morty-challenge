import { useEffect, useState } from "react"
import { CharactersTable } from "./CharactersTable"
import { CharactersResponse } from "./rickAndMortyTypes"
import { SearchInput } from "./SearchInput"
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
            <div className="header">
                <div className="title-container">
                    <h1>Rick and Morty characters</h1>
                </div>
                {/* icon */}
            </div>
            <SearchInput onChange={(value) => {
                console.log('HI')
            }}/>
            <CharactersTable data={charactersResponse?.results || []} loading={isLoading}/>
        </div>
    )
}