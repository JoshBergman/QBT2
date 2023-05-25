import React from "react";
import "./App.css";
import SectionCard from "./Components/UI/PageElements/SectionCard";
import Header from "./Components/UI/Header/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <SectionCard sectionID="test">
        <h1>Important Text</h1>
      </SectionCard>
    </React.Fragment>
  );
}

export default App;
