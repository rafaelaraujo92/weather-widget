import styles from "./Weather.module.css";
import { useState, useEffect } from "react";


const Weather = ({lat, long}) => {

const [weather, setWeather] = useState();
const apiKey = "a4366cc9dc8ea7054502f5adc8095e51";
const [icon, setIcon] = useState();
const [temp, setTemp] = useState();
const [humidity, setHumidity] = useState();
const [maxTemp, setMaxTemp] = useState();
const [minTemp, setMinTemp] = useState();
const [pressure, setPresssure] = useState();
const [description, setDescription] = useState();

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=pt_br&appid=${apiKey}`;

// Resgatando dados
useEffect(() =>{
fetch(url).then(response => response.json())
.then(data => {
setWeather(data);
setIcon(data.weather[0].icon)
setDescription(data.weather[0].description)
setTemp(kelvinToC(data.main.temp))
setMinTemp(kelvinToC(data.main.temp_min))
setMaxTemp(kelvinToC(data.main.temp_max))
setHumidity(data.main.humidity)
setPresssure(data.main.pressure)
})
}, [lat, long])

function kelvinToC(kelvin){
    let celsius = kelvin - 273.15;
    return celsius.toFixed(1);
}




 if(weather) { return (
    <>
        <div className={styles.widget_container}>
            <span className={styles.city}>

            </span>
            <div className={styles.icon}>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
                
            </div>
            <div className={styles.condition}>{description}</div>
            <div className={styles.temperature}>
                <p>{temp}ºC</p>
            </div>
            <div className={styles.min_temp}>{minTemp}ºC</div>
            <div className={styles.max_temp}>{maxTemp}ºC</div>
            <div className={styles.humidity}>{humidity}%</div>
            <div className={styles.pressure}>{pressure} hPa</div>

        </div>
    </>
  )
}
}

export default Weather