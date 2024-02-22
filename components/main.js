import React from 'react';
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import {
  faCube,
  faGauge,
  faGlobe,
  faServer,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Chart from "../public/assets/chart.png";

function formatNumberToMillions(number) {
    const Wei = 1000000000000000000;
    return (number / Wei) + " Wei";
}

export default function HeroSection() {
  const [ethPrice, setEthPrice] = useState("");
  const [totalTransactions, setTotalTransactions] = useState("");
  // const [showResult, setShowResult] = useState(true);
  const [blockResult, setBlockResult] = useState([]);
  const [transactionsResult, setTransactionsResult] = useState([]);
  let latestBlock = "";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ethPriceResponse = await axios.get("/api/ethereum-price");
        const ethPrice = ethPriceResponse.data.price;
        setEthPrice(ethPrice);
      } catch (error) {
        console.error("Error fetching Ethereum price:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalTransactionsResponse = await axios.get("/api/totalTransactionsCount");
        const formattedTotalTransactions = formatNumberToMillions(totalTransactionsResponse.data.totalTransactionsCount);
        setTotalTransactions(formattedTotalTransactions);
      } catch (error) {
        console.error("Error fetching total transactions count:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const cachedBlockResult = localStorage.getItem('cachedBlockResult');
        if (cachedBlockResult) {
          setBlockResult(JSON.parse(cachedBlockResult));
          return;
        }
        const latestBlocksResponse = await axios.get("/api/latestBlocks");
        const blockResult = latestBlocksResponse.data.latestBlocks;
        setBlockResult(blockResult);

        localStorage.setItem('cachedBlockResult', JSON.stringify(blockResult));
      } catch (error) {
        console.error("Error fetching latest blocks:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedTransactionsResult = localStorage.getItem('cachedTransactionsResult');
        if (cachedTransactionsResult) {
          setTransactionsResult(JSON.parse(cachedTransactionsResult));
          return;
        }

        const latestBlocksTransResponse = await axios.get("/api/latestBlocksTrans");
        const transactionsResult = latestBlocksTransResponse.data.transactions;
        setTransactionsResult(transactionsResult);

        localStorage.setItem('cachedTransactionsResult', JSON.stringify(transactionsResult));
      } catch (error) {
        console.error("Error fetching latest block transactions:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <section className={styles.heroSectionContainer}>
      {(
        <section>
          <section className={styles.latestResults_header}>
            <section>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 417"
                    preserveAspectRatio="xMidYMid"
                    className={styles.svgEth}
                  >
                    <script
                      xmlns=""
                      id="argent-x-extension"
                      data-extension-id="dlcobpjiigpikoobohmabehhmhfoodbb"
                    />
                    <path
                      fill="#fff"
                      d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    />
                    <path
                      fill="#fff"
                      d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                    />
                    <path fill="#fff" d="M127.962 416.905v-104.72L0 236.585z" />
                    <path
                      fill="#eee"
                      d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                    />
                    <path fill="#bbb" d="M0 212.32l127.96 75.638v-133.8z" />
                    <script
                      xmlns=""
                      type="text/javascript"
                      src="chrome-extension://fnnegphlobjdpkhecapkijjdkgcjhkib/inject-script.js"
                      id="one-x-extension"
                      data-extension-id="fnnegphlobjdpkhecapkijjdkgcjhkib"
                    />
                  </svg>
                </section>
                <section className={styles.hero_box}>
                  <p>ETHER PRICE</p>
                  <p className={styles.heroValues}>
                    ${Number(ethPrice).toFixed(2)}
                  </p>
                </section>
              </section>
              <span className={styles.divider}></span>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faGlobe} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>MARKET CAP</p>
                  <p className={styles.heroValues}>$272,629,315,291.00</p>
                </section>
              </section>
            </section>
            <section>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon
                    icon={faServer}
                    className={styles.svgIcons}
                  />
                </section>
                <section className={styles.hero_box}>
                  <p>TOTAL TOKENS</p>
                  <p className={styles.heroValues}>{totalTransactions}</p>
                </section>
              </section>
              <span className={styles.divider}></span>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faGauge} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>LAST FINALIZED BLOCK</p>
                  <p className={styles.heroValues}>{latestBlock}</p>
                </section>
              </section>
            </section>
            <section>
              <section className={styles.hero_averageValue}>
                <p>Average Transaction Value</p>
                <Image src={Chart} alt="Chart" className={styles.chart} />
              </section>
            </section>
          </section>
          <section className={styles.latestResults_body}>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Blocks
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  {blockResult.map((block) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${
                          blockResult.indexOf(block) ==
                            blockResult.length - 1 && styles.lastTd
                        }`}
                        key={block.blockHeight}
                      >
                        <td className={styles.tdIcon}>
                          <FontAwesomeIcon icon={faCube} />
                        </td>
                        <td className={styles.tdBlock}>
                          <section className={styles.blueText}>
                            {block.blockHeight}
                          </section>
                          <section>
                            {block.timeAgo + " secs ago" }
                          </section>
                        </td>
                        <td className={styles.tdTxns}>
                          <section>
                            Fee Recipient{" "}
                             <span className={styles.blueText}>
                             <section>
                              {block.txnHash.to.slice(0, 6)}...
                              </section>
                            </span> 
                          </section>
                          <section>
                          </section>
                        </td>
                        <td className={styles.tdValue}>{(Number(block.txnHash.value) / 10 ** 18).toFixed(4)} Eth</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Transactions
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  {transactionsResult.map((txn) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${
                          transactionsResult.indexOf(txn) ==
                            transactionsResult.length - 1 && styles.lastTd
                        }`}
                        key={txn.hash}
                      >
                        <td className={styles.tdContract}>
                          <FontAwesomeIcon
                            icon={faFileContract}
                            className={styles.tdContract}
                          />
                        </td>
                        <td className={styles.tdBlock}>
                          <section className={styles.blueText}>
                            {txn.hash?.slice(0, 14)}...
                          </section>
                          <section>
                            {txn.time + " sec ago" }
                          </section>
                        </td>
                        <td className={styles.tdFromTo}>
                          <section>
                            From{" "}
                            <span className={styles.blueText}>
                              {txn.from?.slice(0, 6)}...
                              {txn.to?.slice(36)}
                            </span>
                          </section>
                          <section>
                            To{" "}
                            <span className={styles.blueText}>
                              {txn.to?.slice(0, 6)}...
                              {txn.to?.slice(36)}
                            </span>
                            <span className={styles.blueText}>
                              {txn.totalTransactions}
                            </span>
                          </section>
                        </td>
                        <td className={styles.tdValue}>
                          {(Number(txn.value) / 10 ** 18).toFixed(4)} Eth
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}