import React from "react";
import { BeeCard } from "@webeetle/bee-theme";
import BeeCardHeader from "@webeetle/bee-theme/core/components/Card/BeeCardHeader";
import BeeCardBody from "@webeetle/bee-theme/core/components/Card/BeeCardBody";

const Card = ({ header, children }) => {
  return (
    <React.Fragment>
      <BeeCard>
        <BeeCardHeader color="secondary">{header}</BeeCardHeader>
        <BeeCardBody>{children}</BeeCardBody>
      </BeeCard>
    </React.Fragment>
  );
};

export default Card;
