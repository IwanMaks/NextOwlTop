import React, {useState} from 'react';
import {Button, Htag, Ptag, Rating, Tag} from '../components';

export default function Home(): JSX.Element {
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
    </>
    );
}
