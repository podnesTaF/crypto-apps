import {AiFillPlayCircle} from "react-icons/ai";
import {SiEthereum} from "react-icons/si";
import {BsInfoCircle} from 'react-icons/bs';
import {Loader} from './'
import React, {useContext} from "react";
import {TransactionContext} from "@/context/TransactionContext";
import {shortAddress} from "@/utils/shortAddress";

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

interface InputProps {
  placeholder: string;
  name: string;
    type: string;
    value: string;
    onChange: Function;
}

const Input: React.FC<InputProps> = ({placeholder, name, type, value, onChange}) => (
    <input
      placeholder={placeholder}
        name={name}
        type={type}
      step={'0.0001'}
        value={value}
        onChange={(e) => onChange(e, name)}
      className={'my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'}
    />
)

const Welcome = () => {
  const {connectWallet, currentAccount, formData, loading, handleChange, sendTransaction}= useContext(TransactionContext);


  const handleSubmit = async () => {
    const {addressTo, amount, keyword, message} = formData;

    if(!addressTo || !amount || !keyword || !message) return alert('Please fill all fields');
    const transactionContract = await sendTransaction();
  }


  return <div className={'flex w-full justify-center items-center'}>
    <div className={'flex mf:flex-row flex-col items-start justify-between md:p-20 py-12  px-4'}>
      <div className={'flex flex-1 justify-start flex-col mf:mr-10'}>
        <h1 className={'text-3xl sm:text-5xl text-white text-gradient py-1'}>Send crypto <br/> across the world</h1>
        <p className={'text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'}>
          Exprole the world of crypto with <span className={'text-blue-500'}>CryptoX</span> and send crypto to your loved ones.
        </p>
        {!currentAccount && (
            <button
                type={'button'}
                onClick={connectWallet}
                className={'flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'}
            >
              <p className={'text-white text-base font-semibold'}>Connect Wallet</p>
            </button>
        )}
        <div className={'grid sm:grid-cols-3 grid-cols-2 w-full mt-10'}>
          <div className={`rounded-tl-2xl ${commonStyles}`}>
            Reliability
          </div>
          <div className={commonStyles}>
            Security
          </div>
          <div className={'rounded-tr-2xl '  + commonStyles}>
            Ethereum
          </div>
          <div className={'rounded-bl-2xl ' + commonStyles}>
            Web 3.0
          </div>
          <div className={commonStyles}>
            Low Fees
          </div>
          <div className={'rounded-br-2xl ' + commonStyles}>
            Blockchain
          </div>
      </div>
      </div>
      <div className={'flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'}>
        <div className={'p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'}>
          <div className={'flex justify-between flex-col w-full h-full'}>
            <div className={'flex justify-between items-start'}>
              <div className={'w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'}>
                <SiEthereum fontSize={21} color={'#fff'}/>
              </div>
              <BsInfoCircle fontSize={17} color={'#fff'} />
            </div>
            <div>
              <p className={'text-white font-light text-sm'}>
                {currentAccount ? shortAddress(currentAccount) : 'connect wallet'}
              </p>
              <p className={'text-white font-bold text-lg'}>
                Ethereum
              </p>
            </div>
          </div>
        </div>
        <div className={'p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'}>
            <Input placeholder={'Address To'} name={'addressTo'} type={'text'} value={formData.addressTo} onChange={handleChange} />
            <Input placeholder={'Amount (ETH)'} name={'amount'} type={'text'} value={formData.amount} onChange={handleChange} />
            <Input placeholder={'Keyword (GIF)'} name={'keyword'} type={'text'} value={formData.keyword} onChange={handleChange} />
            <Input placeholder={'Enter Message'} name={'message'} type={'text'} value={formData.message} onChange={handleChange} />
            <div className={'h-[1px] w-full bg-gray-400 my-2'} />
              {loading ? (
                  <Loader />
              ) : (
                    <button
                    type={'button'}
                    onClick={
                      handleSubmit
                    }
                    className={'text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c]  hover:bg-[#3d4f7c] rounded-full cursor-pointer'}
                    >
                    Send now
                    </button>
              )}

        </div>
      </div>
    </div>
  </div>;
};

export default Welcome;
