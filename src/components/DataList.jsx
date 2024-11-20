import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sortImg from "../assets/sort-img.png";

const DataList = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");

  const [order, setOrder] = useState("ASC"); //for sorting

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get("http://localhost:3000/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  const deleteHandle = (id) => {
    axios
      .delete("http://localhost:3000/user/" + id)
      .then((res) => getUserData());
  };

  const sortData = (col) => {
    if (order === "ASC") {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div className="marginTLRB">
      <Link to="/" className="btn btn-info">
        Home
      </Link>
      <h2 className="pb-4 text-center">User Data Table</h2>
      <div className="col-md-3">
        <input
          type="text"
          placeholder="seacrh..."
          className="form-control mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th onClick={() => sortData("name")} style={{ cursor: "pointer" }}>
              Name{" "}
              <img src={sortImg} style={{ width: "25px", height: "auto" }} />
            </th>
            <th>Age</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user
            .filter((item) =>
              search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search)
            )
            .map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.details}</td>
                <td>
                  <Link className="btn btn-success" to={`/read/${item.id}`}>
                    Veiw
                  </Link>
                  <Link
                    className="btn btn-primary mx-3"
                    to={`/edit/${item.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteHandle(item.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
