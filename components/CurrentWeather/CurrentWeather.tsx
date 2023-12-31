import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useGetWeatherQuery } from "../../redux/services/weatherMapApi";
import { query } from "../../redux/slices/locationSlice";
import { WeatherElement } from "../../utils/interfaces/weatherMap";

const CurrentWeather: NextPage = () => {
  const queryData = useSelector(query);
  const { data: weather } = useGetWeatherQuery(queryData);

  const boxBackgroundColor = useColorModeValue("#ffffff", "#222222");

  let imageURL;

  if (
    weather?.weather[0]?.description === "clear sky" ||
    weather?.weather[0]?.description === "few clouds"
  ) {
    imageURL = `clear-sky.svg`;
  } else if (weather?.weather[0]?.description === "scattered clouds") {
    imageURL = `scattered-clouds.svg`;
  } else if (
    weather?.weather[0]?.description === "overcast clouds" ||
    weather?.weather[0]?.description === "broken clouds"
  ) {
    imageURL = `scattered-clouds.svg`;
  } else if (
    weather?.weather[0]?.description === "light rain" ||
    weather?.weather[0]?.description === "moderate rain" ||
    weather?.weather[0]?.description === "heavy rain" ||
    weather?.weather[0]?.description === "heavy intensity rain"
  ) {
    imageURL = `rain-clouds.svg`;
  } else if (weather?.weather[0]?.description === "thundercast clouds") {
    imageURL = `thundercast-clouds.svg`;
  } else if (weather?.weather[0]?.description === "winter") {
    imageURL = `winter-clouds.svg`;
  } else if (weather?.weather[0]?.description === "mist") {
    // imageURL = `mist.svg`;
    imageURL = `winter-clouds.svg`;
  } else if (
    weather?.weather[0]?.description === "light snow" ||
    weather?.weather[0]?.description === "Light snow"
  ) {
    imageURL = `snow.svg`;
  } else {
    imageURL = `clouds.svg`;
  }

  return (
    <Stack marginBottom={5} className="xl:h-[570px] 2k:h-[910px]">
      <Box
        overflow="hidden"
        bg={boxBackgroundColor}
        className="rounded w-full xl:w-[320px] h-[420px] hover:border-sky-500 hover:border-[2px] md:hover:scale-[102%] transition-all duration-300 text-center xl:h-full"
      >
        <div className="w-full p-4 h-[250px] 2k:h-[550px] object-contain relative">
          <Image
            src={`/images/weather/${imageURL}`}
            alt="Weather Icon"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <Box py="6" px="4" className="lg:px-5">
          <Heading as="h2" size="xl" mb={2} className="2k:text-2xl">
            {weather?.name}, {weather?.sys?.country}
          </Heading>
          <Text className="text-sm md:text-[15px] md:leading-6 2k:text-lg">
            The weather condition in {weather?.name}, {weather?.sys?.country} is
            described as {""}
            {weather?.weather?.map((weather: WeatherElement) => (
              <span className="font-bold" key={weather?.id}>
                {weather?.description}
              </span>
            ))}
            <Text className="pb-8">
              <span className="font-semibold">
                {Math.ceil(Number(weather?.main?.temp - 273))}° C and humidity
                of {weather?.main?.humidity}%.
              </span>
            </Text>
          </Text>
        </Box>
      </Box>
    </Stack>
  );
};

export default CurrentWeather;
