import { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import SearchResults from "./result.js";

export default function Search() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    document.querySelector("#inputField").value = "";

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:3001/address", {
        params: { address: searchInput },
      });

      setResult(response.data.result);
      setShowResult(true);
    } catch (error) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
    <section className= {styles.searchHeader}> 
        <section className="w-1/2">
          <h3 className="text-2xl text-white">The Ethereum Blockchain Explorer</h3>
          <section className="flex items-center w-full border border-gray-800 rounded-md bg-gray-900">
          <input
            className = {styles.inputField}
            type="text"
            id="inputField"
            name="inputField"
            maxLength="1200"
            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
            required
            onChange={changeHandler}
            />
            <button
            className={styles.btn}
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </section>
        </section>
      </section>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {showResult && <SearchResults result={{ result, searchInput }} />}
    </section>
  );
}
