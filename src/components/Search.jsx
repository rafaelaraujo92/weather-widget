import { useState, useEffect } from "react"
import styles from "./Search.module.css"

const Search = ({setLat, setLong}) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [cities, setCities] = useState();
    const [sugestoes, setSugestoes] = useState([]);


    useEffect(() =>{
        fetch('./cities.json').then((response) => response.json()).then((json) =>setCities(json))

        
    }, [])

    console.log(cities)

    function trataPesquisa(strQuery){
       let normalized = strQuery.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
        return normalized;
    }

    function carregaSugestoes(e){
        setSearchQuery(e.target.value)
        setSugestoes(cities.filter(obj => trataPesquisa(obj.name).includes(e.target.value.toUpperCase())).slice(0,10))
        console.log(sugestoes)
    }

    function carregaTempo(e){
       let cidade = sugestoes.find(city => city.id == e.target.id);
      setLat(cidade.lat);
      setLong(cidade.long);
      setSearchQuery("")

    }


  return (
    <div className={styles.container}>
    <label htmlFor="search" className={styles.label}>Digite a cidade:</label>
    <input className={styles.campo_pesquisa} type="text" autoComplete="off" name="search" id="search" onChange={carregaSugestoes} value={searchQuery} />
    
    {searchQuery && sugestoes.length > 0 &&    <div className={styles.sugestoes}>
        {sugestoes.map(item => (
            <div className={styles.item} onClick={carregaTempo} key={item.id} id={item.id}>{item.name}, {item.state}, {item.contry}</div>

        ))}
    </div> }


  </div>
  )
}

export default Search