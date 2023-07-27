import { Icon } from "../Icon/Icon"


type CircleButtonProps = {
    iconName: string,
    alt: string,
    onClick: () => void
}

export const CircleButton = ({iconName, alt, onClick}: CircleButtonProps) => {
    return (
        <div className="circleButton" onClick={onClick}>
            <Icon iconName={iconName} alt={alt} />
        </div>
    )
}