import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUsers = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [ref, setRef] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://patientnumber.onrender.com/", { name, room, ref })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Patient Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Room No.</label>
            <input
              type="number"
              placeholder="Enter Room No."
              className="form-control"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Ref</label>
            <input
              type="text"
              placeholder="Enter Ref Value"
              className="form-control"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
          {/* <button className="btn btn-success ms-2">Reset</button> */}
          <Link to="/">
            <button className="btn btn-success ms-2">Home</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateUsers;
