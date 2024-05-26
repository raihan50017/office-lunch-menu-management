import { Row, Col, Table, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import apiClient from "../../hooks/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
function Home() {
  const [todaysMenuOptions, setTodaysMenuOptions] = useState([]);
  const [choosedOption, setChoosedOption] = useState(null);
  const [currentMenuId, setCurrentMenuId] = useState(null);

  useEffect(() => {
    fetchTodaysMenuOptions();
    fetchSingleChoice();
  }, []);

  const fetchTodaysMenuOptions = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-data"));
      const response = await apiClient.get(
        "/menu-option/fetch-by-current-date",
        {
          headers: { Authorization: authData?.access_token },
        }
      );
      setTodaysMenuOptions(response?.data?.data);
    } catch (error) {}
  };

  const fetchSingleChoice = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-data"));
      const response = await apiClient.get(
        "/employee-choice/fetch-single-by-current-date",
        {
          headers: { Authorization: authData?.access_token },
        }
      );

      setChoosedOption(response?.data?.data[0]);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMenuId) {
        const authData = JSON.parse(localStorage.getItem("auth-data"));
        apiClient
          .post(
            "/employee-choice/add",
            {
              menu_id: currentMenuId,
            },
            {
              headers: { Authorization: authData?.access_token },
            }
          )
          .then((response) => {
            fetchSingleChoice();
          })
          .catch((error) => {});
      }
    } catch (error) {}
  };

  return (
    <Row className="mt-3">
      <Col md={6}>
        <div className="border-bottom p-2 bg-success text-white">
          <h5 className="text-center m-0 shadow-sm ">Your Choice</h5>
        </div>
        {choosedOption ? (
          <Table>
            <thead></thead>
            <tbody>
              <tr>
                <td>{choosedOption?.option_name}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-danger">Not choosen yet</p>
        )}

        <div className="border p-2 mt-5">
          <h5 className="text-center">Choose</h5>
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Select an Option:</Form.Label>
              <Form.Control
                size="sm"
                as="select"
                required
                onChange={(e) => setCurrentMenuId(e.target.value)}
              >
                <option value="option1">--Select--</option>
                {todaysMenuOptions.map((option) =>
                  option.menu_id == choosedOption?.menu_id ? (
                    <option
                      key={option?.menu_id}
                      value={option?.menu_id}
                      selected
                    >
                      {option?.option_name}
                    </option>
                  ) : (
                    <option key={option?.menu_id} value={option?.menu_id}>
                      {option?.option_name}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
            <Button
              size="sm"
              className="mt-2"
              variant="success"
              type="submin"
              name="submit"
            >
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Save
            </Button>
          </Form>
        </div>
      </Col>
      <Col md={6}>
        {" "}
        <div className="px-3  mb-2">
          <div className="text-center bg-success text-light border-bottom p-2">
            <h5 className="text-center m-0">Todays Menu</h5>
          </div>
          <div>
            {todaysMenuOptions?.length === 0 ? (
              <p className="text-center text-danger">No data found</p>
            ) : (
              <Table>
                <thead></thead>
                <tbody>
                  {todaysMenuOptions?.map((option) => (
                    <tr key={option.menu_id}>
                      <td className="shadow-sm">
                        <FontAwesomeIcon
                          icon={faArrowCircleRight}
                        ></FontAwesomeIcon>{" "}
                        {option.option_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Home;
