import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { abi, addresses } from "../constants";

const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");
  const { chainId: inHex, isWeb3Enabled } = useMoralis();
  const chainId = inHex ? parseInt(inHex, 16) : 0;

  const dispatch = useNotification();

  // @ts-ignore
  const raffleAddress = chainId in addresses ? addresses[chainId][0] : null;
  if (chainId) {
    console.log(raffleAddress);
  }

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell" as any,
    });
  };

  const handleSuccess = async (tx: any) => {
    await tx.wait(1);
    handleNewNotification();
    await updateUi();
  };

  const updateUi = async () => {
    const entranceFeeFromContract = (
      (await getEntranceFee()) as any
    ).toString();

    setEntranceFee(entranceFeeFromContract);

    const numPlayers = ((await getNumPlayers()) as number).toString();
    setNumPlayers(numPlayers);

    const recentWinner = ((await getRecentWinner()) as any).toString();

    setRecentWinner(recentWinner);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUi();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="p-5">
      <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
      {raffleAddress ? (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () =>
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Enter Raffle"
            )}
          </button>
          <div>
            Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
          </div>
          <div>The current number of players is: {numPlayers}</div>
          <div>The most previous winner was: {recentWinner}</div>
        </>
      ) : (
        <div>Please connect to a supported chain </div>
      )}
    </div>
  );
};

export default LotteryEntrance;
