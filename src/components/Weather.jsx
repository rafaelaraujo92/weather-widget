import styles from "./Weather.module.css";
import { useState, useEffect } from "react";
import windIcon from '/icons/wind-48.png';
import pressureIcon from '/icons/atmospheric-pressure-48.png';
import humidityIcon from '/icons/humidity-48.png';

const Weather = ({lat, long}) => {

const [weather, setWeather] = useState();
const apiKey = "a4366cc9dc8ea7054502f5adc8095e51";
const [icon, setIcon] = useState();
const [temp, setTemp] = useState();
const [humidity, setHumidity] = useState();
const [windSpeed, setWindSpeed] = useState();
const [windDeg, setWindDeg] = useState();
const [pressure, setPresssure] = useState();
const [description, setDescription] = useState();
const [city, setCity] = useState();


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=pt_br&appid=${apiKey}`;

// Resgatando dados
useEffect(() =>{
fetch(url).then(response => response.json())
.then(data => {
setWeather(data);
setIcon(data.weather[0].icon)
setDescription(data.weather[0].description)
setTemp(kelvinToC(data.main.temp))
setWindSpeed(data.wind.speed)
setWindDeg(data.wind.deg)
setHumidity(data.main.humidity)
setPresssure(data.main.pressure)
setCity(data.name + ', ' + data.sys.country)

})
}, [lat, long])

function kelvinToC(kelvin){
    let celsius = kelvin - 273.15;
    return celsius.toFixed(1);
}




 if(weather) { return (
    
    <div className={styles.container}>
        <div className={styles.widget_container}>
            <span className={styles.city}>
            {city}
            </span>
            <div className={styles.icon}>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
            </div>
            <div className={styles.temperature}>
                <p>{temp}ºC</p>
            </div>

            <div className={styles.condition}>{description}</div>
        

            <div className={styles.icons_container}>
                <div className={styles.wind}>
                <img src={windIcon} alt="" className={styles.icons}/>
                <div className={styles.wind_speed}>{windSpeed}m/s</div>
            <div className={styles.wind_deg}>{windDeg}º</div>
                </div>

                <div className={styles.humidity}>
                <img src={humidityIcon} alt="" className={styles.icons}/>

                <div className={styles.humidity_info}>{humidity}%</div>

                </div>

                <div className={styles.pressure}>
                <img src={pressureIcon} alt="" className={styles.icons}/>

                <div className={styles.pressure_info}>{pressure} hPa</div>
                </div>
            </div>


<p>Dados: <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeather.org</a></p>
        </div>
    </div>
  )
}
}

export default Weather