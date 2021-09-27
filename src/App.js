import FileSelector from "./components/FileSelector";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={FileSelector} />
    </Switch>
  );
}

export default App;
