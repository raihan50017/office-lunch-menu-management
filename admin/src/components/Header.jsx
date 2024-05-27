import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Dropdown, Button, Container } from "react-bootstrap";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Header({ handleOffcanvasShow }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("admin-auth-data");
    navigate("/auth/login");
  };
  return (
    <div
      className="position-sticky top-0"
      style={{ backgroundColor: "#c1121f", zIndex: "1000" }}
    >
      <Container>
        <div className="d-flex align-items-center justify-content-between  py-2  text-white shadow-sm">
          <div>
            <h4 className="m-0 d-none d-md-block">Logo</h4>
            <Button
              variant="primary d-block d-md-none p-0 m-0 bg-transparent border-0 rounded-0"
              onClick={handleOffcanvasShow}
            >
              <FontAwesomeIcon className="fs-3" icon={faBars}></FontAwesomeIcon>
            </Button>
          </div>
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                className="m-0 p-0 rounded-circle"
                variant="transparent"
                id="dropdown-basic"
              >
                <FontAwesomeIcon
                  className="text-white"
                  style={{ fontSize: "30px" }}
                  icon={faCircleUser}
                ></FontAwesomeIcon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
