import { CharacterRow } from ".";
import { Character, Episode } from "../rickAndMortyTypes";
import { HeaderGroup } from 'react-table'
import { EpisodeRow } from "../CharacterDetailsModal/EpisodeListTable";

export const characterToCharacterRow = (characters: Character[]): CharacterRow[] => (
    characters.map((character) => ({
        name: character.name,
        status: character.status,
        specie: character.species,
        gender: character.gender,
        episodesLink: character.episode,
        characterDetailLink: character.url,
        detailsLink: '',
    }))
)

export const episodeToEpisodeRow = (episodes: Episode[]): EpisodeRow[] => (
    episodes.map((episode) => ({
        name: episode.name,
        air_date: episode.air_date,
        episode: episode.episode,
    }))
)

export const getWidthsStyles = (headerGroup: any) => ({
    width: headerGroup.width,
    minWidth: headerGroup.minWidth,
    maxWidth: headerGroup.maxWidth,
})