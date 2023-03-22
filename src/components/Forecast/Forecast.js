import './Forecast.css';

function Forecast({ forecastData }) {
    return (
        <div className="forecastContainer">
            {
                forecastData.map((item) => (
                    <div className="forecastItem" key={item.dt}>
                        <p className="itemDate">{item.dt_txt.slice(5, 10)}</p>
                        <p className="itemDate">{item.dt_txt.slice(11, 16)}</p>
                        <p className="itemTemp">{item.main.temp} ℃</p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} />
                    </div>
                ))
            }
        </div>
    )
}

export default Forecast;