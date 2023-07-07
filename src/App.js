import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import flagsStartScreen from './imgs/flagsStartScreen.png';
import playIcon from './imgs/playIcon.png'

function App() {

  const [listaBanderas, setListaBanderas] = useState();
  const [pais, setPais] = useState({});
  const [puntos, setPuntos] = useState(0);
  const [letras, setLetras] = useState('');
  const [segundos, setSegundos] = useState(15);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((result) => {

        setListaBanderas(result.data.data);
        const rand = Math.floor(Math.random() * 220);
        setPais(result.data.data[rand]);
        var guiones = '';
        for (var i = 0; i < result.data.data[rand].name.length; i++) {
          guiones += '_'
        }
        setLetras(guiones);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function check(respuesta) {
    if (respuesta.toLowerCase() === pais.name.toLowerCase()) {
      if (segundos > 0) {
        setPuntos(puntos + 10 + segundos);
      } else {
        setPuntos(puntos + 10);
      }
    } else {
      setPuntos(puntos - 1);
    }

    proximoPais();
  }

  function proximoPais() {
    setSegundos(15)
    const rand = Math.floor(Math.random() * listaBanderas.length);
    setPais(listaBanderas[rand]);
    var guiones = '';
    for (var i = 0; i < listaBanderas[rand].name.length; i++) {
      guiones += '_'
    }
    setLetras(guiones);

    document.getElementById('letras').innerHTML = '';
    document.getElementById('btnLetras').style = '';
  }

  function start() {
    document.querySelector('.view').style = "display: block;"
    document.querySelector('.start').style = "display: none;"
    setSegundos(15)
  }

  function letra() {
    setPuntos(puntos - 2)
    if (letras == pais.name) {
      document.getElementById('btnLetras').style = 'display: none';
      document.getElementById('letras').innerHTML = letras;
    } else {

      var rand = Math.floor(Math.random() * (letras.length));
      while (letras[rand] !== '_') {
        rand = Math.floor(Math.random() * (letras.length));
      }

      const copiaLetras = letras.slice(0, rand) + pais.name[rand] + letras.slice(rand + 1);
      setLetras(copiaLetras);

      document.getElementById('letras').innerHTML = letras;

    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (segundos > 0) {
        setSegundos(segundos - 1);
        document.getElementById('timer').innerHTML = segundos;
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="App">

      <div className='start'>
        <h1> Flags Game </h1>
        <img id='flagsStartScreen' src={flagsStartScreen} alt=''></img>
        <img id='playIcon' src={playIcon} onClick={() => start()} alt=''></img>
      </div>

      <div className='view'>
        <h1 > {puntos} </h1>
        <p id='letras'></p>
        <img id='bandera' src={pais.flag} alt='hola'></img>
        <input className='buttons' type="text" name='nombre' id='resp' placeholder=' Type here...'></input>
        <button className='buttons' id='btnLetras' onClick={(e) => letra()} > Letra (-2s) </button>
        <button className='buttons' onClick={() => check(document.getElementById('resp').value)}> Check </button>
        <p id='timer'></p>
      </div>
    </div>
  );
}

export default App;

