import { useEffect, useState } from "react"
import './SearchInput.scss'
// @ts-ignore
import MagnifyingGlass from '../assets/magnifying-glass.svg?component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisH, faSpinner } from "@fortawesome/free-solid-svg-icons";

const TypingIcon = () => <FontAwesomeIcon icon={faEllipsisH} className='icon'/>
const LoadingIcon = () => <FontAwesomeIcon icon={faSpinner} spin className='icon'/>
const SuccessIcon = () => <FontAwesomeIcon icon={faCheck} className='icon'/>

interface SearchInputProps {
    onChange: (value: string) => void
    requestLoading: boolean
    requestOk: boolean | null
}

export const SearchInput = (props: SearchInputProps) => {
    const [value, setValue] = useDebounceInput('', props.onChange)

    const renderStatus = () => {
        return <LoadingIcon/>
        if (props.requestLoading) return <LoadingIcon/>
        else if (props.requestOk) return <SuccessIcon/>
        else if (props.requestOk === null) return null;
        else return <TypingIcon/>
    }

    return (
        <div className="search-input">
            {/* icon here */}
            <MagnifyingGlass/>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Search User'
            />
            <div className="icon-container">
                {renderStatus()}
            </div>
        </div>
    )
}

const useDebounceInput = (
    initialValue: string,
    callback: (value: string) => void,
    timeoutDelay = 1000
): [string, (value: string) => void] => {
    const [value, setValue] = useState(initialValue);
    const [firstTime, setFirstTime] = useState(true);
    useEffect(() => {
        if (firstTime) {
            setFirstTime(false);
            return;
        }
        const debounce = setTimeout(() => {
            callback(value);
        }, timeoutDelay);
        return () => clearTimeout(debounce);
    }, [value]);
    return [value, setValue];
};