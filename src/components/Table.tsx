import React from "react";
import { formatPhoneNumber } from "@/app/utils/formatPhoneNumber";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

type TableProps = {
  advocates: Advocate[];
};

export const Table: React.FC<TableProps> = ({ advocates }) => {
  return (
    <table className="table-auto w-full border border-gray-300 rounded-md shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-center border border-gray-300">
            First Name
          </th>
          <th className="px-4 py-2 text-center border border-gray-300">
            Last Name
          </th>
          <th className="px-4 py-2 text-center border border-gray-300">City</th>
          <th className="px-4 py-2 text-center border border-gray-300">
            Degree
          </th>
          <th className="px-4 py-2 text-center border border-gray-300">
            Specialties
          </th>
          <th className="px-4 py-2 text-center border border-gray-300">
            Years of Experience
          </th>
          <th className="px-4 py-2 text-center border border-gray-300">
            Phone Number
          </th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate, index) => (
          <tr
            key={advocate.id}
            className={index % 2 === 0 ? "bg-blue-100" : "bg-white"}
          >
            <td className="px-4 py-2 text-center border border-gray-300">
              {advocate.firstName}
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              {advocate.lastName}
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              {advocate.city}
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              {advocate.degree}
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              <div className="max-h-20 overflow-y-auto px-2">
                {advocate.specialties.map((s, idx) => (
                  <p key={idx} className="text-sm">
                    {s}
                  </p>
                ))}
              </div>
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              {advocate.yearsOfExperience}
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              {formatPhoneNumber(advocate.phoneNumber.toString())}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
