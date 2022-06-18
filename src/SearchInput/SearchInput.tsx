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
    requestOk: boolean
}

export const SearchInput = (props: SearchInputProps) => {
    const [value, setValue] = useDebounceInput('', (value) => {
        props.onChange(value)
        setTyping(false)
    })
    const [typing, setTyping] = useState(false)

    const renderStatus = () => {
        if (typing) return <TypingIcon/>
        if (props.requestLoading) return <LoadingIcon/>
        else if (props.requestOk) return <SuccessIcon/>
        else return null;
    }

    return (
        <div className="search-input">
            {/* icon here */}
            <MagnifyingGlass/>
            <input
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    setTyping(true)
                }}
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