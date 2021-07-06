import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {UpIcon} from "../Icons/UpIcon/UpIcon";
import {CloseIcon} from "../Icons/CloseIcon/CloseIcon";
import {BurgerIcon} from "../Icons/BurgerIcon/BurgerIcon";

export const icons = {
    UpIcon,
    CloseIcon,
    BurgerIcon
}

export type IconName = keyof typeof icons

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    icon: IconName;
    appearance: 'primary' | 'white'
}