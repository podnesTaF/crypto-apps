import React from 'react';
import {shortAddress} from "@/utils/shortAddress";
import {useFetch} from "@/hooks/useFetch";

interface TransactionCardProps {
    addressTo: string;
    addressFrom: string;
    amount: string;
    timestamp: string;
    message: string;
    keyword: string;
    url: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({addressFrom, amount, timestamp, addressTo, message, keyword, url}) => {
    const giphUrl = useFetch(keyword)

    return (
        <div className={'bg-[#181918] m-4 flex flex-1' +
            '2xl:min-w-[450px] 2xl:max-w-[500px] ' +
            '2xl:min-w-[270px] 2xl:max-w-[300px] ' +
            'flex-col p-3 rounded-md hover:shadow-2xl'}>
            <div className={'flex flex-col items-center w-full mt-3'}>
                <div className={'w-full mb-2'}>
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target={'_blank'} rel={'noopener noreferrer'}>
                        <p className={'text-white text-base'}>
                            From: {shortAddress(addressFrom)}
                        </p>
                    </a>
                    <a href={`https://goerli.etherscan.io/address/${addressTo}`} target={'_blank'} rel={'noopener noreferrer'}>
                        <p className={'text-white text-base'}>
                            To: {shortAddress(addressTo)}
                        </p>
                    </a>
                    <p className={'text-white text-base'}>
                        Amount: {amount} ETH
                    </p>
                    {message && (
                        <>
                        <br />
                            <p className={'text-white text-base'}>
                                Message: {message}
                            </p>
                        </>
                    )}
                </div>
                <img src={giphUrl || url} alt="giphy"
                     className={'w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover'}
                />
                <div className={'bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'}>
                    <p className={'text-[#37c7da] font-bold'}>
                        {timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;