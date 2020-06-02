export default interface TransactionOptions {
  nonce?: number;
  chainId?: number;
  to?: string;
  data?: string;
  value?: string;
  gasPrice?: string;
  gas: string;
  chain?: string;
  hardfork?: string;
  common?: {
    customChain: {
      name?: string;
      networkId: number;
      chainId: number;
    };
    baseChain?: "mainnet" | "goerli" | "kovan" | "rinkeby" | "ropsten";
    hardfork?:
      | "chainstart"
      | "homestead"
      | "dao"
      | "tangerineWhistle"
      | "spuriousDragon"
      | "byzantium"
      | "constantinople"
      | "petersburg"
      | "istanbul";
  };
}
