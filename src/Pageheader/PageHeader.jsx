import { Divider, Input, Modal, Button, Col } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Space, Table, Tag } from "antd";
import Idcard from "../IdCard/Idcard";
import { Select } from "antd";
const PageHeader = () => {
  const [inputValue, setInputValue] = useState([]);
  const [recorddata, setrecorddata] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState();
  const [finaldatasave, setFinaldata] = useState();
  const [query, setQuery] = useState(data);
  const [finalstore, setFinalStore] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   // console.log(inputValue, "inputvalue");
  //   if (!searchTerm || inputValue) {
  //     async function fetchData() {
  //       const response = await fetch(
  //         "https://lunivacare.ddns.net/CFCMemberService/LunivaCFCMemApi/GetMemberListForElection?searchby=Name&searchparameter=Sure"
  //       );
  //       const datas = await response.json();

  //       const removedTime = datas.memberlist.map((i) => i.DOB.split("T")[0]);

  //       setData(datas.memberlist);
  //       setFinaldata(datas.memberlist);
  //     }
  //     fetchData();
  //   }
  // }, [searchTerm]);
  // useEffect(() => {
  //   const datasource = selectedvalue ? filteredData : null;
  //   setFinalStore(datasource);
  // });
  const handleInputClear = (e) => {
    setQuery("");
  };
  const handleKeyDown = (e) => {
    console.log(e, "handlekeydowne");
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setQuery(e.target.value);

    // const inputValues = e.target.value;
    // setInputValue(inputValues);
    // const inputValue = e.target.value.toLowerCase();

    // const filteredData = data.filter((item) => {
    //   if (selectedvalue == "Mobile") {
    //     const Mobile = item.MobileNo.toString().toLowerCase();
    //     return Mobile.includes(inputValue);
    //   } else if (selectedvalue == "Member") {
    //     const Member = item.Member.toString().toLowerCase();
    //     return Member.includes(inputValue);
    //   } else if (selectedvalue == "MemberCode") {
    //     const MemberCode = item.MemberCode.toString().toLowerCase();
    //     return MemberCode.includes(inputValue);
    //   } else {
    //     const FName = item.Member.toString();
    //     return FName.includes(inputValue);
    //   }
    // });
    // setInputValue(inputValue);
    // setData(filteredData);
    // setFilteredData(filteredData);
  };

  const showModal = (record) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setSelectedvalue(value);
    console.log(value, "value");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Member",
      key: "Member",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age ",
      dataIndex: "Age",
      key: "Age",
    },
    {
      title: "MobileNo",
      dataIndex: "MobileNo",
      key: "MobileNo",
    },
    {
      title: "MemberCode",
      dataIndex: "MemberCode",
      key: "MemberCode",
    },
    {
      title: "MembershipExpiryDate",
      dataIndex: "MembershipExpiryDate",
      key: "MembershipExpiryDate",
      render: (_, record) => (
        <div>{record.MembershipExpiryDate.split("T")[0]}</div>
      ),
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "MembershipDate",
      dataIndex: "MembershipDate",
      key: "MembershipDate",
      render: (_, record) => <div>{record.MembershipDate.split("T")[0]}</div>,
    },

    {
      title: "DOB",
      dataIndex: "DOB",
      key: "DOB",
      render: (_, record) => <div>{record.DOB.split("T")[0]}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Buttoncom>
          <Space size="middle">
            <div
              onClick={() => {
                setrecorddata(record);
                showModal();
              }}
              style={{ color: "white" }}
            >
              View
            </div>
          </Space>
        </Buttoncom>
      ),
    },
  ];

  const CallService = (e) => {
    e.preventDefault();
    setData();
    async function fetchData() {
      const response = await fetch(
        `https://lunivacare.ddns.net/CFCMemberService/LunivaCFCMemApi/GetMemberListForElection?searchby=${selectedvalue}&searchparameter=${searchTerm}`
      );

      const datas = await response.json();

      const removedTime = datas.memberlist.map((i) => i.DOB.split("T")[0]);

      setData(datas.memberlist);
      setFinaldata(datas.memberlist);
    }
    fetchData();
  };

  return (
    <PageHeaderComponent>
      <PageHeaders>
        <Searchbar>
          <p className="searchby" style={{}}>
            Search By:
          </p>
          <form onSubmit={CallService}>
            <Select
              // defaultValue="none"

              style={{
                width: "35%",
                margin: 10,
                height: "50px",
                padding: "6px",
              }}
              onChange={handleChange}
              options={[
                {
                  id: 1,
                  value: "Name",
                  label: "Name",
                },
                {
                  id: 2,
                  value: "Mobile",
                  label: "Mobile",
                },

                {
                  id: 4,
                  value: "MemberCode",
                  label: "MemberCode",
                },
              ]}
            />
            <Input
              className="input-filed"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={query}
              onClear={handleInputClear}
              style={{
                width: "30%",
                height: "40px",
                marginTop: "16px",
                padding: "6px",
                fontSize: "16px",
              }}
              placeholder="Search "
            />
            <button
              type="submit"
              style={{
                padding: 0,
                height: 40,
                alignSelf: "center",
                marginLeft: "10px",
                padding: "2px 14px",
                backgroundColor: "#1d92ff",
                color: "white",
                cursor: "pointer",
                borderRadius: "6px",
                border: "none",
              }}
            >
              Search
            </button>
          </form>
        </Searchbar>
        <Divider orientation="right" plain></Divider>
      </PageHeaders>
      {searchTerm ? (
        <Tablebody>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Tablebody>
      ) : (
        <h3
          className="display-text"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Welcome to the search page, Look up your item and see what comes up.
        </h3>
      )}
      <Modal
        footer={null}
        // width={500}
        style={{ marginBottom: "450px" }}
        wrapClassName="ant-modal-centered"
        title="Identity Card"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Idcard data={recorddata} />
      </Modal>

      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: "8px",
          borderTop: "1px solid lightgrey",
        }}
      >
        <div style={{ fontSize: 16 }}>Powered by </div>
        <img
          src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2motjI5uJzUekAeuwejbcKj8FGgz22m0igg&usqp=CAU"
          style={{ width: "5%", marginLeft: 10 }}
        />
      </div>
    </PageHeaderComponent>
  );
};
export default PageHeader;
const PageHeaderComponent = styled.div`
  @media screen and (max-width: 480px) {
    .searchby {
      font-size: 18px !important;
      margin-top: 24px !important;
    }
  }
  .searchby {
    white-space: nowrap;
    font-size: 20px;
    font-weight: bold;
    margin-left: 8px;
  }
`;
const PageHeaders = styled.div`
  padding: 5px;
  justify-content: center;
`;
const Tablebody = styled.div`
  background: rgb(254, 254, 254);
  box-shadow: rgba(31, 38, 135, 0.17) 0px 2px 22px 0px;
  /* backdrop-filter: blur(4px); */
  /* border-radius: 10px; */
  margin: 10px;
  margin-bottom: 90px;
  /* border: 5px solid #d1cbcb; */
`;
const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgb(254, 254, 254);
  box-shadow: rgba(31, 38, 135, 0.17) 0px 2px 22px 0px;
  backdrop-filter: blur(4px);
  border-radius: 10px;
`;

const Buttoncom = styled.div`
  background-color: #1d92ff;
  border-radius: 4px;
  padding: "5px 10px";
  text-align: center;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #1051b8;
  }
`;
