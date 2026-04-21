import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageUser.css";

function ManageUser() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      console.log("USERS:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="manage-container">

      <h2>Manage Users</h2>

      <table className="manage-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>OTP</th>
            <th>OTP Expiry</th>
          </tr>
        </thead>

       <tbody>
  {users && users.length > 0 ? (
    users.map((user) => (
      <tr key={user._id}>
        <td>{user.email}</td>
        <td>{user.otp ? user.otp : "N/A"}</td>
        <td>
          {user.otpExpires
            ? new Date(user.otpExpires).toLocaleString()
            : "N/A"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No Users Found</td>
    </tr>
  )}
</tbody>
      </table>

    </div>
  );
}

export default ManageUser;