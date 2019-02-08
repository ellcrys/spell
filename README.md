# Spell

The official Node.js binding for the Elld JSON-RPC 2.0 Service! This library provides the ability to query or mutate the state and configuration an Ellcrys blockchain client.

## Installation

```
npm install @ellcrys/spell
```

## Initialization

To begin using the client, you must first create a Spell instance and provide connection information that will enable the client connect to the JSON-RPC 2.0 service.

```js
// Create a Spell Instance
const spell = new Spell();

// Configure the client to be able
// to make calls to a node's RPC service
spell.provideClient({
	// The RPC address of an Elld node
	host: "127.0.0.1",
	// The RPC port of an Elld node
	port: 8999,
	// Optional: RPC username to access private endpoints
	username: "admin",
	// Optional: RPC password to access private endpoints
	password: "secret",
});
```

`provideClient` will attempt to call `rpc_echo` to test the connection; It will return a rejected promise if it failed to successfully reach the node.

## Calling An RPC Method

Spell closely replicates the same namespace-based structure used to organize the RPC methods in Elld. For example, RPC methods on Elld are named and addressed in the following format:

```
{namespace}_{method}

Where:
 - namespace: The group name a method belongs to
 - method: Is the name of the method.
```

All supported namespaces can be accessed from the spell instance like this:

```js
spell.namespace.method();
```

## Get A Node's Basic Information

We will demonstrate how to call an RPC method by getting the basic information of the provisioned node.

```js
// Get a node's basic information. The JSON-RPC 2.0 method is
// `node_basic`
spell.node.basic();

// Output:
/*
{
	buildCommit: '599bc716098869a0d2a15431447c65823c207e3f',
	buildDate: '2019-01-19T21:57:50Z',
	buildVersion: '0.1.6-alpha.2',
	goVersion: 'go1.10.4',
	id: '12D3KooWKAEhd4DXGPeN71FeSC1ih86Ym2izpoPueaCrME8xu8UM',
	mode: 'production',
	name: 'deeply-suitable-fowl',
	netVersion: '0001',
	syncing: false,
	tipBlockDifficulty: '0x215915d',
	tipBlockHash: '0x1cf3109273187d2c42ad077fc7b491eae8a4fd1878ef9ec74f0d12d4843a9168',
	tipBlockHeight: '0x45d9',
	tipBlockTotalDifficulty: '0xb60329599c'
}
*/
```

## Documentation

See API Reference [here](https://ellcrys.github.io/spell)
