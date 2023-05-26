import {ethers} from 'ethers';
import {contractABI, contractAddress} from "@/utils/constants";
import React, {createContext, ReactNode, useEffect, useState} from "react";
import transaction from "@/components/Transaction";

export interface TransactionContextType {
    connectWallet: () => void;
    currentAccount: any;
    formData: {
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;
    },
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    setFormData: (data: any) => void;
    sendTransaction: () =>  void;
    transactions: any[];
    loading: boolean;
}

export const TransactionContext = createContext<TransactionContextType>({
    connectWallet: () => {},
    currentAccount: null,
    formData: {
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    },
    handleChange: () => {},
    setFormData: () => {},
    sendTransaction: () => {},
    transactions: [],
    loading: false
})


const getEthereumContract = () => {
    const ethereum = (window as any)?.ethereum || null;
    if (!ethereum) {
        console.log('Make sure you have metamask installed');
        return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
}

const checkIfTxExists = async () => {
    try {
        const transactionContract = getEthereumContract();
        const txCount = await transactionContract?.getTransactionCount();

        localStorage.setItem('txCount', txCount.toString());

    } catch (e) {
        console.log(e)
        throw new Error("Error connecting wallet")
    }
}

export default function TransactionProvider({children}: {children: ReactNode}) {
    const [currentAccount, setCurrentAccount] = useState<any>(null);
    const [formData, setFormData] = useState({
        addressTo: '', amount: '', keyword: '', message: ''
    })
    const [loading, setLoading] = useState(false);
    const [txCount, setTxCount] = useState<any>( 0);
    const [transactions, setTransactions] = useState<any>([]);

    useEffect(() => {
        setTxCount(localStorage.getItem('txCount') || 0);
    })

    const getTransactions = async () => {
        const ethereum = (window as any)?.ethereum || null;
        try {
            if(!ethereum) return alert("Make sure you have metamask installed");

            const transactionContract = getEthereumContract();

            const availableTxs = await transactionContract?.getAllTransactions();

            const structuredTxs = availableTxs.map((tx: any) => ({
                addressTo: tx.receiver,
                addressFrom: tx.sender,
                timestamp: new Date(+ tx.timestamp * 1000).toLocaleString(),
                message: tx.message,
                keyword: tx.keyword,
                amount: +tx.amount._hex /  (10 ** 18)

            }))

            setTransactions(structuredTxs);
        } catch(e) {
            console.log(e)
            throw new Error("Error connecting wallet")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData(prev => ({...prev, [name]: e.target.value}))
    }

    const checkIfWalletIsConnected = async () => {
        const ethereum = (window as any)?.ethereum || null;
       try {
           if(!ethereum) return alert("Make sure you have metamask installed");

           const accounts = await ethereum.request({method: 'eth_accounts'});


           if(accounts.length !== 0) {
               setCurrentAccount(accounts[0]);
               getTransactions();
           } else {
               console.log("No account found");
           }
       } catch (e) {
           console.log(e)
           throw new Error("Error connecting wallet")
       }
    }

    const connectWallet = async () => {
        const ethereum = (window as any)?.ethereum || null;
        try {
            if(!ethereum) return alert("Make sure you have metamask installed");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});


            setCurrentAccount(accounts[0]);
        } catch(e) {
            console.log(e)
            throw new Error("Error connecting wallet")
        }
    }

    const sendTransaction = async () => {
        const ethereum = (window as any)?.ethereum || null;
        try {
            if(!ethereum) return alert("Make sure you have metamask installed");

            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();

            if(!transactionContract) return alert("Error getting contract");

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            })

           const txHash = await transactionContract.addToBlockChain(addressTo, parsedAmount,  keyword, message);

            setLoading(true);
            console.log('loading', txHash.hash);

            await txHash.wait()

            setLoading(false);
            console.log('success', txHash.hash );

            const txCount = await transactionContract.getTransactionCount();

            setTxCount(txCount.toNumber());

            (window as any).reload();

        } catch (e) {
            console.log(e)
            throw new Error("Error sending transaction")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTxExists();
    }, []);

    const value = {
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        loading
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}