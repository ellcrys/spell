import Namespace from "../namespace";
import RPCClient from "../../rpcclient";
import msgpack from "msgpack-lite";
import { Block } from "../../../..";

/**
 * Handles Block utilities
 *
 * @export
 * @class BlockUtil
 * @extends {Namespace}
 */
export default class BlockUtil extends Namespace {
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Get the size of a block
	 *
	 * @param {Block} block
	 * @returns {number}
	 * @memberof BlockUtil
	 */
	public getSize(block: Block): number {
		var buffer = msgpack.encode(block);

		var txsBytes = [];

		var tx;
		for (tx = 0; tx < block.transactions.length; tx++) {
			txsBytes.push(msgpack.encode(block.transactions[tx]));
		}
		var headerBytes = msgpack.encode([
			block.header.parentHash,
			block.header.number,
			block.header.creatorPubKey,
			block.header.transactionRoot,
			block.header.stateRoot,
			msgpack.encode(block.header.difficulty),
			msgpack.encode(block.header.totalDifficulty),
			block.header.timestamp,
			block.header.nonce,
			block.header.extra,
		]);

		var buffer = msgpack.encode([
			block.hash,
			headerBytes,
			block.sig,
			txsBytes,
		]);

		return buffer.byteLength;
	}
}
