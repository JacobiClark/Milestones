import { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Center } from "@chakra-ui/react";

import readXlsxFile from "read-excel-file";

import "./App.css";
import MilestoneSelecter from "./components/MilestoneSelecter";

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    console.log(event.target.files[0].path);
    setSelectedFile(event.target.files[0].path);
    setIsSelected(true);
  };

  const handleSubmission = () => {};

  if (!isSelected) {
    return (
      <Center>
        <div>
          <input type="file" name="file" onChange={changeHandler} />
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
        </div>
      </Center>
    );
  }
  return <MilestoneSelecter selectedFile={selectedFile} />;
}

export default App;
