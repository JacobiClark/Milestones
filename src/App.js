import FileSelecter from "./components/FileSelecter";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={FileSelecter} />
    </Switch>
  );
}

export default App;
