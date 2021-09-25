import { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";

import readXlsxFile from "read-excel-file";

import "./App.css";

function App() {
  const [milestoneData, setMilestoneData] = useState([]);
  const [completionDateData, setcompletionDateData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    readXlsxFile(event.target.files[0]).then((rows) => {
      console.log(rows);
    });
    setIsSelected(true);
  };

  const handleSubmission = () => {};

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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //Make fetch request to back-end
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
    return <center mt="50px">Error loading application.</center>;
  }

  if (isLoading) {
    return <center mt="50px">Loading application...</center>;
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
      <div>
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
            <p>foo</p>
            <p>{JSON.stringify(selectedFile)}</p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </Box>
  );
}

export default App;
