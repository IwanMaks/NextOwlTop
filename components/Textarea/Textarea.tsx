import {TextareaProps} from "./Textarea.props";
import cn from "classnames";
import styles from './Textarea.module.css'
import {ForwardedRef, forwardRef} from "react";

export const Textarea = forwardRef(({error, className, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(styles.inputWrapper, className)}>
            <textarea
                className={cn(styles.input, {
                    [styles.error]: error
                })}
                ref={ref}
                {...props}
            />
            {error && <span className={styles.message}>{error.message}</span>}
        </div>
    )
})