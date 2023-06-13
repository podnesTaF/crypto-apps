import { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    const isEnabled = localStorage.getItem("connected");
    if (!isWeb3Enabled && isEnabled === "injected") {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account) {
        localStorage.setItem("connected", "injected");
      } else {
        localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      ) : isWeb3EnableLoading ? (
        <div>Connecting...</div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            localStorage.setItem("connected", "injected");
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;
