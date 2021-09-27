import { Center, Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import MilestoneSelector from "./MilestoneSelector";

function FileSelector() {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileSelect = (event) => {
    console.log(event.target.files[0].path);
    setSelectedFile(event.target.files[0].path);
  };

  const removeSelectedFile = () => {
    setSelectedFile("");
  };

  if (!selectedFile) {
    return (
      <VStack mt="75px" spacing={8}>
        <Box>
          <Text fontSize="large" align="center">
            Please choose the excel file you would like to select Milestones
            from:
          </Text>
        </Box>
        <Box>
          <input
            type="file"
            name="file"
            title=" "
            onChange={handleFileSelect}
          />
        </Box>
      </VStack>
    );
  }
  return (
    <Box>
      <MilestoneSelector selectedFile={selectedFile} />
      <Center>
        <Button mt="35px" onClick={removeSelectedFile}>
          Import New File
        </Button>
      </Center>
    </Box>
  );
}

export default FileSelector;
