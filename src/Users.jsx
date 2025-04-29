import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [postValue, setPostValue] = useState("");
  const [sort, setSort] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [whatsAppText, setWhatsAppText] = useState("");

  const navigate = useNavigate();

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

  const textsend = currentData.map((user, index) => (
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
  ));

  const handleWhatsApp = () => {
    const text = document.getElementById("textToEncode").innerText;
    setWhatsAppText(encodeURIComponent(text));
    // console.log(whatsAppText);
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
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-sm  p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                        width="24"
                        height="24"
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
        <div id="textToEncode">
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
        <button
          className="btn btn-success btn-sm mt-2 "
          onClick={() => handleWhatsApp()}
        >
          Copy Text
        </button>
        <br />
        <Link
          to={`https://wa.me/919913560435?text=${whatsAppText}`}
          className="btn btn-success btn-sm mt-2 d-inline-flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 258"
          >
            <rect width="256" height="258" fill="none" />
            <defs>
              <linearGradient
                id="logosWhatsappIcon0"
                x1="50%"
                x2="50%"
                y1="100%"
                y2="0%"
              >
                <stop offset="0%" stop-color="#1faf38" />
                <stop offset="100%" stop-color="#60d669" />
              </linearGradient>
              <linearGradient
                id="logosWhatsappIcon1"
                x1="50%"
                x2="50%"
                y1="100%"
                y2="0%"
              >
                <stop offset="0%" stop-color="#f9f9f9" />
                <stop offset="100%" stop-color="#fff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#logosWhatsappIcon0)"
              d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
            />
            <path
              fill="url(#logosWhatsappIcon1)"
              d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
            />
            <path
              fill="#fff"
              d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
              stroke-width="6.5"
              stroke="#fff"
            />
          </svg>{" "}
          WhatsApp
        </Link>
      </div>
    </div>
  );
};

export default Users;
