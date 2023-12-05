import React from "react";
import moment from "moment";

const SearchResults = (props) => {
  // Check if props.result is an array before using map
  if (!Array.isArray(props.result.result)) {
    console.log(props.result.result);

    return (
      <section className="bg-gray-900 p-4 rounded">
        <p className="text-red-500">Invalid data format</p>
      </section>
    );
  }

  return (
    <section className="bg-grey-1000 p-4 rounded">
      <p className="text-white">
        Latest 25 from a total of{" "}
        <span style={{ color: "#5286A2" }}>{props.result.result.length}</span>

      </p>
      <table className="w-full mt-4 border border-gray-800 rounded">
        <thead>
          <tr className="text-white bg-gray-800">
            <th className="py-2 px-4">Transaction Hash</th>
            <th className="py-2 px-4">Method</th>
            <th className="py-2 px-4">Block</th>
            <th className="py-2 px-4 text-blue-100">Age</th>
            <th className="py-2 px-4">From</th>
            <th></th>
            <th className="py-2 px-4">To</th>
            <th className="py-2 px-4">Value</th>
            <th className="py-2 px-4 text-blue-100">Txn Fee</th>
          </tr>
        </thead>
        <tbody>
          {props.result.result.map((txn) => (
            <tr key={txn.hash} className="text-white border-b border-gray-800">
              <td className="py-2 px-4 text-blue-300">{txn.hash.slice(0, 16)}...</td>
              <td>
                <span className="text-gray-300">
                  {txn.methodId ? txn.methodId : "Unknown"}
                </span>
              </td>
              <td className="py-2 px-4 text-blue-300">{txn.blockNumber}</td>
              <td>{moment.unix(txn.timeStamp).fromNow()}</td>
              <td>
                {`${txn.from.slice(0, 8)}...${txn.from.slice(-8)}`}
              </td>
              <td></td>
              <td className="py-2 px-4 text-blue-300">
                {`${txn.to.slice(0, 8)}...${txn.to.slice(-8)}`}
              </td>
              <td>{(txn.value / 10 ** 18).toFixed(5)} ETH</td>
              <td>{(txn.gasPrice / 10 ** 18).toFixed(12)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SearchResults;
