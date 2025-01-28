"use client";

import { useEffect, useState } from "react";

export default function Home() {
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
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (error) {
        console.error("Failed to fetch advocates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const searchAdvocates = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="flex flex-col m-6 p-6 bg-slate-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Solace Advocates</h1>
      <div className="mb-6">
        <div className="flex items-center gap-4 mt-2">
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            placeholder="Search advocates..."
            onChange={searchAdvocates}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={resetSearch}
          >
            Reset
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="table-auto w-full border border-gray-300 rounded-md shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-center border border-gray-300">
                First Name
              </th>
              <th className="px-4 py-2 text-center border border-gray-300">
                Last Name
              </th>
              <th className="px-4 py-2 text-center border border-gray-300">
                City
              </th>
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
            {filteredAdvocates.map((advocate, index) => (
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
                  {/* added overflow-y-auto to limit the height of the specialties for a cleaner table */}
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
                  {advocate.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
