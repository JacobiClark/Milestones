import {
  Center,
  Text,
  Box,
  Flex,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function MilestoneSelector(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [milestoneData, setMilestoneData] = useState([]);
  const [completionDateData, setcompletionDateData] = useState([]);

  const handleMilestoneButtonClick = (e) => {
    e.preventDefault();
    let updatedMilestones = milestoneData.map((milestone) => {
      return milestone.milestone === e.target.value
        ? { ...milestone, isSelected: !milestone.isSelected }
        : { ...milestone };
    });
    setMilestoneData(updatedMilestones);
  };

  const handleCompletionDateButtonClick = (e) => {
    e.preventDefault();
    const updatedCompletionDates = completionDateData.map((completionDate) => {
      return completionDate.completionDate === e.target.value
        ? { ...completionDate, isSelected: !completionDate.isSelected }
        : { ...completionDate, isSelected: false };
    });
    setcompletionDateData(updatedCompletionDates);
  };

  const handleDownload = () => {
    setIsDownloaded(false);
    //Create obj which will contain post data
    const selectedMilestonePost = {};
    const selectedMilestones = milestoneData.filter(
      (milestone) => milestone.isSelected === true
    );
    const formattedSelectedMilestones = {};
    //Create indexed selected milestone objects
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
    //Create indexed selected completion date objects
    for (let i = 0; i < selectedCompletionDates.length; i++) {
      formattedCompletionDates[i] = selectedCompletionDates[i].completionDate;
    }
    selectedMilestonePost[
      "Selected Completion Date"
    ] = formattedCompletionDates;

    //Make post request to back-end
    fetch("http://localhost:5000/milestones", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedMilestonePost),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsDownloaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  useEffect(() => {
    const retrievemilestones = async () => {
      setIsLoading(true);
      //Make fetch request to back-end
      try {
        const response = await fetch(
          "http://localhost:5000/retrievemilestones",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filePath: props.selectedFile }),
          }
        );
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
    retrievemilestones();
  }, [props.selectedFile]);

  if (isError) {
    return <Center mt="50px">Error loading application.</Center>;
  }

  if (isLoading) {
    return <Center mt="50px">Importing your Excel data...</Center>;
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
      {isDownloaded && (
        <Center>
          <Alert
            w="600px"
            mt="15px"
            status="success"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon />
            Your selected milestones were successfully downloaded!
          </Alert>
        </Center>
      )}
    </Box>
  );
}

export default MilestoneSelector;
