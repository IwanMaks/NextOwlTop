import styles from './Review.module.css'
import {ReviewProps} from "./Review.props";
import cn from "classnames";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Rating} from "../Rating/Rating";

export const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {
    return (
        <div className={cn(styles.review, className)} {...props}>
            <svg className={styles.user} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.72902 0 0 6.72902 0 15C0 23.271 6.72902 30 15 30C23.271 30 30 23.271 30 15C30 6.72902 23.271 0 15 0ZM15 27.6253C8.03824 27.6253 2.37469 21.9613 2.37469 15C2.37469 8.03865 8.03824 2.37469 15 2.37469C21.9613 2.37469 27.6253 8.03906 27.6253 15.0004C27.6253 21.9618 21.9613 27.6253 15 27.6253Z" fill="#7653FC"/>
                <path d="M15 17.6616C10.7814 17.6616 6.83433 19.777 3.88654 23.6177L5.77044 25.0631C8.25868 21.8217 11.5365 20.0363 15 20.0363C18.4635 20.0363 21.7413 21.8217 24.2292 25.0631L26.1131 23.6177C23.1653 19.777 19.2186 17.6616 15 17.6616Z" fill="#7653FC"/>
                <path d="M15 5.38257C11.5955 5.38257 8.82587 8.17005 8.82587 11.5963C8.82587 15.0225 11.5955 17.81 15 17.81C18.4045 17.81 21.1741 15.0225 21.1741 11.5963C21.1741 8.17011 18.4045 5.38257 15 5.38257ZM15 15.4353C12.9052 15.4353 11.2006 13.7133 11.2006 11.5963C11.2006 9.47921 12.9052 7.7572 15 7.7572C17.0949 7.7572 18.7995 9.47962 18.7995 11.5963C18.7995 13.7129 17.0949 15.4353 15 15.4353Z" fill="#7653FC"/>
            </svg>
            <div className={styles.title}>
                <span className={styles.userName}>{review.name}:</span>&nbsp;&nbsp;
                <span>{review.title}:</span>
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