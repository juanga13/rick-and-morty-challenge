import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ReadOnlyFieldProps {
    label: string
    text: string
    link?: string
}

export const ReadOnlyField = (props: ReadOnlyFieldProps) => {
    return (
        <div className="read-only-field">
            <label>{props.label}</label>
            <div className="field">
                {props.text}
                {props.link &&
                    <a href={props.link} target='_blank'>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </a>
                }
            </div>
        </div>
    )
}