import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [milestones, setMilestones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5000/milestones");
        const responseJson = await response.json();
        setMilestones(responseJson);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isError) {
    return <p>error</p>;
  }
  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <Box>
      <Box>{JSON.stringify(milestones, null, 2)}</Box>
      <Flex direction="column">
        {milestones.Milestone["0"]}
        {Object.keys(milestones.Milestone)}
      </Flex>
    </Box>
  );
}

export default App;
