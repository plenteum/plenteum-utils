![image](https://user-images.githubusercontent.com/38456463/43392866-43c69cf4-93f5-11e8-81e2-3e3f81b6ca1d.png)

[![NPM](https://nodei.co/npm/plenteum-utils.png?downloads=true&stars=true)](https://www.npmjs.com/package/plenteum-utils)

#### Master Build Status
[![Build Status](https://travis-ci.com/plenteum/plenteum-utils.svg?branch=master)](https://travis-ci.com/plenteum/plenteum-utils)

# Plenteum Javascript Utilities

This package contains code that wraps [plenteum-crypto](https://github.com/plenteum/plenteum-crypto) primitives into an easier to use interface. This includes the ability to easily discover funds for a wallet, create transactions, sign transactions (ring signatures), create new wallets, verify addresses, and handful of other useful methods. These methods can then be wrapped into a Javascript-based wallet such as [plenteum-wallet-backend-js](https://github.com/plenteum/plenteum-wallet-backend-js).

If you experience any issues with this library, the best way to address such situations is to submit a Pull Request to resolve the issue you are running into.

## Installation

```bash
npm install plenteum-utils
```

## Initialization

### JavaScript

```javascript
const PlenteumUtils = require('plenteum-utils').CryptoNote
const coinUtils = new PlenteumUtils()
```

### TypeScript

```typescript
import { CryptoNote } from 'plenteum-utils'
const coinUtils = new CryptoNote()
```

You can find TypeScript type definitions [here](index.d.ts)

### Forking

If initializing for a different CryptoNote project you can specify the configuration.
All parameters are optional.

```javascript
const PlenteumUtils = require('plenteum-utils').CryptoNote
const coinUtils = new PlenteumUtils({
  /* The amount of decimals your coin has */
  coinUnitPlaces: 8,

  /* The amount of decimals your coin should display (mostly this will be the same as coinUnitPlaces) */
  coinDisplayUnitPlaces: 2,

  /* Your address prefix - this can be found in CryptoNoteConfig */
  addressPrefix: 18181,

  /* The amount of keccak iterations to be performed when creating seeds and
     addresses. Should be a large number if your are supplying poor entropy
     to the createNewSeed / createNewAddress functions. */
  keccakIterations: 100,

  /* The default network fee to use in atomic units */
  defaultNetworkFee: 0
})
```

## Public Methods

#### createNewSeed([entropy], [iterations])

Creates a new address seed using the provided entropy or if entropy is undefined, uses a randomly selected entropy source.

#### createNewAddress([entropy], [language], [addressPrefix])

Creates a new [address](#address) using the provided entropy, language (for the mnemonic), and address prefix if supplied.

#### createAddressFromSeed(seed, [language], [addressPrefix])

Creates a new [address](#address) using the provided seed, language (for the mnemonic), and address prefix if supplied.

#### createAddressFromMnemonic(mnemonic, [language], [addressPrefix])

Creates a new [address](#address) using the provided mnemonic, language (for the mnemonic), and address prefix if supplied.

#### createAddressFromKeys(privateSpendKey, privateViewKey, [addressPrefix])

Creates a new [address](#address) using the provided private spend key, private view key, and address prefix if supplied.

#### decodeAddressPrefix(address)

Decodes the [address prefix](#decoded-address-prefix) from the specified CryptoNote public address.

#### decodeAddress(address, [addressPrefix])

Decodes the address into the public key pairs, prefix, payment ID, etc. Returns a [decoded address](#decoded-address) object.

#### encodeRawAddress(rawAddress)

Encodes the rawAddress using CN-Base58 encoding.

#### encodeAddress(publicViewKey, publicSpendKey, [paymentId], [addressPrefix])

Encodes the publicViewKey, publicSpendKey, and payment ID into a standard CryptoNote address (or Integrated address if payment ID is supplied)

#### createIntegratedAddress(address, paymentId, [addressPrefix])

Creates an Integrated Address using the supplied address and payment ID.

#### privateKeyToPublicKey(privateKey)

Gets the corresponding private key from the given public key.

#### scanTransactionOutputs(transactionPublicKey, outputs, privateViewKey, publicSpendKey, [privateSpendKey])

*Documentation In Progress*

#### isOurTransactionOutput(transactionPublicKey, output, privateViewKey, publicSpendKey, [privateSpendKey])

*Documentation In Progress*

#### generateKeyImage(transactionPublicKey, privateViewKey, publicSpendKey, privateSpendKey, outputIndex)

*Documentation In Progress*

#### generateKeyImagePrimative(publicSpendKey, privateSpendKey, outputIndex, derivation)

The same as generateKeyImage, but allows you to reuse a derivation you have previously created, instead of re-deriving it. Returns [keyImage, privateEphemeral].

#### createTransaction(transfers, ourOutputs, randomOuts, mixin, feeAmount, [paymentId], [unlockTime])

*Documentation In Progress*

#### createTransactionAsync(transfers, ourOutputs, randomOuts, mixin, feeAmount, [paymentId], [unlockTime])

Functions as `createTransaction`, but runs asynchronously, and additionaly, supports user provided async functions.
The regular code only supports synchronous provided funcs, so ensure any async user provided functions are not being used in other calls you make.

#### serializeTransaction(transaction)

*Documentation In Progress*

#### generateKeyDerivation(transactionPublicKey, privateViewKey)

Creates the key 'derivation' given a transaction public key, and the private view key.
Can then be supplied to underivePublicKey, to determine if the transaction output belongs to you.
Returns a string.

#### underivePublicKey(derivation, outputIndex, outputKey)

Given the output index in the transaction, and the outputs key, along with a
derivation from `generateKeyDerivation`, this method will return a public spend key.
If the public spend key matches your public spend key, the transaction output is yours.
Returns a string.

## Common Data Structures

#### Address

```javascript
{
  spend: {
    privateKey: '517f0d3c5438416adad752557fdf001acfea189d35af8bba326c86928cc6100e',
    publicKey: '0b5a6ed3fde5470fe13a6e817b5b4caf4ce014e65155ae2f6db66a3b9ad6e819'
  },
  view: {
    privateKey: '40cf3cdab84ef0c2c17c100ffb1ba3cb1c86e22f2c4bed766a465d466b210a0f',
    publicKey: '1909af618bef1ecd30339fe12fb133bbaad05cc0ea365caf02254a5f3ae735df'
  },
  address: 'PLeuwmU3QWjU77wyHMvBiMdiQdKgj9qfEc3oiEhHfizSu8wZ6K8ZoWQQY57qNmDC48yg6UAHzyTugB9tMohMnUEArSCdrmeUdP',
  mnemonic: 'lagoon much skirting goes okay afield royal cupcake lordship myriad necklace pliers noodles laboratory axes useful poverty igloo diode ablaze nifty inline point ritual necklace',
  seed: '517f0d3c5438416adad752557fdf001acfea189d35af8bba326c86928cc6100e'
}
```

#### Decoded Address

```javascript
{ publicViewKey: 'f0ba225065e1b9c2e43165b3e41f10fcb768853126dfa7e612a3df2deb332492',
  publicSpendKey: 'f71e440f9a5aab08dbdab0f4f36bba813660a0600f109b1371dc53be33f23c99',
  paymentId: '',
  encodedPrefix: '9df6ee01',
  prefix: 3914525,
  rawAddress: '9df6ee01f71e440f9a5aab08dbdab0f4f36bba813660a0600f109b1371dc53be33f23c99f0ba225065e1b9c2e43165b3e41f10fcb768853126dfa7e612a3df2deb332492cc073a66' }
```

#### Decoded Address Prefix

```javascript
{ prefix: '9df6ee01',
  base58: 'PLe',
  decimal: 3914525,
  hexadecimal: '4705' }
```

### Credits

Special thanks goes out to:

* Lucas Jones
* Paul Shapiro
* Luigi111
* [The MyMonero Project](https://github.com/mymonero/mymonero-app-js)
* The Masari Project: [gnock](https://github.com/gnock)
* The TurtleCoin Project: [TurtleCoin](https://github.com/turtlecoin)
* The Plentum Project: [DaveLong](https://github.com/plenteum)
