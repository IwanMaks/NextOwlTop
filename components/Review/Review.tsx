import styles from './Review.module.css'
import {ReviewProps} from "./Review.props";
import cn from "classnames";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Rating} from "../Rating/Rating";
import UserIcon from '../../public/user.svg'

export const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {
    return (
        <div className={cn(styles.review, className)} {...props}>
            <UserIcon className={styles.user} />
            <div className={styles.title}>
                <span className={styles.userName}>{review.name}:</span>&nbsp;&nbsp;
                <span>{review.title}</span>
            </div>
            <div className={styles.date}>
                {format(new Date(review.createdAt), 'dd MMMM yyyy', {locale: ru})}
            </div>
            <div className={styles.rate}>
                <Rating rating={review.rating} />
            </div>
            <div className={styles.description}>
                {review.description}
            </div>
        </div>
    )
}