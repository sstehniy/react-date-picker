import React, { useState, useCallback } from "react";
import styled from "styled-components";
import DatePicker from "./components/DatePicker";
import Button from "./components/shared/Button";

const StyledApp = styled.div`
  min-height: 100vh;
  background-color: #c8e1f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const App = (): JSX.Element => {
  const [date, setDate] = useState({});

  const handleSetDate = useCallback((date: any) => {
    setDate(date);
  }, []);

  return (
    <StyledApp>
      {/* <DatePicker getDate={handleSetDate} /> */}
      {/*<ButtonsExpose />*/}
    </StyledApp>
  );
};

const ButtonsExpose = () => {
  return (
    <div
      style={{
        padding: "15pz 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button primary large>
        Primary
      </Button>
      <Button danger normal>
        Danger
      </Button>
      <Button secondary small>
        Secondary
      </Button>
    </div>
  );
};

export default App;
