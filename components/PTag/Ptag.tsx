import {PtagProps} from "./Ptag.props";
import cn from "classnames";
import styles from './Ptag.module.css'

export const Ptag = ({children, size = 'm', ...props}: PtagProps): JSX.Element => {
    return (
        <p
            className={cn(styles.p, {
                [styles.m]: size === 'm',
                [styles.s]: size === 's',
                [styles.l]: size === 'l',
            })}
            {...props}
        >
            {children}
        </p>
    )
}