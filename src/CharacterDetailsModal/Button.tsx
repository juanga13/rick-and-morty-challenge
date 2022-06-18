interface ButtonProps {
    children: string
    onClick: () => void
}

export const Button = (props: ButtonProps) => {
    return (
        <button className="button" onClick={() => props.onClick()}>
            {props.children}
        </button>
    )
}