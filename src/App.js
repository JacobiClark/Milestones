import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

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

  const handleSubmit = () => {
    const post = {};
    const selectedMilestones = milestoneData.filter(
      (milestone) => milestone.isSelected === true
    );
    const formattedSelectedMilestones = {};
    for (let i = 0; i < selectedMilestones.length; i++) {
      formattedSelectedMilestones[i] = selectedMilestones[i].milestone;
    }
    post.Milestone = formattedSelectedMilestones;
    const selectedCompletionDates = completionDateData.filter(
      (completionDate) => completionDate.isSelected === true
    );
    const formattedCompletionDates = {};
    for (let i = 0; i < selectedCompletionDates.length; i++) {
      formattedCompletionDates[i] = selectedCompletionDates[i].completionDate;
    }
    post["Completion date"] = formattedCompletionDates;
    console.log("post initiated");
    fetch("http://localhost:5000/milestones", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
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
  const post = {};
  const selectedMilestones = milestoneData.filter(
    (milestone) => milestone.isSelected === true
  );
  const formattedSelectedMilestones = {};
  for (let i = 0; i < selectedMilestones.length; i++) {
    formattedSelectedMilestones[i] = selectedMilestones[i].milestone;
  }
  post.Milestone = formattedSelectedMilestones;
  const selectedCompletionDates = completionDateData.filter(
    (completionDate) => completionDate.isSelected === true
  );
  const formattedCompletionDates = {};
  for (let i = 0; i < selectedCompletionDates.length; i++) {
    formattedCompletionDates[i] = selectedCompletionDates[i].completionDate;
  }
  post["Completion date"] = formattedCompletionDates;
  console.log(post);
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
      <Button onClick={handleSubmit}>submit</Button>
    </Box>
  );
}

export default App;
