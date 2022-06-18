import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { Character, Episode } from '../rickAndMortyTypes';
import { getEpisodes } from '../service';
import { Avatar } from './Avatar';
import { Button } from './Button';
import './CharacterDetailsModal.scss';
import { EpisodeListTable } from './EpisodeListTable';
import { ReadOnlyField } from './ReadOnlyField';

enum CHARACTER_FIELD_LABEL {
    created = 'Created',
    episode = 'Episodes',
    gender = 'Gender',
    location = 'Location',
    name = 'Name',
    origin = 'Origin',
    species = 'Species',
    status = 'Code',
    type = 'Type',
} 

interface CharacterDetailsModalProps {
    selectedCharacter: Character | null
    onClose: () => void
    children?: ReactNode
    className?: string
}

export const CharacterDetailsModal = (props: CharacterDetailsModalProps) => {
    const [episodesResponse, setEpisodeResponse] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    
    const requestEpisodes = (value?: string, page?: number) => {
        if (!props.selectedCharacter) return;
        const episodeNumbers: string[] = props.selectedCharacter.episode.map((e) => e.replace('https://rickandmortyapi.com/api/episode/', ''))
        setIsLoading(true)
        getEpisodes(episodeNumbers)
            .then((res) => {
                setEpisodeResponse(res)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        requestEpisodes()
    }, [props.selectedCharacter])

    const className = 'character-details-modal' + (props.className ? ` ${props.className}` : '')

    const handleModalClick = (e: MouseEvent<HTMLDivElement> ) => {
        e.stopPropagation()
    }

    if (!props.selectedCharacter) return null;
    return (
        <div className='character-details-modal-container' onClick={() => props.onClose()}>
            <div className={className} onClick={handleModalClick}>
                <Avatar src={props.selectedCharacter.image}/>
                <div className='read-only-fields-container'>
                    <ReadOnlyField label={CHARACTER_FIELD_LABEL['name']} text={props.selectedCharacter.name}/>
                    <ReadOnlyField label={CHARACTER_FIELD_LABEL['status']} text={props.selectedCharacter.status}/>
                    <ReadOnlyField label={CHARACTER_FIELD_LABEL['species']} text={props.selectedCharacter.species}/>
                    {props.selectedCharacter.type !== '' &&
                        <ReadOnlyField label={CHARACTER_FIELD_LABEL['type']} text={props.selectedCharacter.type}/>
                    }
                    <ReadOnlyField label={CHARACTER_FIELD_LABEL['gender']} text={props.selectedCharacter.gender}/>
                    <ReadOnlyField label={CHARACTER_FIELD_LABEL['origin']} text={props.selectedCharacter.origin.name}/>
                    <ReadOnlyField label={CHARACTER_FIELD_LABEL['location']} text={props.selectedCharacter.location.name}/>
                    {/* <ReadOnlyField label={CHARACTER_FIELD_LABEL['created']} text={new Date(props.selectedCharacter.created).toLocaleDateString()}/> */}
                </div>
                <EpisodeListTable
                    data={episodesResponse}
                    loading={isLoading}
                />
                <div className='footer'>
                    <Button onClick={() => props.onClose()}>Close</Button>
                </div>
            </div>
        </div>
    )
}