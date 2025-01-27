"use client"
import usePreferredLanguage from "@/hooks/usePreferredLanguage";
import React from "react";


const PreferredLanguageExample = () => {
  const { lang, setLang } = usePreferredLanguage("en");

  const handleChangeLanguage = (newLang: string) => {
    setLang(newLang); // Change language dynamically
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <h1>Your Preferred Language</h1>
      <p>Current Language: {lang}</p>
      <button className="bg-blue-700 px-4 py-2 rounded-lg"  onClick={() => handleChangeLanguage("fr")}>Switch to French</button>
      <button className="bg-orange-500 rounded-lg px-4 py-2" onClick={() => handleChangeLanguage("es")}>Switch to Spanish</button>
    </div>
  );
};

export default PreferredLanguageExample;
