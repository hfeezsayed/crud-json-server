import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ReadData = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="card m-auto mt-5" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Name: {data.name}</h5>
          <h5 className="card-title">Age: {data.age}</h5>
          <p className="card-text">{data.details}</p>
          <Link to="/userlist" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadData;
