import json from "../build/main.compiled.json" with { type: "json" };
import {
  beginCell,
  Cell,
  contractAddress,
  storeStateInit,
  toNano,
} from "ton";
import qs from "qs";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();


async function deployScript() {
  console.log(
    "================================================================="
  );
  console.log("Deploy script is running, let's deploy our main.fc contract...");

  const codeCell = Cell.fromBoc(Buffer.from(json.hex, "hex"))[0];
  const dataCell = new Cell();

  const stateInit = {
    code: codeCell,
    data: dataCell,
  };

  const stateInitBuilder = beginCell();
  storeStateInit(stateInit)(stateInitBuilder);
  const stateInitCell = stateInitBuilder.endCell();

  const address = contractAddress(0, {
    code: codeCell,
    data: dataCell,
  });

  console.log(
    `The address of the contract is following: ${address.toString()}`
  );
  console.log(`Please scan the QR code below to deploy the contract to ${process.env.TESTNET ? 'testnet' : 'mainnet'}`);

  let link =
    `https://tonhub.com/transfer/` +
    address.toString({
      testOnly: process.env.TESTNET ? true : false,
    }) +
    "?" +
    qs.stringify({
      text: "Deploy contract",
      amount: toNano(1).toString(10),
      init: stateInitCell.toBoc({ idx: false }).toString("base64"),
    });

  qrcode.generate(link, { small: true }, (code) => {
    console.log(code);
  });
}

deployScript();
