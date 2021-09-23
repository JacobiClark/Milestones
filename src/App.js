import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

import "./App.css";

function App() {
  const [selectedMilestones, setSelectedMilestones] = useState([]);
  const [selectedCompletionDates, setSelectedCompletionDates] = useState({});

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
    console.log(mapped);
    setMilestoneData(mapped);
  };

  const handleCompletionDateButtonClick = (e) => {
    e.preventDefault();
    setSelectedCompletionDates({ selectedCompletionDate: e.target.value });
  };
  console.log(selectedMilestones);

  const handleSubmit = () => {
    console.log("post initiated");
    fetch("http://localhost:5000/milestones", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Milestone: { 0: "Milestone 69", 1: "Milestone 2" },
        "Completion date": {
          0: "2022-01-15",
          1: "2022-02-15",
          2: "2022-03-15",
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5000/milestones");
        const responseJson = await response.json();
        console.log(responseJson);
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

        const completionDateData = Object.values(
          responseJson["Completion date"]
        );
        setcompletionDateData(completionDateData);
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
      <Flex>
        {milestoneData.map((milestone) => (
          <Button
            value={milestone.milestone}
            onClick={handleMilestoneButtonClick}
            colorScheme={milestone.isSelected === true ? "teal" : "facebook"}
          >
            {milestone.milestone}
          </Button>
        ))}
      </Flex>
      <Flex>
        {completionDateData.map((completionDate) => (
          <Button
            value={completionDate}
            onClick={handleCompletionDateButtonClick}
            colorScheme={
              selectedCompletionDates.selectedCompletionDate === completionDate
                ? "teal"
                : "facebook"
            }
          >
            {completionDate}
          </Button>
        ))}
      </Flex>
      <Button onClick={handleSubmit}>submit</Button>
    </Box>
  );
}

export default App;
