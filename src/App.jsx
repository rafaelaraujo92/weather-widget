import { useState, useEffect } from 'react'
import './App.css'
import Weather from './components/Weather'
import Search from './components/Search'

function App() {

  useEffect(() => {obterLocalizacao().then((localizacao) =>{
    setLong(localizacao.longitude);
    setLat(localizacao.latitude);
  }).catch((error) => {
    console.error("Erro:" + error.message)
  })}, [])

  function obterLocalizacao(){
    return new Promise ((resolve, reject)=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({latitude, longitude})
        }, (error)=>{
          reject(error);
        })
      }
      else{
        reject(new Error("Geolocalização não suportada"))
      }
    })
  }

  const [long, setLong] = useState();
  const [lat, setLat] = useState();





  return (
    <>
    <Search setLat={setLat} setLong={setLong}/>
    <Weather lat={lat} long={long}/>
   </>
  )
}

export default App
