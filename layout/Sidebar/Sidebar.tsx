import {SidebarProps} from "./Sidebar.props";
import styles from './Sidebar.module.css'
import {Menu} from "../Menu/Menu";
import cn from "classnames";
import {Search} from "../../components";
import LogoIcon from '../../public/logo.svg'

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (
        <div className={cn(className, styles.sidebar)} {...props} >
            <LogoIcon className={styles.logo} />
            <Search />
            <Menu />
        </div>
    )
}