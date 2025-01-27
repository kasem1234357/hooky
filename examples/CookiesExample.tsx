"use client"
import useCookies from "@/hooks/useCookies";
import React, { useState } from "react";
 // Assume this is the hook file

const CookiesExample: React.FC = () => {
  const { setCookies, getCookies, deleteCookies, clearCookies } = useCookies();

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [fetchedValue, setFetchedValue] = useState("");
  const [expireByDays, setExpireByDays] = useState<number | undefined>(undefined);

  const handleSetCookie = () => {
    const options = {
      path: "/",
      secure: true,
      sameSite: "strict" as const,
    };
    setCookies(key, value, options, expireByDays);
    setFetchedValue('')
    alert("Cookie set successfully!");
  };

  const handleGetCookie = () => {
    const cookieValue = getCookies(key);
    setFetchedValue(cookieValue || "Cookie not found");
  };

  const handleDeleteCookie = () => {
    deleteCookies(key);
    setFetchedValue('')
    alert("Cookie deleted successfully!");
  };

  const handleClearCookies = () => {
    clearCookies();
    setFetchedValue('')
    alert("All cookies cleared!");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Cookie Management Example</h1>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Cookie Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Cookie Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Expire By Days (optional)"
          value={expireByDays || ""}
          onChange={(e) => setExpireByDays(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleSetCookie}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Set Cookie
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleGetCookie}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Get Cookie
        </button>
        {fetchedValue && (
          <p className="p-2 border rounded bg-gray-100 text-black">
            Fetched Cookie Value: {fetchedValue}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={handleDeleteCookie}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete Cookie
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleClearCookies}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Clear All Cookies
        </button>
      </div>
    </div>
  );
};

export default CookiesExample;
