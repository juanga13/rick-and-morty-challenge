import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const LoadingIcon = () => (
    <div className='spinner-container'>
        <FontAwesomeIcon icon={faSpinner} spin className='icon'/>
    </div>
)

interface AvatarProps {
    src: string
}

export const Avatar = (props: AvatarProps) => {
    const [loading, setLoading] = useState(true); 
    console.log(loading)
    return (
        <div className={"avatar" + (loading ? ' loading' : '')}>
            <LoadingIcon/>
            <img
                src={props.src}
                alt=''
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}