import { Center, Text, Box } from "@chakra-ui/react";

function Banner() {
  return (
    <Box>
      <Center mt="10px">
        <Text fontSize="2xl" align="center">
          Welcome to Milestone Selector
        </Text>
      </Center>
      <Center>
        <Text mt="6px" fontSize="xl" align="center">
          The world's greatest milestone selecting app!
        </Text>
      </Center>
    </Box>
  );
}

export default Banner;
