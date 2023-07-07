import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Start from './components/Start';
import View from './components/View';

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
    document.getElementById('letras').style = "display: none;"
    document.querySelectorAll('.buttons').style = "display: none;"
    document.getElementById('answer').style = "display: inline;"
    if (respuesta.toLowerCase() === pais.name.toLowerCase()) {
      if (segundos > 0) {
        setPuntos(puntos + 10 + segundos);
      } else {
        setPuntos(puntos + 10);
      }

      document.getElementById('answer').innerHTML = "CORRECT"
      
    } else {
      setPuntos(puntos - 1);
      document.getElementById('answer').innerHTML = "Incorrect: " + pais.name
    }

    setTimeout(function () {
      document.getElementById('answer').style = "display: none;"
      document.getElementById('answer').innerHTML = ""
      proximoPais();
    }, 1000);
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

  const start = function() {
    document.querySelector('.view').style = "display: block";
    document.querySelector('.start').style = "display: none;";
    setSegundos(15)
  }

  function mostrarLetra() {
    document.getElementById('letras').style = "display: block"
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

      <Start id='start' start={start}></Start>

      <View letra={mostrarLetra} check={check} pais={pais} puntos={puntos}></View>
    </div>
  );
}

export default App;

