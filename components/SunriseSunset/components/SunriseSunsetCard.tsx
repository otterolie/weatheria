import { FC } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

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
    </Box>
  );
};

export default SunriseSunsetCard;
