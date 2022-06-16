import { useEffect, useState } from "react"
// @ts-ignore
import MagnifyingGlass from '../assets/magnifying-glass.svg?component';

interface SearchInputProps {
    onChange: (value: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
    const [value, setValue] = useDebounceInput('', props.onChange)

    return (
        <div className="search-input">
            {/* icon here */}
            <MagnifyingGlass/>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
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