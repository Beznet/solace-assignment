"use client";

import { SetStateAction, useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Table } from "@/components/Table";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch(
          `/api/advocates?page=${currentPage}&limit=10`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setTotalPages(jsonResponse.meta.totalPages);
      } catch (error) {
        console.error("Failed to fetch advocates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, [currentPage]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(e.target.value);

    if (value.trim() === "") {
      setFilteredAdvocates(advocates);
      return;
    }

    try {
      const response = await fetch(
        `/api/advocates/search?searchTerm=${encodeURIComponent(
          value
        )}&page=1&limit=10`
      );
      if (!response.ok) {
        throw new Error(`Error fetching advocates: ${response.status}`);
      }

      const data = await response.json();
      setFilteredAdvocates(data.data);
      setTotalPages(data.meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch advocates:", error);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="flex flex-col m-6 p-6 bg-slate-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Solace Advocates</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onReset={resetSearch}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Table advocates={filteredAdvocates} />
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
