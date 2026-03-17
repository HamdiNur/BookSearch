import React, { useState, useContext, useEffect, useCallback } from "react";

const URL = "https://openlibrary.org/search.json?title=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("the lost world");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();

      const { docs } = data;

      if (docs) {
        const newBooks = docs.map((item) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = item;

          return {
            id: key,
            author: author_name,
            cover: cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
              : "",
            editionCount: edition_count,
            publishYear: first_publish_year,
            title: title,
          };
        });

        setBooks(newBooks);
        setResultTitle("Search Result");
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        resultTitle,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
