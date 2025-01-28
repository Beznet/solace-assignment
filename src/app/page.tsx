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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    try {
      const response = await fetch(
        `/api/advocates/search?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching advocates: ${response.status}`);
      }

      const data = await response.json();
      setFilteredAdvocates(data.data);
    } catch (error) {
      console.error("Failed to fetch advocates:", error);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
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
        <Table advocates={filteredAdvocates} />
      )}
    </main>
  );
}
