import React, { useState } from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState("");

  const callHelloAPi = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/home");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const callAddAPi = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/api/add/${data}`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const callDeleteAPi = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/api/delete/${data}`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEmailChange = ({ target }) => {
    setData(target.value);
  };

  function onClickAdd() {
    console.log("add:" + data);
    callAddAPi();
  }

  function onClickDelete() {
    console.log("delete:" + data);
    callDeleteAPi();
  }

  return (
    
    <div className="App" style={{backgroundColor:"tomato"}} >
      <div className="container" style={{textAlign: "center",backgroundColor:"#8EE4AF",height:"100vh"}}>
      <h1>Welcome to byjus, Enter your Email</h1>
      {/* <button className="btn btn-info" onClick={callHelloAPi}>Click here</button> */}
      <br/>
      <div>
        <input
          value={data}
          onChange={handleEmailChange}
          placeholder="enter email"
          name="email"
          type="email"
          required
        />
        <br />
        <br/>
        <button className="btn btn-primary mr-2" onClick={onClickAdd}>add </button>

        <button className="btn btn-danger mr-2" onClick={onClickDelete}>delete </button>
      </div>
      </div>
    </div>
  );
}

export default App;
