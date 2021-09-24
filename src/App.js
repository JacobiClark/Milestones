import { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";

import "./App.css";

function App() {
  const [milestoneData, setMilestoneData] = useState([]);
  const [completionDateData, setcompletionDateData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleMilestoneButtonClick = (e) => {
    e.preventDefault();
    let mapped = milestoneData.map((milestone) => {
      return milestone.milestone === e.target.value
        ? { ...milestone, isSelected: !milestone.isSelected }
        : { ...milestone };
    });
    setMilestoneData(mapped);
  };

  const handleCompletionDateButtonClick = (e) => {
    e.preventDefault();
    let mappeds = completionDateData.map((completionDate) => {
      return completionDate.completionDate === e.target.value
        ? { ...completionDate, isSelected: !completionDate.isSelected }
        : { ...completionDate, isSelected: false };
    });
    setcompletionDateData(mappeds);
  };

  const handleDownload = () => {
    const selectedMilestonePost = {};
    const selectedMilestones = milestoneData.filter(
      (milestone) => milestone.isSelected === true
    );
    const formattedSelectedMilestones = {};
    for (let i = 0; i < selectedMilestones.length; i++) {
      formattedSelectedMilestones[i] = selectedMilestones[i].milestone;
    }
    selectedMilestonePost[
      "Selected milestone(s)"
    ] = formattedSelectedMilestones;
    const selectedCompletionDates = completionDateData.filter(
      (completionDate) => completionDate.isSelected === true
    );
    const formattedCompletionDates = {};
    for (let i = 0; i < selectedCompletionDates.length; i++) {
      formattedCompletionDates[i] = selectedCompletionDates[i].completionDate;
    }
    selectedMilestonePost[
      "Selected Completion Date"
    ] = formattedCompletionDates;
    console.log("post initiated");
    fetch("http://localhost:5000/milestones", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedMilestonePost),
    }).then((res) => res.json());
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5000/milestones");
        const responseJson = await response.json();
        let milestoneValues = Object.values(responseJson.Milestone);
        milestoneValues = milestoneValues.map((milestone) => {
          let milestoneObj = {
            milestone: milestone,
            isSelected: false,
          };
          return milestoneObj;
        });
        setMilestoneData(milestoneValues);
        let completionDateValues = Object.values(
          responseJson["Completion date"]
        );
        completionDateValues = completionDateValues.map((completionDate) => {
          let completionDateObj = {
            completionDate: completionDate,
            isSelected: false,
          };
          return completionDateObj;
        });
        setcompletionDateData(completionDateValues);
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
      <Box mt="75px">
        <Text fontSize="large" align={["center", "left"]}>
          Please select the milestone(s) you would like to download
        </Text>
        <Flex wrap="wrap" mt="10px" justify={["center", "flex-start"]}>
          {milestoneData.map((milestone) => (
            <Button
              m="5px"
              value={milestone.milestone}
              onClick={handleMilestoneButtonClick}
              colorScheme={milestone.isSelected === true ? "teal" : "facebook"}
            >
              {milestone.milestone}
            </Button>
          ))}
        </Flex>
      </Box>
      <Box mt="25px">
        <Text fontSize="large" align={["center", "left"]}>
          Please select the completion date you would like to download
        </Text>
        <Flex wrap="wrap" mt="10px" justify={["center", "flex-start"]}>
          {completionDateData.map((completionDate) => (
            <Button
              m="5px"
              value={completionDate.completionDate}
              onClick={handleCompletionDateButtonClick}
              colorScheme={
                completionDate.isSelected === true ? "teal" : "facebook"
              }
            >
              {completionDate.completionDate}
            </Button>
          ))}
        </Flex>
      </Box>
      <Center mt="75px">
        <Button onClick={handleDownload} colorScheme="facebook">
          Download
        </Button>
      </Center>
    </Box>
  );
}

export default App;
