import {
  faPlus,
  faTrash,
  faUpload,
  faCancel,
  faPenToSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import apiClient from "../../hooks/axios";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [formData, setFormData] = useState({ date: "", option_name: "" });
  const [todaysMenuOptions, setTodaysMenuOptions] = useState([]);
  const [error, setError] = useState({});
  const [currentMenuId, setCurrentMenuId] = useState(null);
  const [searchedOptions, setSearcherOptions] = useState([]);
  const [searchDate, setSearchDate] = useState(null);

  useEffect(() => {
    fetchTodaysMenuOptions();
  }, []);

  function formatISODateToYYYYMMDD(isoDateString) {
    const dateObj = new Date(isoDateString);

    // Adjust for Bangladeshi time zone (UTC+6)
    const offset = 6 * 60; // Offset in minutes
    const localTime = dateObj.getTime() + offset * 60 * 1000;
    const bangladeshiDate = new Date(localTime);

    const year = bangladeshiDate.getFullYear();
    const month = String(bangladeshiDate.getMonth() + 1).padStart(2, "0");
    const day = String(bangladeshiDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

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
    } catch (error) {
      console.error("Error fetching menu options:", error);
    }
  };

  const fetchByDateMenuOptions = async () => {
    try {
      if (searchDate) {
        const authData = JSON.parse(localStorage.getItem("auth-data"));
        const response = await apiClient.get(
          `/menu-option/fetch-by-date/${searchDate}`,
          {
            headers: { Authorization: authData?.access_token },
          }
        );
        setSearcherOptions(response?.data?.data);
      } else {
        setSearcherOptions([]);
      }
    } catch (error) {
      console.error("Error fetching menu options:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShow = () => setShowModal(true);

  const handleAddOption = async (e) => {
    e.preventDefault();
    try {
      const authData = JSON.parse(localStorage.getItem("auth-data"));
      await apiClient.post("/menu-option/add", formData, {
        headers: { Authorization: authData?.access_token },
      });
      fetchTodaysMenuOptions();
      handleClose();
    } catch (error) {
      setError(error?.response?.data?.errors);
    }
  };

  const handleDeleteModal = (option) => {
    setDeleteModalShow(true);
    setCurrentMenuId(option.menu_id);
  };

  const handleUpdateModal = (option) => {
    const formattedDate = formatISODateToYYYYMMDD(option?.date);

    setFormData({
      date: formattedDate,
      option_name: option?.option_name,
    });
    setEditModalShow(true);
    setCurrentMenuId(option.menu_id);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditModalShow(false);
    setDeleteModalShow(false);
    setFormData({ date: "", option_name: "" });
  };

  const handleUpdateOption = async (e) => {
    e.preventDefault();
    try {
      const authData = JSON.parse(localStorage.getItem("auth-data"));
      await apiClient.put(`/menu-option/update/${currentMenuId}`, formData, {
        headers: { Authorization: authData?.access_token },
      });
      fetchTodaysMenuOptions();
      fetchByDateMenuOptions();
      handleClose();
    } catch (error) {
      console.error("Error updating menu option:", error);
    }
  };

  const handleDeleteOption = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-data"));
      await apiClient
        .delete(`/menu-option/delete/${currentMenuId}`, {
          headers: { Authorization: authData?.access_token },
        })
        .then(() => {
          setDeleteModalShow(false);
          fetchTodaysMenuOptions();
          fetchByDateMenuOptions();
        });
    } catch (error) {
      console.error("Error deleting menu option:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setSearcherOptions([]);
      await fetchByDateMenuOptions(searchDate);
    } catch (err) {}
  };

  return (
    <div className="px-3">
      <div className="d-flex justify-content-between border-bottom pb-2">
        <h5>Todays Menu</h5>
        <Button size="sm" variant="success" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} /> Add New
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Option Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todaysMenuOptions?.map((option) => (
              <tr key={option.menu_id}>
                <td>{option.option_name}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleUpdateModal(option)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>{" "}
                    Edit
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteModal(option)}
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-3">
        <h5 className="text-center border-bottom p-2 m-0">
          Search options by date
        </h5>
        <Form method="post" onSubmit={handleSearch}>
          <div className="d-flex align-items-center justify-content-center p-2 bg-light border">
            <Form.Group>
              <Form.Control
                size="sm"
                type="date"
                onChange={(e) => setSearchDate(e.target.value)}
                name="search-date"
                required
              ></Form.Control>
            </Form.Group>
            <Button
              className="ms-1"
              size="sm"
              type="submit"
              name="submit"
              variant="success"
            >
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Search
            </Button>
          </div>
        </Form>

        {searchedOptions.length == 0 ? (
          <h6 className="mt-2 text-center text-danger">No data..</h6>
        ) : (
          <Table className="mt-2" striped bordered hover>
            <thead>
              <tr>
                <th>Option Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchedOptions?.map((option) => (
                <tr key={option.menu_id}>
                  <td>{option.option_name}</td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleUpdateModal(option)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>{" "}
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteModal(option)}
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal for adding new menu option */}
      <Modal show={showModal} onHide={handleClose}>
        <Form method="post" onSubmit={handleAddOption}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Add New Menu Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Option Name</Form.Label>
              <Form.Control
                type="text"
                name="option_name"
                value={formData.option_name}
                onChange={handleChange}
                placeholder="Enter option name"
              />
              <span className="text-danger">{error?.option_name}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <span className="text-danger">{error?.date}</span>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon> Close
            </Button>
            <Button type="submit" name="submit" size="sm" variant="success">
              <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon> Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal for editing menu option */}
      <Modal show={editModalShow} onHide={handleClose}>
        <Form method="post" onSubmit={handleUpdateOption}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Edit Menu Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Option Name</Form.Label>
              <Form.Control
                type="text"
                name="option_name"
                value={formData.option_name}
                onChange={handleChange}
                placeholder="Enter option name"
              />
              <span className="text-danger">{error?.option_name}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <span className="text-danger">{error?.date}</span>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon> Close
            </Button>
            <Button type="submit" name="submit" size="sm" variant="success">
              <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon> Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal for delete menu option */}
      <Modal show={deleteModalShow} onHide={handleClose}>
        <Form method="post" onSubmit={handleUpdateOption}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Delete Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-danger">Are your to delete this !!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon> Close
            </Button>
            <Button onClick={handleDeleteOption} size="sm" variant="danger">
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Home;
