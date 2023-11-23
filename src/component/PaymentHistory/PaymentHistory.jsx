/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const PaymentHistory = ({ data }) => {
  return (
    <div className="pr-20 pl-5 py-10">
      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="">
            <tr>
              <th className="whitespace-nowrap mr-60 px-4 py-2 font-medium text-gray-900"></th>

              <th className="whitespace-nowrap px-4 py-2  font-medium text-gray-900">
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
            {data?.length > 0 &&
              data?.map((user, index) => (
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
