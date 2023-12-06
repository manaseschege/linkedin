import React from "react";

import { Space, Spin } from "antd";
export default function () {
  return (
    <div className="loader">
      <p>loading..please wait..</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
