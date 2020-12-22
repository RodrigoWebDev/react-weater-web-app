import React from 'react';

function getCurrentDay() {
  let Xmas95 = new Date();
  let options = { weekday: 'long' };
  return new Intl.DateTimeFormat('pt-BR', options).format(Xmas95);
}

const WheaterInfo = ({ currentLocation, temperatureData, weatherInfo }) => {
  return (
    <>
      <div>{currentLocation.city_district}, {currentLocation.city}</div>
      <div>{getCurrentDay()}</div>
      <div>{weatherInfo.description}</div>

      <div style={{ display: "flex" }}>
        <div>
          <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} />
          <span>{temperatureData.temp ? `${temperatureData.temp.toFixed(0)} ºC` : ""}</span>
        </div>

        <div>
          <div>Umidade: {temperatureData.humidity}%</div>
          <div>Pressão: {temperatureData.pressure}</div>
        </div>
      </div>
    </>
  );
}

export default WheaterInfo;
