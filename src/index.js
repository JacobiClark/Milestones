import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./theme";
import Banner from "./components/Banner";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg" pl="2%" pr="2%">
        <Banner />
        <App />
      </Container>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
