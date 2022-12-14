import React, { useContext, useEffect, useState } from 'react'
import './DetailCharacter.scss'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ComeBackButton } from '../components/ComeBackButton';
import {GetHouseIMG} from './GetHouseIMG';
import { MyLangContext } from '../context/MyLangContext';

export const DetailCharacter= () => {

    const {t} = useContext(MyLangContext)
  
    const {idCharacter} = useParams();
    const[character, setCharacter] = useState([]);

    const {appearances, titles, siblings, allegiances, house} = character
    
    useEffect(() => {
        const getData = async () => {
            const {data} = await axios.get(`https://api.got.show/api/show/characters/${idCharacter}`)
            setCharacter(data);
            console.log(data);
        }
        getData();
    }, [idCharacter]) 


    return (
    <>
    <ComeBackButton backTo="/characters"></ComeBackButton>

    <div className='container-fluid d-flex align-items-center flex-column detail-ch'>

        <img className='detail-ch--img-ch' src={character.image} alt={character.name}></img>
        <h1 className='detail-ch--name'>{character.name}</h1>

        <div className='container-fluid d-flex justify-content-between detail-ch--gallery '>

        <div className='detail-ch--gallery--box'>
        <h2 className='detail-ch--gallery--box--title'>{t('house')}</h2>
        <ul className='detail-ch--gallery--box--details--logo'><GetHouseIMG nameHouse={house}></GetHouseIMG></ul>
        </div>

        <div className='detail-ch--gallery--box'>
        <h2 className='detail-ch--gallery--box--title'>{t('alliances')}</h2>
        <ul className='detail-ch--gallery--box--details'>
        {allegiances && allegiances.map((allegiance, index) => <li className='detail-ch--gallery--box--details--list' key={index}>{allegiance}</li>)}
        </ul>
        </div>

        <div className='detail-ch--gallery--box'>
        <h2 className='detail-ch--gallery--box--title'>{t('appearances')}</h2>
        <ul className='detail-ch--gallery--box--details'>
            {appearances && appearances.map((apariencia, index) => <li className='detail-ch--gallery--box--details--list' key={index}>{apariencia}</li>)}
            
        </ul>
        </div>

        <div className='detail-ch--gallery--box'>
        <h2 className='detail-ch--gallery--box--title'>{t('father')}</h2>
        <ul className='detail-ch--gallery--box--details'><li className='detail-ch--gallery--box--details--list'>{character.father}</li></ul>
        </div>

        <div className='detail-ch--gallery--box'>
        <h2 className='detail-ch--gallery--box--title'>{t('siblings')}</h2>
        <ul className='detail-ch--gallery--box--details'>
        {siblings && siblings.map((sibling, index) => <li className='detail-ch--gallery--box--details--list' key={index}>{sibling}</li>)}
        </ul>
        </div>

        <div className='detail-ch--gallery--box'>
        <h2 className='detail-ch--gallery--box--title'>{t('titles')}</h2>
        <ul className='detail-ch--gallery--box--details'>
        {titles && titles.map((title, index) => <li className='detail-ch--gallery--box--details--list' key={index}>{title}</li>)}
        </ul>
        </div>
        
    </div>
    </div>
    </>
  )
}
