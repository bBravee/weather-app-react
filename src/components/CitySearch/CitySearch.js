import { useState } from "react";

import axios from "axios";

import "./CitySearch.css";

function CitySearch() {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");


    const fetchData = async () => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=apiKey`)
            .then(cordResponse => {
                const lon = cordResponse.data[0].lon;
                const lat = cordResponse.data[0].lat;

                return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=apiKey&units=metric`);
            })
            .then(forecastResponse => {
                console.log(forecastResponse.data.list);
                setData(forecastResponse.data.list);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    }

    return (
        <form onSubmit={handleSubmit} className="form-control">
            <label for="cityInput">City Name: </label>
            <input value={city} type="text" onChange={(event) => setCity(event.target.value)} />
            <button type="submit">Go</button>
            <div>
                {
                    data && (
                        <div>
                            {
                                data.map((item) => (
                                    <div className="forecast-item" key={item.dt}>
                                        <p>Day: {item.dt_txt}</p>
                                        <p>Temperature: {item.main.temp} ℃</p>
                                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} />
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </form>
    );
}

export default CitySearch;