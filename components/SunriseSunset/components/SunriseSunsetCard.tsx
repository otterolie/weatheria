import { FC } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import Image from "next/image";
interface Props {
  sunriseTime: string;
  sunsetTime: string;
}

const SunriseSunsetCard: FC<Props> = ({ sunriseTime, sunsetTime }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      p="4"
      bgColor="lightblue"
      maxW="sm"
    >
      <Heading size="md" mb="4">
        Sunrise & Sunset
      </Heading>
      <Text>
        <strong>Sunrise:</strong> {sunriseTime}
      </Text>
      <Text>
        <strong>Sunset:</strong> {sunsetTime}
      </Text>
      <div className="w-full p-4 h-[100px] 2k:h-[200px] object-contain relative mt-2">
        <Image
          src="/images/weather/sunset-sunrise.svg"
          alt="Weather: Scattered Clouds"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </Box>
  );
};

export default SunriseSunsetCard;
