import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [postValue, setPostValue] = useState("");
  const [sort, setSort] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  let data = users.filter(
    (item) =>
      item.name.toLowerCase().includes(inputValue.trim().toLowerCase()) ||
      item.room.toString().includes(inputValue.trim().toString())
  );

  let data3 = [];
  if (sort == true) {
    data3 = data.sort((a, b) => a.room - b.room);
  } else {
    data3 = data.sort((a, b) => b.room - a.room);
  }
  const currentData = data3.slice(firstPostIndex, lastPostIndex);
  // console.log("Data3", data3);

  const handleDelete = (id) => {
    axios
      .delete("https://patientnumber.onrender.com/" + id)
      .then(() => window.location.reload());
  };
  useEffect(() => {
    axios
      .get("https://patientnumber.onrender.com/")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-start">
      <div className="bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <button className="btn btn-info ms-2" onClick={() => setSort(!sort)}>
          {sort == false ? "A-Z" : "Z-A"}
        </button>
        <br />
        {/* <br />
        <label htmlFor="search" style={{ marginBottom: 5, fontWeight: "bold" }}>
          {" "}
          Search Patient :
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter patient name or room no"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        /> */}
        <table className="table table-sm">
          <thead>
            <tr>
              <th className="p-2">Sr. No.</th>
              <th className="p-2">Room No.</th>
              <th className="p-2">Patient Name</th>
              <th className="p-2">Ref</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.room}</td>
                  <td>{user.name}</td>
                  <td>{user.ref == true ? "Yes" : null}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success btn-sm"
                    >
                      Update
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-success btn-sm ms-2"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <span className="fw-bold">*Wards*</span>
        <br />
        {currentData.map((user, index) => (
          <span key={index}>
            {index +
              1 +
              " - " +
              user.room +
              " - " +
              user.name +
              (user.ref == true ? " - Ref" : "")}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Users;
