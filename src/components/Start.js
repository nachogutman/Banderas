import React from 'react'
import flagsStartScreen from '../imgs/flagsStartScreen.png';
import playIcon from '../imgs/playIcon.png'

export default function Start({start}) {
    return (
        <div className='start'>
            <h1> Flags Game </h1>
            <img id='flagsStartScreen' src={flagsStartScreen} alt=''></img>
            <img id='playIcon' src={playIcon} onClick={() => start()} alt=''></img>
        </div>
    )
}
