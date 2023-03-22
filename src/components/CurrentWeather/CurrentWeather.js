import './CurrentWeather.css';

import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CurrentWeather({ cityName, country, iconCode, temperature, description, wind, humidity, pressure, cloudiness, feelsLike, visibility }) {
    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()]; 
    const dayOfMonth = date.getDate(); 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];

    return (
        <div className="currentContainer">
            <Carousel interval={null}>
                <Carousel.Item>
                    <div className="cityContainer">
                        <p className="cityName">{cityName}, {country} </p>
                        <p className="date">{dayOfWeek} {dayOfMonth} {month}</p>
                    </div>
                    <div className="detailsContainer">
                        <img className="weatherImage" src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt="weather-icon"></img>
                        <div className="weatherDetails">
                            <p className="temperature">{temperature}℃</p>
                            <p className="description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <Container fluid className="rectangle">
                        <Row>
                            <Col>
                                <div className="colItem">
                                    <p className="conditionValue">{feelsLike}℃</p>
                                    <p className="conditionName">Feels like</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="colItem">
                                    <p className="conditionValue">{wind}mph</p>
                                    <p className="conditionName">Wind</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="colItem">
                                    <p className="conditionValue">{humidity}%</p>
                                    <p className="conditionName">Humidity</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="colItem">
                                    <p className="conditionValue">{pressure}hpa</p>
                                    <p className="conditionName">Pressure</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="colItem">
                                    <p className="conditionValue">{cloudiness}%</p>
                                    <p className="conditionName">Cloudiness</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="colItem">
                                    <p className="conditionValue">{visibility / 1000}km</p>
                                    <p className="conditionName">Visibility</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CurrentWeather;