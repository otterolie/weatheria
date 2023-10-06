import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to create requests
const createRequest = (url: string) => ({ url });

// Check if environment variables are defined
if (
  !process.env.NEXT_PUBLIC_WEATHER_URL ||
  !process.env.NEXT_PUBLIC_WEATHER_API_KEY
) {
  console.error("Weather API environment variables are not defined");
}

// API service definition
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEATHER_URL,
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (search) =>
        createRequest(
          `/weather?q=${search}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        ),
    }),
    getForecast: builder.query({
      query: (search) =>
        createRequest(
          `/forecast?q=${search}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        ),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetForecastQuery, useGetWeatherQuery } = weatherApi;
