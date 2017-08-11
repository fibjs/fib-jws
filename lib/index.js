var base64 = require('base64');
var hash = require('hash');
var crypto = require('crypto');

var formatEcdsa = require('./ecdsa-sig');

function getParamSize(keySize) {
    var result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);
    return result;
}

function b64(data) {
    return base64.encode(data, true).replace(/=*/g, '');
}

function sha_sign(hash_algo, data, key) {
    if (!Buffer.isBuffer(key))
        key = new Buffer(key, 'hex')
    return b64(hash.hmac(hash_algo, key).digest(data));
}

function sha_verify(hash_algo, data, sign, key) {
    if (!Buffer.isBuffer(key))
        key = new Buffer(key, 'hex')
    return b64(hash.hmac(hash_algo, key).digest(data)) === sign;
}

function pk_sign(hash_algo, data, key) {
    var k = new crypto.PKey();
    k.importKey(key);
    var sign = k.sign(hash.digest(hash_algo).digest(data), hash_algo);

    if (this != 0)
        sign = formatEcdsa.derToJws(sign, this);

    return b64(sign);
}

function pk_verify(hash_algo, data, sign, key) {
    var k = new crypto.PKey();
    k.importKey(key);

    sign = new Buffer(sign, 'base64');
    if (this != 0)
        sign = formatEcdsa.jwsToDer(sign, this);

    return k.verify(hash.digest(hash_algo).digest(data), sign, hash_algo);
}

var signs = {
    'none': () => {
        return "";
    },
    'HS256': sha_sign.bind(0, hash.SHA256),
    'HS384': sha_sign.bind(0, hash.SHA384),
    'HS512': sha_sign.bind(0, hash.SHA512),
    'RS256': pk_sign.bind(0, hash.SHA256),
    'RS384': pk_sign.bind(0, hash.SHA384),
    'RS512': pk_sign.bind(0, hash.SHA512),
    'ES256': pk_sign.bind(getParamSize(256), hash.SHA256),
    'ES384': pk_sign.bind(getParamSize(384), hash.SHA384),
    'ES512': pk_sign.bind(getParamSize(521), hash.SHA512)
};

var verifys = {
    'none': () => {
        return true;
    },
    'HS256': sha_verify.bind(0, hash.SHA256),
    'HS384': sha_verify.bind(0, hash.SHA384),
    'HS512': sha_verify.bind(0, hash.SHA512),
    'RS256': pk_verify.bind(0, hash.SHA256),
    'RS384': pk_verify.bind(0, hash.SHA384),
    'RS512': pk_verify.bind(0, hash.SHA512),
    'ES256': pk_verify.bind(getParamSize(256), hash.SHA256),
    'ES384': pk_verify.bind(getParamSize(384), hash.SHA384),
    'ES512': pk_verify.bind(getParamSize(521), hash.SHA512)
};

exports.ALGORITHMS = [
    'HS256', 'HS384', 'HS512',
    'RS256', 'RS384', 'RS512',
    'ES256', 'ES384', 'ES512'
];

exports.sign = (header, payload, key) => {
    alg = header['alg'];

    if ((alg != '' && alg != null) &&
        header['alg'] === undefined) {
        header['alg'] = alg;
    }

    var _sign = signs[alg];
    if (_sign === undefined)
        throw 'unsupported alg name: ' + alg;

    var data = b64(JSON.stringify(header)) + "." + b64(JSON.stringify(payload));
    return data + '.' + _sign(data, key);
};

exports.verify = (signature, key, acceptAlgs) => {
    var a = signature.split(".");

    var header = JSON.parse(new Buffer(a[0], 'base64').toString());
    var alg = null;
    var algType = null;
    if (header.alg === undefined) {
        throw "algorithm not specified in header";
    } else {
        alg = header.alg;
        algType = alg.substr(0, 2);
    }

    if (acceptAlgs != null &&
        Object.prototype.toString.call(acceptAlgs) === '[object Array]' &&
        acceptAlgs.length > 0) {
        var acceptAlgStr = ":" + acceptAlgs.join(":") + ":";
        if (acceptAlgStr.indexOf(":" + alg + ":") == -1) {
            throw "algorithm '" + alg + "' not accepted in the list";
        }
    }

    if (alg != "none" && key === null) {
        throw "key shall be specified to verify.";
    }

    var _verify = verifys[alg];
    if (_verify === undefined)
        throw 'unsupported alg name: ' + alg;

    return _verify(a[0] + '.' + a[1], a[2], key);
};

exports.decode = signature => {
    var a = signature.split('.');
    return {
        header: JSON.parse(new Buffer(a[0], 'base64').toString()),
        payload: JSON.parse(new Buffer(a[1], 'base64').toString())
    }
};