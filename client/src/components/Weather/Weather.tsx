import React, { useContext } from 'react';
import ForecastRow from './ForecastRow';
import { RootPropsToWeather, UserContext } from '../../Root';
import { Hourly } from '../../Root';
import { BandAid } from '../../StyledComp';
import Alerts from '../Alerts';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  hourlyForecasts,
  prepareWeatherIcon,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
  getForecasts,
}: RootPropsToWeather) => {
  //need to break up hourly forecasts into chunks of 4 forecasts each for the ForecastRow to map through
  const { achievementMessage, newAchievementEarned } = useContext(UserContext);
  let forecastRowArrays: Hourly[][] = [];
  let forecastArray: Hourly[] = [];

  hourlyForecasts.forEach((ele: Hourly, i: number) => {
    if ((i + 1) % 4 === 0) {
      forecastArray.push(ele);
      forecastRowArrays.push(forecastArray);
      forecastArray = new Array();
    } else {
      forecastArray.push(ele);
    }
  });
  forecastRowArrays.push(forecastArray);

  return (
    <BandAid>
      {forecastRowArrays.map((weatherRow, i) => {
        return (
          <ForecastRow
            key={i}
            windSpeedMeasurementUnit={windSpeedMeasurementUnit}
            temperatureMeasurementUnit={temperatureMeasurementUnit}
            precipitationMeasurementUnit={precipitationMeasurementUnit}
            prepareWeatherIcon={prepareWeatherIcon}
            rowData={weatherRow}
          />
        );
      })}
      <Alerts
        achievementMessage={achievementMessage}
        newAchievementEarned={newAchievementEarned}
      ></Alerts>
    </BandAid>
  );
};

export default Weather;
