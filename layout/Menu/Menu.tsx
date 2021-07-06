import React, {useContext, useState} from "react";
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import styles from './Menu.module.css'
import cn from "classnames";
import Link from 'next/link'
import {useRouter} from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import {motion, useReducedMotion} from 'framer-motion'
import {KeyboardEvent} from "react";


export const Menu = (): JSX.Element => {
    const [ann, setAnn] = useState<'closed' | 'opened' | undefined>()
    const {menu, setMenu, firstCategory} = useContext(AppContext)
    const router = useRouter()
    const shouldReducedMotion = useReducedMotion()
    const variants = {
        visible: {
            marginBottom: 20,
            // transition: shouldReducedMotion ? {} : {
            //     when: 'beforeChildren',
            //     staggerChildren: 0.1
            // }
        },
        hidden: {
            marginBottom: 0
        }
    }
    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }


    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory === secondCategory) {
                setAnn(m.isOpened ? 'closed' : 'opened')
                m.isOpened = !m.isOpened
            }
            return m
        }))
    }

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault()
            openSecondLevel(secondCategory)
        }
    }

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelUl}>
                {firstLevelMenu.map(m => (
                    <li key={m.route} aria-expanded={m.id === firstCategory}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id === firstCategory
                                })}>
                                    {m.icon}
                                    <span >{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        )
    }

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <li  key={m._id.secondCategory}>
                            <button
                                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(m._id.secondCategory)}
                                aria-expanded={m.isOpened}
                            >
                                {m._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
                <motion.li key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`}>
                        <a
                            tabIndex={isOpened ? 0 : -1}
                            aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
                            key={p._id}
                            className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
                        })}>
                            {p.category}
                        </a>
                    </Link>
                </motion.li>

            ))
        )
    }

    return (
        <nav className={styles.menu} role='navigation'>
            {ann && <span role='log' className='visuallyHidden'>{ann === 'opened' ? 'развёрнуто' : 'свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    )
}