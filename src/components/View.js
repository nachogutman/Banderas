import React from 'react'

export default function View({letra, check, pais, puntos}) {
  return (
    <div className='view'>
        <h1 > {puntos} </h1>
        <p id='letras'></p>
        <p id='answer'></p>
        <img id='bandera' src={pais.flag} alt='hola'></img>
        <input className='buttons' type="text" name='nombre' id='resp' placeholder=' Type here...'></input>
        <button className='buttons' id='btnLetras' onClick={(e) => letra()} > Letra (-2s) </button>
        <button className='buttons' onClick={() => check(document.getElementById('resp').value)}> Check </button>
        <p id='timer'></p>
      </div>
  )
}
