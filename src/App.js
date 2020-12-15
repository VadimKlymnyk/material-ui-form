import "./App.css";
import { Applicants } from "./components/Applicants";
import { Client } from "./components/Client";

function App() {

  return (
    <div className="App">
      <Client/>
      <Applicants/>
    </div>
  );
}

export default App;
