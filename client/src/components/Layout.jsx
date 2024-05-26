import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function Layout() {
  const handleOffcanvasShow = () => setOffcanvasShow(true);
  return (
    <>
      <Header handleOffcanvasShow={handleOffcanvasShow}></Header>
      <Container>
        <Outlet></Outlet>
      </Container>
    </>
  );
}

export default Layout;
