import { CharacterRow } from ".";
import { Character } from "../rickAndMortyTypes";
import { HeaderGroup } from 'react-table'

export const characterToCharacterRow = (characters: Character[]): CharacterRow[] => (
    characters.map((character) => ({
        name: character.name,
        status: character.status,
        specie: character.species,
        gender: character.gender,
        episodesLink: character.episode,
        characterDetailLink: character.url,
    }))
)

export const getWidthsStyles = (headerGroup: any) => ({
    width: headerGroup.width,
    minWidth: headerGroup.minWidth,
    maxWidth: headerGroup.maxWidth,
})