import {InputProps} from "./Input.props";
import cn from "classnames";
import styles from './Input.module.css'
import {ForwardedRef, forwardRef} from "react";

export const Input = forwardRef(({error, className, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={cn(styles.inputWrapper, className)}>
            <input
                className={cn(styles.input, {
                    [styles.error]: error
                })}
                ref={ref}
                {...props}
            />
            {error && <span role='alert' className={styles.message}>{error.message}</span>}
        </div>

    )
})