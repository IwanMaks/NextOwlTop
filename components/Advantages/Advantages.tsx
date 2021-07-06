import styles from './Advantages.module.css'
import {AdvantagesProps} from "./Advantages.props";
import CheckIcon from '../../public/check.svg'

export const Advantages = ({advantages}: AdvantagesProps): JSX.Element => {
    return (
        <div>
            {advantages.map(a => (
                <div key={a._id} className={styles.adv}>
                    <CheckIcon />
                    <div className={styles.title}>{a.title}</div>
                    <hr className={styles.vLine} />
                    <div>{a.description}</div>
                </div>
            ))}
        </div>
    )
}