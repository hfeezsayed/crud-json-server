import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    details: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/" + id)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/user/" + id, userData)
      .then((res) => {
        setUserData(res.data);
        navigate("/userlist");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div className="text-center mt-3">
          <h2 className="pb-4">Edit User</h2>
          <form onSubmit={handleUpdate}>
            <div className="col-md-4 m-auto">
              <input
                type="text"
                name="name"
                value={userData.name}
                placeholder="name...."
                className="form-control mb-2"
                onChange={handleChange}
              />
              <input
                type="num"
                name="age"
                value={userData.age}
                placeholder="age...."
                className="form-control mb-2"
                onChange={handleChange}
              />
              <textarea
                rows={2}
                typeof="text"
                name="details"
                value={userData.details}
                placeholder="details...."
                className="form-control mb-2"
                onChange={handleChange}
              />
              <Link className="btn btn-success mx-3" to="/userlist">
                Back
              </Link>
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
