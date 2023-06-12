import {useContext} from "react";
import {TransactionContext} from "@/context/TransactionContext";
import dummyData from "@/utils/dummyData";
import TransactionCard from "@/components/TransactionCard";

const Transaction = () => {
  const {currentAccount, transactions} = useContext(TransactionContext);
  return <div className={'flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'}>
    <div className={'flex flex-col md:p-12 py-12 px-4'}>
      {currentAccount ? (
          <h3 className={'text-white text-3xl text-center my-2'}>
            Your transactions will appear here
          </h3>) : (
          <h3 className={'text-white text-3xl text-center my-2'}>
            Connect to a wallet to view your transactions
          </h3>
        )}

      <div className={'flex flex-wrap justify-center items-center'}>
        {transactions.reverse().map((data,index) => (
            <TransactionCard key={index} {...data} />
        ))}
      </div>
    </div>
  </div>;
};

export default Transaction;
