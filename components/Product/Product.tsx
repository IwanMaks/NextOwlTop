import {ProductProps} from "./Product.props";
import styles from './Product.module.css'
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNum, priceRu } from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import cn from "classnames";

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
    return (
        <>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title}/>
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    {priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}
                    <span className={styles.mon}>/мес</span>
                </div>
                <div className={styles.rate}>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tags}>
                    {product.categories.map(c => <Tag className={styles.tag} key={c} color='ghost'>{c}</Tag>)}
                </div>
                <div className={styles.priceTitle}>
                    цена
                </div>
                <div className={styles.creditTitle}>
                    в кредит
                </div>
                <div className={styles.rateTitle}>
                    {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                </div>
                <Divider className={styles.hr} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.char} key={c.name}>
                            <span className={styles.charName}>{c.name}</span>
                            <span className={styles.charDots}></span>
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
                    <Button appearance='ghost' arrow='right' className={styles.readMore}>Читать Отзывы</Button>
                </div>
            </Card>
        </>
    )
}