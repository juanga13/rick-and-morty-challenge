import { CharacterRow } from "./CharactersTable";
import { Character } from "./rickAndMortyTypes";

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