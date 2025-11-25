import { useContext, useState } from "react";
import { userContext } from "../context/ContextProvider";

function MyBooking() {
  const { myBookings } = useContext(userContext);
  // console.log("myBooking", myBookings);

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl text-center p-2 mb-5 ">
        My Booking
      </h1>

      <table className="border-2 w-full text-center bg-amber-100">
        <thead>
        <tr className="bg-gray-300 h-10 p-2">
          <th>Date</th>
          <th>startTime</th>
          <th>EndTime</th>
          <th>Amount</th>
          <th>userName</th>
        </tr>
        </thead>

        <tbody>
        {myBookings.map((myBookings) => (

            <tr key={myBookings._id}  className="bg-green-200 p-2 hover:bg-green-300">
          
              <td className="border p-2">
                <h1>{myBookings.date}</h1>
              </td>
              <td className="border p-2">
                <h1>{myBookings.startTime}</h1>
              </td>
              <td className="border p-2">
                <h1>{myBookings.endTime}</h1>
              </td>
              <td className="border p-2">
                <h1>{myBookings.total}</h1>
              </td>
              <td className="border p-2">
                <h1>{myBookings.userId?.email}</h1>
              </td>
          
            </tr>
        ))}
        </tbody>
        
        </table>
    </div>
  );
}
export default MyBooking;
