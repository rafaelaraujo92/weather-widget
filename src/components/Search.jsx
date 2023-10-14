import { useState, useEffect } from "react"


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

    }


  return (
    <>
    <label htmlFor="search">Digite a cidade:</label>
    <input type="text" name="search" id="search" onChange={carregaSugestoes} value={searchQuery} />
    <div className="query">
        {sugestoes.map(item => (
            <div className="item" onClick={carregaTempo} key={item.id} id={item.id}>{item.name}, {item.state}, {item.contry}</div>

        ))}
    </div>

  </>
  )
}

export default Search