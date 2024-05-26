import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiClient from "../../../../client/src/hooks/axios";
import { Table } from "react-bootstrap";

function EmployeeChoiceList() {
  const [todahysChoiceList, setTodaysChoiceList] = useState([]);

  useEffect(() => {
    fetchTodaysChoiceList();
  }, []);

  const fetchTodaysChoiceList = async () => {
    try {
      apiClient
        .get("/employee-choice/fetch-all-by-current-date")
        .then((response) => {
          setTodaysChoiceList(response?.data?.data);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <div className="px-3">
      <h5 className="bg-success text-white p-2 text-center">
        Todays Choice List
      </h5>
      {todahysChoiceList?.length === 0 ? (
        <p className="text-danger text-center">No data found..</p>
      ) : (
        <Table border={1} striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Choosen Item</th>
            </tr>
          </thead>
          <tbody>
            {todahysChoiceList?.map((option, index) => (
              <tr key={option.menu_id}>
                <td>{index}</td>
                <td>
                  {option.first_name} {option.last_name}
                </td>
                <td>{option.option_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default EmployeeChoiceList;
