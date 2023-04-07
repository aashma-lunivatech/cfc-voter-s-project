import { Divider, Input, Modal, Button } from "antd";
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
  useEffect(() => {
    console.log(inputValue, "inputvalue");
    if (!searchTerm || inputValue) {
      // perform your API search here
      async function fetchData() {
        const response = await fetch(
          "https://lunivacare.ddns.net/CFCMemberService/LunivaCFCMemApi/GetMemberListForElection?searchby=Name&searchparameter=Sure"
        );
        const datas = await response.json();
        console.log(datas.memberlist, "datas");
        setData(datas.memberlist);
        setFinaldata(datas.memberlist);
      }
      fetchData();
    }
  }, [searchTerm]);
  useEffect(() => {
    const datasource = selectedvalue ? filteredData : null;
    setFinalStore(datasource);
  });
  const handleInputClear = (e) => {
    console.log("i ama cleared");
    setQuery("");
  };
  const handleKeyDown = (e) => {
    console.log(e, "handlekeydowne");
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setQuery(e.target.value);

    const inputValues = e.target.value;
    setInputValue(inputValues);
    const inputValue = e.target.value.toLowerCase();
    console.log(inputValue, "userinput");
    const filteredData = data.filter((item) => {
      if (selectedvalue == "Mobile") {
        const Mobile = item.MobileNo.toString().toLowerCase();
        return Mobile.includes(inputValue);
      } else if (selectedvalue == "Member") {
        const Member = item.Member.toString().toLowerCase();
        return Member.includes(inputValue);
      } else if (selectedvalue == "MemberCode") {
        const MemberCode = item.MemberCode.toString().toLowerCase();
        return MemberCode.includes(inputValue);
      } else {
        const FName = item.Member.toString().toLowerCase();
        return FName.includes(inputValue);
      }
    });
    setInputValue(inputValue);
    setData(filteredData);
    setFilteredData(filteredData);
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
  useEffect(() => {
    console.log(selectedvalue, "selectedvalue");
  });
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
    },

    {
      title: "DOB",
      dataIndex: "DOB",
      key: "DOB",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              console.log(record, "recordofselectedfiled");
              setrecorddata(record);
              showModal();
            }}
          >
            View
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeaders>
        <Searchbar>
          <p
            style={{
              whiteSpace: "nowrap",
              marginLeft: "8px",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Search By:
          </p>
          <Select
            // defaultValue="none"
            style={{
              width: "30%",
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
                id: 3,
                value: "Citizenship",
                label: "Citizenship",
              },
              {
                id: 4,
                value: "MemberCode",
                label: "MemberCode",
              },
            ]}
          />
          <Input
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={query}
            onClear={handleInputClear}
            style={{
              width: "30%",
              height: "40px",
              marginTop: "16px",
              padding: "6px",
              fontSize: "24px",
            }}
            placeholder="Search Here"
          />
        </Searchbar>
        <Divider orientation="right" plain></Divider>
      </PageHeaders>
      {searchTerm ? (
        <Tablebody>
          <Table columns={columns} dataSource={finalstore} />
        </Tablebody>
      ) : (
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Hello and welcome to the search page, Look up your item and see what
          comes up.
        </h2>
      )}
      <Modal
        footer={null}
        width={500}
        style={{ height: "500px" }}
        title="Identity Card"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Idcard data={recorddata} />
      </Modal>
    </div>
  );
};
export default PageHeader;
const PageHeaders = styled.div`
  padding: 5px;
  justify-content: center;
`;
const Tablebody = styled.div`
  background: rgb(254, 254, 254);
  box-shadow: rgba(31, 38, 135, 0.17) 0px 2px 22px 0px;
  backdrop-filter: blur(4px);
  /* border-radius: 10px; */
  margin: 10px;
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
