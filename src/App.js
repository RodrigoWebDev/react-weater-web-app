import React, { useState, useEffect } from 'react';
import axios from "axios"
import Error from "./components/Error";
import Loader from "./components/Loader";
import WheaterInfo from "./components/WheaterInfo";
import './App.css';


const App = () => {
  const [weatherInfo, setWeatherInfo] = useState("");
  const [temperatureData, setTemperatureData] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [error, setError] = useState(false);


  function getLocation(lat, long) {
    const locationIQToken = "pk.9603f39fdc0c5467f78b985c55349fb1";
    const locationIQApiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${locationIQToken}&lat=${lat}&lon=${long}&format=json`;
    console.log(locationIQApiUrl);

    axios(locationIQApiUrl)
      .then(res => {
        console.log("locationIQApiUrl ==>", res.data)
        setCurrentLocation(res.data.address)
      })
  }

  function getWheaterData() {
    setIsFetching(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const wheaterApiKey = "7664f5403c235171315453a76f72e8d8";
      const wheaterApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${wheaterApiKey}`

      axios(wheaterApiUrl)
        .then(res => {
          console.log("Wheater data ==>", res.data)
          setWeatherInfo(res.data.weather[0]);
          setTemperatureData(res.data.main);
          getLocation(latitude, longitude);
          setIsFetching(false);
        })

    }, function (error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    });
  }

  useEffect(() => {
    getWheaterData();
  }, [])

  console.log("console", temperatureData);

  return (
    <div className="_App">
      {
        isFetching === false &&
        <WheaterInfo
          currentLocation={currentLocation}
          temperatureData={temperatureData}
          weatherInfo={weatherInfo}
        />
      }

      {error &&
        <Error />
      }

    </div>
  );
}

export default App;
