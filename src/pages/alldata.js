import React, { useEffect, useState } from "react";
import Card from "../components/card.js";
import Welcome from "../components/welcome.js";

const AllData = () => {
  // state for users array
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch user accounts from API
    fetch(`https://sushmanaalla-banking-api2.onrender.com/account/find`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setUsers(data);
      });
  }, []);

  let list = users.map((user, index) => {
    return (
      <tr key={index}>
        <td className="fs-6 text-wrap">{user.name}</td>
        <td className="fs-6 text-wrap">{user.type}</td>
        <td className="fs-6 text-wrap">${user.balance}</td>
      </tr>
    );
  });

  return (
    <>
      <Welcome />
      <Card 
        className="withdrawal-page p-3"
        hdrcolor="#ACADAF"
        hdrtext="black"
        bodycolor="#40485d"
        bodytext="white"
        header="All Data"
        body={
          <table className="table"  >
            <thead style={{color:'white'}}>
              <tr>
                <th className="fs-6" scope="col">
                  Name
                </th>
                <th className="fs-6" scope="col">
                  Email
                </th>
                <th className="fs-6" scope="col">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody style={{color:'white'}}>{list}</tbody>
          </table>
        }
      ></Card>
    </>
  );
};
export default AllData;
