import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "./components/DatePicker";

const StyledApp = styled.div`
  min-height: 100vh;
  background-color: #c8e1f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = (): JSX.Element => {
  const [date, setDate] = useState({});
  return (
    <StyledApp>
      <DatePicker
        getDate={date => {
          setDate(date);
        }}
      />
    </StyledApp>
  );
};

export default App;
