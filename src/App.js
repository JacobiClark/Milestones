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
      return milestone.milestone == e.target.value
        ? { ...milestone, isSelected: !milestone.isSelected }
        : { ...milestone };
    });
    setMilestoneData(mapped);
    console.log(e.target.value);
  };

  const handleCompletionDateButtonClick = (e) => {
    e.preventDefault();
    setSelectedCompletionDates({ selectedCompletionDate: e.target.value });
  };

  const handleSubmit = () => {
    console.log("post initiated");
    fetch("http://localhost:5000/milestones", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a: 7, str: "Some string: &=&" }),
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
        let milestoneData = Object.values(responseJson.Milestone);
        milestoneData = milestoneData.map((milestone) => {
          let milestoneObj = {
            milestone: milestone,
            isSelected: false,
          };
          return milestoneObj;
        });
        setMilestoneData(milestoneData);
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
      <Button onclick={handleSubmit}>submit</Button>
    </Box>
  );
}

export default App;
