# fib-jws

<!-- [![Build Status](https://travis-ci.org/fibjs/fib-jws.svg)](https://travis-ci.org/fibjs/fib-jws) -->
[![NPM version](https://img.shields.io/npm/v/fib-jws.svg)](https://www.npmjs.org/package/fib-jws)

An implementation of [JSON Web Signatures](https://www.rfc-editor.org/rfc/rfc7515.txt).

# Install

```bash
$ npm install fib-jws
```

# Usage

## jws.ALGORITHMS
Array of supported algorithms. The following algorithms are currently supported.

alg Parameter Value | Digital Signature or MAC Algorithm
----------------|----------------------------
HS256 | HMAC using SHA-256 hash algorithm
HS384 | HMAC using SHA-384 hash algorithm
HS512 | HMAC using SHA-512 hash algorithm
HSM3 | HMAC using SM3 hash algorithm
RS256 | RSASSA using SHA-256 hash algorithm
RS384 | RSASSA using SHA-384 hash algorithm
RS512 | RSASSA using SHA-512 hash algorithm
ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm
ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm
ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm
ES256K | ECDSA using secp256k1 curve and SHA-256 hash algorithm
SM2SM3 | using SM2 curve and SM3 hash algorithm
S256 | Schnorr using P-256 curve
S384 | Schnorr using P-384 curve
S512 | Schnorr using P-521 curve
S256K | Schnorr using secp256k1 curve
SSM2 | Schnorr using SM2 curve
EdDSA | EdDSA using Ed25519 curve
none | No digital signature or MAC value included

## jws.sign(header, payload, key)

Return a JSON Web Signature for a header and a payload.

Arguments:

* `header`
* `payload`
* `key`

`header` must be an object with an `alg` property. `header.alg` must be
one a value found in `jws.ALGORITHMS`. See above for a table of
supported algorithms.

If `payload` will be coerced into a string using `JSON.stringify`.

`key` is a buffer containing either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA, or the json format private key, or a PKey object.

Example

```js
const signature = jws.sign(
  // header
  { alg: 'HS256' },
  // payload
  { id: 12345, name: "Frank" },
  // secret
  '98DE76B1',
);
```

## jws.verify(signature, key, acceptAlgs)

Returns`true` or `false` for whether a signature matches a secret or key.

`signature` is a JWS Signature. `header.alg` must be a value found in `jws.ALGORITHMS`.
See above for a table of supported algorithms. `key` is a buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA, or the json format public key, or a PKey object.

`acceptAlgs` is a list of what algorithms are accepted.

## jws.decode(signature)

Returns the decoded header, decoded payload, and signature parts of the JWS Signature.

Returns an object with three properties, e.g.
```js
{
  header: { alg: 'HS256' },
  payload: { id: 12345, name: "Frank" }
}
```