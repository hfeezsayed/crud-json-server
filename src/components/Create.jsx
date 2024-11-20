import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    details: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/user", userData)
      .then((res) => {
        setUserData(res);
        navigate("/userlist");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div className="text-center mt-3">
          <h2 className="pb-4">Create User</h2>
          <form onSubmit={handleSubmit}>
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
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
