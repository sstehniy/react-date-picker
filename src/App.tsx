import React from "react";
import styled from "styled-components";
import DatePicker from "./components/DatePicker";

const StyledApp = styled.div`
  min-height: 100vh;
  background-color: #c8e1f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <StyledApp>
      <DatePicker />
    </StyledApp>
  );
};

export default App;
