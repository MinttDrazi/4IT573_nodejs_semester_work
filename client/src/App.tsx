import "./App.css";
import axios from "axios";

//data will be the string we send from our server
const apiCall = () => {
  axios.get("http://localhost:3000").then((data) => {
    //this console.log will be in our frontend console
    console.log(data);
  });
};

function App() {
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={apiCall}>Make API Call</button>
    </div>
  );
}

export default App;
