import React from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
      "@media (max-width: 767px)": {
        fontSize: "39px",
      },
      "@media (max-width: 467px)": {
        fontSize: "29px",
      },
    }}
  />
);

const onSearch = (value) => console.log(value);

export default function Searchinput() {
  return (
    <>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton="Search"
        />
      </Space>
    </>
  );
}
