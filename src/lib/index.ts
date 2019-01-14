require("source-map-support").install();
import Spell from "./spell";
import { PrivateKey, PublicKey, Address } from "./key";
import TxUtility from "./builders/tx_util";
import { NumDecimals, TxPayloadVersion } from "./builders/transaction_builder";

export {
	Spell,
	PrivateKey,
	PublicKey,
	Address,
	TxUtility,
	NumDecimals,
	TxPayloadVersion,
};

export default new Spell();
