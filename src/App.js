import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [listaBanderas, setListaBanderas] = useState();
  const [pais, setPais] = useState({});
  const [puntos, setPuntos] = useState(0);
  const [letras, setLetras] = useState('');

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((result) => {

        setListaBanderas(result.data.data);
        const rand = Math.floor(Math.random() * 220);
        setPais(result.data.data[rand]);
        var guiones = '';
        for (var i = 1; i < pais.name.length; i++) {
          guiones += '_'
        }
        setLetras(guiones);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function check(respuesta) {
    if (respuesta === pais.name) {
      setPuntos(puntos + 10);
      alert('Bien Papa');
    } else {
      setPuntos(puntos - 1);
      alert('No Burro, es: ' + pais.name)
    }

    proximoPais();
  }

  function proximoPais() {
    const rand = Math.floor(Math.random() * listaBanderas.length);
    setPais(listaBanderas[rand]);
    var guiones = '';
    for (var i = 1; i < pais.name.length; i++) {
      guiones += '_'
    }
    setLetras(guiones);
    console.log(letras);
    document.getElementById('letras').innerHTML = '';
  }

  function start() {
    document.querySelector('.view').style = "display: block;"
    document.querySelector('.start').style = "display: none;"
  }

  function letra() {
    if (letras == pais.name) {
      alert('Toca check papa si ya gastaste todas las pistas');
    } else {

      var rand = Math.floor(Math.random() * (letras.length));
      console.log(rand, letras[rand])
      while (letras[rand] !== '_') {
        rand = Math.floor(Math.random() * (letras.length));
        console.log(rand, letras[rand])
      }

      const copiaLetras = letras.slice(0, rand) + pais.name[rand] + letras.slice(rand + 1);
      setLetras(copiaLetras);

      document.getElementById('letras').innerHTML = letras;

    }
  }

  return (
    <div className="App">

      <div className='start'>
        <h1> Flags Game </h1>
        <button className='btn btn-secondary' onClick={() => start()}> Start </button>
      </div>

      <div className='view'>
        <h1 > {puntos} </h1>
        <p id='letras'></p>
        <img id='bandera' src={pais.flag} alt='hola'></img>
        <input type="text" name='nombre' id='resp'></input>
        <button onClick={() => letra()} > Letra (-2s) </button>
        <button onClick={() => check(document.getElementById('resp').value)}> Check </button>
      </div>
    </div>
  );
}

export default App;

