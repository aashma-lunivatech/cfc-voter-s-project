import React from "react";
import styled from "styled-components";

const Idcard = (props) => {
  console.log(props, "props");
  return (
    <IdCardPage>
      <div>
        <div className="card-section">
          <p>
            Name:
            <span>{props.data.Member}</span>
          </p>
          <p>
            Mobile No:
            <span>{props.data.MobileNo}</span>
          </p>
          <p>
            CurrentAddress No:
            <span>{props.data.Address}</span>
          </p>
          <p>
            MemberShipCode:
            <span>{props.data.MemberCode}</span>
          </p>
          <p>
            MembershipExpiryDate:
            <span>{props.data.MembershipExpiryDate}</span>
          </p>
        </div>
      </div>
    </IdCardPage>
  );
};

export default Idcard;
const IdCardPage = styled.div`
  .card-section {
    display: grid;
    justify-content: center;
  }
  span {
    margin-left: 10px;
  }
`;
