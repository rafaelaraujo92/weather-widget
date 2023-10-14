import { useState } from 'react'
import './App.css'
import Weather from './components/Weather'
import Search from './components/Search'

function App() {

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
