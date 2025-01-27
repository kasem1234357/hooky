import { useEffect, useState } from "react";

const usePreferredLanguage = (defaultLanguage: string = "en") => {
  const [lang, setLangState] = useState<string>(() => {
    return navigator.language || defaultLanguage;
  });

  // Function to update the language in state and browser (HTML lang attribute)
  const setLang = (newLang: string) => {
    setLangState(newLang); // Update state
    document.documentElement.lang = newLang; // Update the browser's <html> lang attribute
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setLangState(navigator.language);
    };

    // Sync with browser language changes
    window.addEventListener("languagechange", handleLanguageChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  return { lang, setLang };
};

export default usePreferredLanguage;
