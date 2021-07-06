import {ProductProps} from "./Product.props";
import styles from './Product.module.css'
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNum, priceRu } from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import cn from "classnames";
import {ForwardedRef, forwardRef, useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";
import {motion} from "framer-motion";

export const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
    const reviewRef = useRef<HTMLDivElement>(null);
    const variants = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }

    const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        reviewRef.current?.focus()
    }

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title}/>
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span>
                        <span className='visuallyHidden'>Цена</span>
                        {priceRu(product.price)}
                    </span>
                    {product.oldPrice && <Tag
                        className={styles.oldPrice}
                        color='green'
                    >
                        <span className='visuallyHidden'>Скидка</span>
                        {priceRu(product.price - product.oldPrice)}
                    </Tag>}
                </div>
                <div className={styles.credit}>
                    <span className='visuallyHidden'>Кредит</span>
                    {priceRu(product.credit)}
                    <span className={styles.mon}>/мес</span>
                </div>
                <div className={styles.rate}>
                    <span className='visuallyHidden'>{'Рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tags}>
                    {product.categories.map(c => <Tag className={styles.tag} key={c} color='ghost'>{c}</Tag>)}
                </div>
                <div className={styles.priceTitle} aria-hidden={true}>
                    цена
                </div>
                <div className={styles.creditTitle} aria-hidden={true}>
                    в кредит
                </div>
                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollToReview}>
                        {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>
                </div>
                <Divider className={styles.hr} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.char} key={c.name}>
                            <span className={styles.charName}>{c.name}</span>
                            <span className={styles.charDots} />
                            <span className={styles.charVal}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.adv}>
                        <div className={styles.advTitle}>Преимущества</div>
                        {product.advantages}
                    </div>}
                    {product.disadvantages && <div className={styles.disAdv}>
                        <div className={styles.advTitle}>Недостатки</div>
                        {product.disadvantages}
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button
                        appearance='ghost'
                        arrow={isReviewOpened ? 'down' : 'right'}
                        className={styles.readMore}
                        onClick={() => setIsReviewOpened(!isReviewOpened)}
                        aria-expended={isReviewOpened}
                    >
                        Читать Отзывы
                    </Button>
                </div>
            </Card>
            <motion.div layout animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
                <Card
                    color='blue'
                    className={cn(styles.review)}
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                >
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review review={r} />
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened} />
                </Card>
            </motion.div>
        </div>
    )
}))