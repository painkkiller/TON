import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";

const endpoint = await getHttpEndpoint({ network: "testnet" }); // get the decentralized RPC endpoint
const client = new TonClient({ endpoint }); // initialize ton library

// make some query to mainnet
const address = Address.parseFriendly("UQCrFX2uDfEQ9-0iWVz0uf48k6X8PAuzWGwbvo-m-OnwXmBj").address;
const balance = await client.getBalance(address);

console.log('balance', balance.toString(10));