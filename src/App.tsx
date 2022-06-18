import { useEffect, useState } from "react"
import { CharactersTable } from "./CharactersTable"
import { CharactersResponse } from "./rickAndMortyTypes"
import { SearchInput } from "./SearchInput"
import { getCharacters } from "./service"
// @ts-ignore
import Logo from './assets/logo.svg?component';

export const App = () => {
    const [charactersResponse, setCharactersResponse] = useState<CharactersResponse | null>(null)
    const [currentSearch, setCurrentSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [isSucceded, setIsSucceded] = useState<boolean>(false)

    const requestCharacters = (value?: string, page?: number) => {
        setIsLoading(true)
        getCharacters(value || '', page)
            .then((res) => {
                setCharactersResponse(res)
                setIsSucceded(true)
            })
            .catch(() => setIsSucceded(false))
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        requestCharacters()
    }, [])
    
    return (
        <div className="app">
            <div className="header">
                <div className="title-container">
                    <h1>Rick and Morty characters</h1>
                </div>
                {/* icon */}
                <Logo/>
            </div>
            <SearchInput
                onChange={(value) => {
                    setCurrentSearch(value)
                    requestCharacters(value)
                }}
                requestLoading={isLoading}
                requestOk={isSucceded}
            />
            <CharactersTable
                data={charactersResponse?.results || []}
                paginationData={charactersResponse?.info}
                loading={isLoading}
                currentPage={currentPage}
                onPageChange={(newPage) => {
                    setCurrentPage(newPage)
                    requestCharacters(currentSearch, newPage)
                }}
            />
        </div>
    )
}