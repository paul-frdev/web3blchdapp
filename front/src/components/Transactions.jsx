import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';
import { TransactionCard } from './shared/TransactionCard';

export const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center">Latest Transactions</h3>
        ) : (
          <h3 className="text-white text-3xl text-center">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData, ...transactions].reverse().map((tx) => (
            <TransactionCard key={tx.id} {...tx} />
          ))}
        </div>
      </div>
    </div>
  );
};
