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
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        <button
          className="btn btn-info btn-sm ms-2"
          onClick={() => setSort(!sort)}
        >
          {sort == true ? "A-Z" : "Z-A"}
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
        <table className="table table-sm table-bordered mt-2 mb-2">
          <thead className="table-secondary">
            <tr>
              <th className="pe-2 ps-2">Sr. No.</th>
              <th className="pe-2 ps-2">Room No.</th>
              <th className="pe-2 ps-2">Patient Name</th>
              <th className="pe-2 ps-2">Ref</th>
              <th className="pe-2 ps-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{user.room}</td>
                  <td>{user.name}</td>
                  <td>{user.ref == true ? "Yes" : null}</td>
                  <td className="text-center">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-sm  p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        color="green"
                      >
                        <rect width="24" height="24" fill="none" />
                        <path
                          fill="currentColor"
                          d="M5 3c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7H5V5h7V3zm12.78 1a.7.7 0 0 0-.48.2l-1.22 1.21l2.5 2.5L19.8 6.7c.26-.26.26-.7 0-.95L18.25 4.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L8 13.5V16h2.5l7.37-7.38z"
                        />
                      </svg>
                    </Link>
                    <Link
                      to="/"
                      className="btn  btn-sm p-0 ms-2"
                      onClick={() => handleDelete(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 40 40"
                        color="red"
                      >
                        <rect width="40" height="40" fill="none" />
                        <path
                          fill="currentColor"
                          d="M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993L7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.06 1.06 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z"
                          stroke-width="1"
                          stroke="currentColor"
                        />
                      </svg>
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
