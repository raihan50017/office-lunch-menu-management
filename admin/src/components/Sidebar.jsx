import {
  faDashboard,
  faKeyboard,
  faList,
  faListCheck,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS
import { useEffect, useState } from "react";

function Sidebar({ offcanvasShow, handleOffcanvasClose }) {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <>
      {/* Mobile Menu */}
      <Offcanvas
        className="w-75"
        show={offcanvasShow}
        onHide={handleOffcanvasClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lunch Menu Management</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="side-bar">
            <Link
              onClick={handleOffcanvasClose}
              to="/"
              className={`nav-link px-3 py-2 border-bottom ${
                currentPath === "/" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Link
              onClick={handleOffcanvasClose}
              to="/employee-choice-list"
              className={`nav-link px-3 py-2 border-bottom ${
                currentPath === "/employee-choice-list" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faList} /> Employee Choice List
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Large Screen Menu */}
      <div className="side-bar rounded shasow-sm">
        <Link
          to="/"
          className={`nav-link px-3 py-2 border-bottom ${
            currentPath === "/" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
        <Link
          to="/employee-choice-list"
          className={`nav-link px-3 py-2 border-bottom ${
            currentPath === "/employee-choice-list" ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={faList} /> Employee Choice List
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
