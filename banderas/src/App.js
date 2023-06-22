import './App.css';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
 
function App() {

  const [listaBanderas, setListaBanderas] = useState([]);
  const [pais, setPais] = useState({});
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((result) => {

        setListaBanderas(result.data.data);
        const rand = Math.floor(Math.random() * listaBanderas.length);
        setPais(result.data.data[rand]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function check(respuesta){
    if(respuesta === pais.name){
      setPuntos(puntos + 10);
      alert('Bien Papa');
    } else{
      setPuntos(puntos - 1 );
      alert('No Burro, es: ' + pais.name)
    }

    proximoPais();  
  }

  function proximoPais() {
    const rand = Math.floor(Math.random() * listaBanderas.length);
    setPais(listaBanderas[rand]);
  }


  return (
    <div className="App">
      <h1 > {puntos} </h1>
      <img id='bandera' src={pais.flag} alt='hola'></img> 
      <input type="text" name='nombre' id='resp'></input>
      <button onClick={() => check(document.getElementById('resp').value)}> Check </button> 
    </div>
  ); 
} 

export default App;
