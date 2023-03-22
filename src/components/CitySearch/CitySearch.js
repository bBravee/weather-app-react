import { useState } from "react";

import axios from "axios";

import "./CitySearch.css";

import CurrentWeather from "../CurrentWeather/CurrentWeather";
import Forecast from "../Forecast/Forecast";

import { CSSTransition } from 'react-transition-group';

function CitySearch() {
    const [forecastData, setForecastData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const apiKey = 'YOUR_API_KEY_HERE';

    const fetchData = async () => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
            .then(cordResponse => {
                setError(false);

                const lon = cordResponse.data[0].lon;
                const lat = cordResponse.data[0].lat;

                return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            })
            .then(forecastResponse => {
                setForecastData(forecastResponse.data.list);

                return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            })
            .then(currentWeatherResponse => {
                setCurrentData(currentWeatherResponse.data);
            })
            .catch(error => {
                setError(true);
                console.log(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    }

    return (
        <div className="citySearchContainer">
            <div className="formControl">
                <form onSubmit={handleSubmit}>
                    <input className="cityInput" placeholder="city name" value={city} type="text" onChange={(event) => setCity(event.target.value)} />
                    {
                            <CSSTransition
                                in={error}
                                timeout={300}
                                classNames="slide"
                                unmountOnExit
                            >
                                <p className="errorPopup">Invalid city name!</p>
                            </CSSTransition>
                    }
                </form>
            </div>
            {
                (currentData && !error) && (
                    <CurrentWeather
                        cityName={currentData.name}
                        country={currentData.sys.country}
                        iconCode={currentData.weather[0].icon}
                        temperature={currentData.main.temp}
                        description={currentData.weather[0].description}
                        feelsLike={currentData.main.feels_like}
                        wind={currentData.wind.speed}
                        humidity={currentData.main.humidity}
                        pressure={currentData.main.pressure}
                        cloudiness={currentData.clouds.all}
                        visibility={currentData.visibility}
                    />
                )
            }
            <div>
                {
                    (forecastData && !error) && (
                        <Forecast forecastData={forecastData} />
                    )
                }
            </div>
        </div>
    );
}

export default CitySearch;