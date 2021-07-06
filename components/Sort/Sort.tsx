import {SortEnum, SortProps} from "./Sort.props";
import styles from './Sort.module.css'
import cn from "classnames";
import SortIcon from '../../public/sort.svg'

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
                <SortIcon className={styles.sortIcon} />
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
                <SortIcon className={styles.sortIcon} />
                По цене
            </button>
        </div>
    )
}