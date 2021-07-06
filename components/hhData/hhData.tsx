import styles from './hhData.module.css'
import {HhDataProps} from "./hhData.props";
import {Card} from "../Card/Card";
import {priceRu} from "../../helpers/helpers";
import HHIcon from '../../public/hhStar.svg'

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.countValue}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
                    <div className={styles.rate}>
                        <HHIcon className={styles.filled} />
                        <HHIcon />
                        <HHIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
                    <div className={styles.rate}>
                        <HHIcon className={styles.filled} />
                        <HHIcon className={styles.filled} />
                        <HHIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
                    <div className={styles.rate}>
                        <HHIcon className={styles.filled} />
                        <HHIcon className={styles.filled} />
                        <HHIcon className={styles.filled} />
                    </div>
                </div>
            </Card>
        </div>
    )
}