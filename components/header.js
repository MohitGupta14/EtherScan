import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Logo from "../public/assets/logo.png";

const MenuItem = ({ label, icon }) => (
  <p>
    {label}
    <span className={styles.arrow}>
      {icon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </span>
  </p>
);

export default function Header() {
  const [ethPrice, setEthPrice] = useState("");
  const [gasPrice, setGasPrice] = useState("");

  useEffect(() => {
    async function fetchData(url, setter) {
      try {
        const response = await axios.get(url, {});
        setter(parseInt(response.data.price) || parseInt(response.data.gasPrice) || "");
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    }

    fetchData("http://localhost:3001/ethereum-price", setEthPrice);
    fetchData("http://localhost:3001/ethGasPrice", setGasPrice);

    return () => {};
  }, []);

  return (
    <section className="w-full bg-black">
      <section className="flex items-center text-gray-500 h-12 text-xs px-4 border-b border-gray-800">
        <div className="flex items-center">
          ETH Price:{" "}
          <span className="ml-1" style={{ color: "#7cb3d7" }}>
            {ethPrice}
          </span>
        </div>
        <div className="flex items-center ml-4">
          Gas Price:{" "}
          <span className="ml-1" style={{ color: "#7cb3d7" }}>
            {gasPrice}
          </span>
        </div>
      </section>

      <section className="flex items-center justify-between h-14 px-4 border-b border-gray-800">
        <Image src={Logo} alt="Etherscan Logo" className="w-36 h-auto" />

        <section className= {styles.menu}>
          <MenuItem label="Home" />
          <MenuItem label="Blockchain" icon />
          <MenuItem label="Token" icon />
          <MenuItem label="NFTs" icon />
          <MenuItem label="Resources" icon />
          <MenuItem label="Developers" icon />
          <MenuItem label="More" icon />
          <p>|</p>
          <p className={"justify-between w-4.5"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={styles.profile}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Sign In
          </p>
        </section>
      </section>
    </section>
  );
}
