import React from "react";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-4 mt-2">
      <input
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
        placeholder="Search advocates..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};
