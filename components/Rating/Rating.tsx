import {RatingProps} from "./Rating.props";
import styles from './Rating.module.css'
import Star from '../../public/star.svg'
import {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from "react";
import cn from "classnames";

export const Rating = forwardRef(({ error, isEditable = false, rating, setRating, tabIndex, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArr, setRatingArr] = useState<JSX.Element[]>(new Array(5).fill(<></>))
    const rateArrRef = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        constructRating(rating)
    }, [rating, tabIndex])

    const computeFocus = (r: number, i: number): number => {
        if (!isEditable) {
            return  -1
        }
        if (!rating && i === 0) {
            return tabIndex ?? 0
        }
        if (r === i + 1) {
            return tabIndex ?? 0
        }
        return -1
    }

    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return
        }
        constructRating(i)
    }

    const onClick = (i: number) => {
        if (!isEditable || !setRating) {
            return
        }
        setRating(i)
    }

    const handleKey = (e: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return
        }
        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            if (!rating) {
                setRating(1)
            } else {
                e.preventDefault()
                setRating(rating < 5 ? rating + 1 : 5)
            }
            rateArrRef.current[rating]?.focus()
        }

        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault()
            setRating(rating > 1 ? rating - 1 : 1)
            rateArrRef.current[rating - 2]?.focus()
        }
    }

    const constructRating = (curr: number) => {
        const updatedArr = ratingArr.map((r: JSX.Element, i: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: i < curr,
                        [styles.edit]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={r => rateArrRef.current?.push(r)}
                    role={isEditable ? 'slider' : ''}
                    aria-invalid={!!error}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-label={isEditable ? 'Укажите рейтинг стрелками вверх и вниз' : 'Рейтинг ' + rating}
                    aria-valuemin={1}
                >
                    <Star />
                </span>
            )
        })

        setRatingArr(updatedArr)
    }

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArr.map((r, i) => (<span key={i}>{r}</span>))}
            {error && <span role='alert' className={styles.message}>{error.message}</span>}
        </div>
    )
})