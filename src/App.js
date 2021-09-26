import { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";
import MilestoneSelecter from "./components/MilestoneSelecter";

function App() {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileSelect = (event) => {
    console.log(event.target.files[0].path);
    setSelectedFile(event.target.files[0].path);
  };

  const removeSelectedFile = () => {
    setSelectedFile("");
  };

  const handleSubmission = () => {};

  if (!selectedFile) {
    return (
      <Center>
        <input type="file" name="file" onChange={handleFileSelect} />
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </Center>
    );
  }
  return (
    <Box>
      <MilestoneSelecter selectedFile={selectedFile} />
      <Button onClick={removeSelectedFile} />
    </Box>
  );
}

export default App;
