import React from "react";

import styled from "styled-components";

const InfoBox = ({ title, data }) => {
  return (
    <StyledBox>
      <h5>{title}</h5>
      <span>{data}</span>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  span {
    font-size: 2rem;
    padding-top: 0.5rem;
  }
`;
export default InfoBox;
