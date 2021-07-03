import React, {useState} from 'react';
import {Button, Htag, Ptag, Rating, Tag} from '../components';
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";

function Home({menu}: HomeProps): JSX.Element {
    const [rat, setRat] = useState<number>(2)
    return (
    <>
        <Htag tag='h1'>Hello</Htag>
        <Button appearance='primary' arrow='right'>Узнать подробнее</Button>
        <Button appearance='ghost' arrow='down'>Узнать подробнее</Button>
        <Ptag size='m'>HHHHHHHHHHhhhhhhhhdsbdiusbdibwjdjkwnldjw</Ptag>
        <Tag size='s' color='ghost'>Small</Tag>
        <Tag size='m' color='red'>Medium</Tag>
        <Tag size='m' color='green'>Medium</Tag>
        <Tag color='primary'>Small</Tag>
        <Rating rating={rat} isEditable={true} setRating={setRat}/>
        <ul>
            {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
        </ul>

    </>
    );
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    })
    return {
        props: {
            menu,
            firstCategory
        }
    }
}

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[],
    firstCategory: number
}
