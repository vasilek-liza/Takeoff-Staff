import { PropsWithChildren } from 'react';
import './CustomButton.scss';

interface ButtonProps {
    text?: string,
    className?: string,
    onClick?: () => void,
    type?: "button" | "submit" | "reset",
    disabled?: boolean
}

export const CustomButton: React.FC<PropsWithChildren<ButtonProps>> = ({text, disabled, className, children, onClick, type}) => {
    return (
        <button 
            disabled={disabled} 
            type={type} 
            className={"button " + className}
            onClick={onClick}
        >
            {text}
            {children}
        </button> 
    );
}