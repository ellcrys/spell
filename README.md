# Spell - Ellcrys Javascript API

Spell is a Javascript API which provides access to the JSON-RPC 2.0 API service exposed by ELLD node. It allows a user to perform actions such as constructing and sending transactions, fetching transactions and blocks and managing a local or remote Ellcrys node. You need to have access to a running Ellcrys node to use this library.

The full documentation can be found [here](https://ellcrys.github.io/spell)

## Installation

### Node

```sh
npm install @ellcrys/spell
```

### Yarn

```sh
yarn add @ellcrys/spell
```

## Usage

To begin using the library, you must first create a Spell instance and provide connection information that will enable the client connect to the JSON-RPC 2.0 service.

```javascript
import Spell from "@ellcrys/spell";

// Create a Spell Instance
const spell = new Spell();

// Provide connection options to a local or remote Ellcrys node
const resp = spell.provideClient({
	host: "127.0.0.1",
	port: 8999,
	username: "admin", // optional
	password: "secret", // optional
});

// spell.provideClient returns a promise that is resolved
// when the node responds to an initial ping message.
resp.then(async () => {
	// do something with spell
	const basic = await spell.node.basic();
	console.log(basic);
}).catch(console.error);
```

Once `spell` has been initialized with a valid node connection information. You can start accessing the RPC methods. You can get the balance of an account like this:

```javascript
spell.ell.getBalance("e2763...").then((bal) => {
	console.log(bal); // "20.00"
});
```

## Calling RPC Methods

Spell closely replicates the same namespace-based structure used to organize the JSON-RPC 2.0 methods of an Ellcrys node. For example, RPC methods are named and addressed in the following format:

```txt
{namespace}_{method}
Where:
 - namespace: The group name a method belongs to.
 - method: Is the name of the method.
```

A method `getBalance` of a namespace `ell` can be accessed like this:

```javascript
spell.ell.getBalance(...)
```

## TypeScript Support

The library includes TypeScript types within it. You can use spell like this:

```javascript
import Spell from "@ellcrys/spell";
```

## Documentation

Find the complete documentation [here](https://ellcrys.github.io/spell)

## Contributing

We appreciate contributions. They help move us faster and improve the quality of the project. Please follow this steps to contribute:

-   Fork this repository and clone it locally.
    `git clone https://github.com/ellcrys/spell`
-   Add the remote upstream
    `git remote add upstream git://github.com/ellcrys/spell`
-   Pull upstream changes
    `git fetch upstream`
-   Create a new branch to work on. Create your branch from `dev`.
-   Add your changes, add or adapt tests, run linter and generate doc.
-   Push your branch to your fork.
-   Create a pull request targeting the `dev` branch.

### Requirements

-   [Node.js](https://nodejs.org/)
-   npm
-   Typescript

### Commands

```sh
npm i   						// Install dependencies
npm run ts-watch 			// Watch and compile TypeScript files into `lib`
npm run gen-docs				// Re-generate documentation
npm run test					// Runs all tests
```

## Useful Links

[Discord Community](https://discord.gg/QH2n2hT)
[Ellcrys Documentation](https://docs.ellcrys.org)
[Gitter](https://gitter.im/ellnet)
