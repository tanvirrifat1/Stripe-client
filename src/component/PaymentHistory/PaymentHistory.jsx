import { useEffect, useState } from "react";

const PaymentHistory = () => {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/payment", {
      method: "GET", // Use "GET" for a GET request
      headers: {
        "Content-Type": "application/json",
      },
      // No need to include a body for a GET request
    })
      .then((res) => res.json())
      .then((data) => setPayment(data));
  }, []);
  console.log(payment);
  return (
    <div className="pr-20 pl-5 py-10">
      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Total Payment
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {payment?.length > 0 &&
              payment?.map((user, index) => (
                <tr key={user?.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user?.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user?.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-semibold">
                    successful
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
