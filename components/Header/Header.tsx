import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useGetWeatherQuery } from "../../redux/services/weatherMapApi";
import { getQueryData } from "../../redux/slices/locationSlice";

const Header: NextPage = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const [search, setSearch] = useState("Rotterdam");

  useEffect(() => {
    dispatch(getQueryData(search));
  }, [search, dispatch]);

  // handle search
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getQueryData(search));
    setSearch("");
  };

  const { data: weather } = useGetWeatherQuery(search);
  const bg = useColorModeValue("#ffffff", "#222");

  return (
    <>
      <Box className="w-full h-20 shadow-sm" bg={bg}>
        <Flex className="items-center justify-between gap-5 w-[90%] md:w-[95%] m-auto h-full">
          <div className="hidden lg:block">
            <Flex alignItems="center" gap={1} className="h-full">
              <ImLocation2 size="20px" />
              <Heading
                as="h3"
                fontSize={{ base: "16px", md: "27px" }}
                noOfLines={1}
              >
                {weather?.name
                  ? `${weather?.name}, ${weather?.sys?.country}`
                  : "Otter-cast"}
              </Heading>
            </Flex>
          </div>
          <form onSubmit={handleSubmit} className="w-full lg:w-[50%]">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </form>
          <Flex alignItems="center" className="h-full gap-2 md:gap-5">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <FaMoon /> : <BsSun />}
            </Button>
            <div className="hidden md:block">
              <Tooltip label="Hi, hi - this is a test" placement="bottom">
                <Avatar
                  name="Otter Olie"
                  src="https://pbs.twimg.com/profile_images/1550542642261491713/4qI2Pezo_400x400.png"
                />
              </Tooltip>
            </div>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
