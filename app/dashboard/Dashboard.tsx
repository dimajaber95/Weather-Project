"use client";

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]); // This should be your fetched list

  const filteredList = list.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  console.log(search)



  return (
    <Container>
      <Row>
        <Col>
        <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      {filteredList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
        </Col>
      </Row>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
