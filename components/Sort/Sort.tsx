import {SortEnum, SortProps} from "./Sort.props";
import styles from './Sort.module.css'
import cn from "classnames";

export const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {
    return (
        <div className={cn(styles.sort, className)} {...props}>
            <div style={{display: 'none'}} id='sort'>Сортировка</div>
            <button
                id='rate'
                onClick={() => setSort(SortEnum.Rating)}
                className={cn({
                    [styles.active]: sort === SortEnum.Rating
                })}
                aria-selected={sort === SortEnum.Rating}
                aria-labelledby="sort rate"
            >
                <svg className={styles.sortIcon} width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="3" rx="1.5" fill="#7653FC"/>
                    <rect y="5" width="14" height="3" rx="1.5" fill="#7653FC"/>
                    <rect y="10" width="8" height="3" rx="1.5" fill="#7653FC"/>
                </svg>
                По рейтингу
            </button>

            <button
                id='price'
                onClick={() => setSort(SortEnum.Price)}
                className={cn({
                    [styles.active]: sort === SortEnum.Price
                })}
                aria-selected={sort === SortEnum.Price}
                aria-labelledby="sort price"
            >
                <svg className={styles.sortIcon} width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="3" rx="1.5" fill="#7653FC"/>
                    <rect y="5" width="14" height="3" rx="1.5" fill="#7653FC"/>
                    <rect y="10" width="8" height="3" rx="1.5" fill="#7653FC"/>
                </svg>
                По цене
            </button>
        </div>
    )
}