import { useSelector } from "react-redux";
import { useGetWeatherQuery } from "../../redux/services/weatherMapApi";
import { query } from "../../redux/slices/locationSlice";
import { DateTime } from "luxon";
import SunriseSunsetCard from "./components/SunriseSunsetCard";

const SunriseSunset = () => {
  const queryData = useSelector(query);
  const { data: weatherData, isError } = useGetWeatherQuery(queryData);

  const formatUnixTime = (unixTime: number, timezoneOffset: number) => {
    return DateTime.fromSeconds(unixTime)
      .plus({ minutes: timezoneOffset })
      .toFormat("h:mm a");
  };

  let sunriseTime = "";
  let sunsetTime = "";
  let timezoneOffset = 0;

  if (weatherData) {
    timezoneOffset = weatherData.timezone;
    sunriseTime = formatUnixTime(weatherData.sys.sunrise, timezoneOffset);
    sunsetTime = formatUnixTime(weatherData.sys.sunset, timezoneOffset);
  }

  if (isError || !sunriseTime || !sunsetTime) {
    return <p>Error fetching or processing the sunrise and sunset data.</p>;
  }

  return (
    <SunriseSunsetCard sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
  );
};

export default SunriseSunset;
