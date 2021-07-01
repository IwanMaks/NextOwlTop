import {TagProps} from "./Tag.props";
import styles from './Tag.module.css'
import cn from "classnames";

export const Tag = ({children, size = 's', color = 'ghost', href, ...props}: TagProps): JSX.Element => {
    return (
        <div
            className={cn(styles.tag, {
                [styles.m]: size === 'm',
                [styles.s]: size === 's',
                [styles.ghost]: color === 'ghost',
                [styles.primary]: color === 'primary',
                [styles.red]: color === 'red',
                [styles.gray]: color === 'gray',
                [styles.green]: color === 'green'
            })}
            {...props}
        >
            {href ? <a href={href}>{children}</a> : <>{children}</>}
        </div>
    )
}