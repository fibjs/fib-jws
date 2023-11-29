var crypto = require('crypto');
var hash = require('hash');
var base64 = require('base64');

function getParamSize(keySize) {
    var result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);
    return result;
}

function b64(data) {
    return base64.encode(data, true);
}

function sha_sign(hash_algo, data, key) {
    return b64(hash.hmac(hash_algo, key).update(data).digest());
}

function sha_verify(hash_algo, data, sign, key) {
    return b64(hash.hmac(hash_algo, key).update(data).digest()) === sign;
}

function pk_sign(pk_type, hash_algo, data, key) {
    var k;
    if (key.name == pk_type)
        k = key;
    else {
        k = new crypto.PKey(key);
        if (k.name !== pk_type)
            throw new Error('private key algorithm should be ' + pk_type);
    }

    if (this != 0) {
        if (k.curve != this)
            throw new Error('private key curve should be ' + this + ' but ' + k.curve);
    }

    var sign = hash_algo ? hash.digest(hash_algo, data).sign(k, {
        format: 'raw'
    }) : k.sign(data, {
        format: 'raw'
    });

    return b64(sign);
}

function pk_verify(pk_type, hash_algo, data, sign, key) {
    var k;
    if (key.name == pk_type)
        k = key;
    else {
        k = new crypto.PKey(key);
        if (k.name !== pk_type)
            throw new Error('public key algorithm should be ' + pk_type);
    }

    sign = new Buffer(sign, 'base64');
    if (this != 0) {
        if (k.curve != this)
            throw new Error('public key curve should be ' + this);
    }

    return hash_algo ? hash.digest(hash_algo, data).verify(k, sign, {
        format: 'raw'
    }) : k.verify(data, sign, {
        format: 'raw'
    });
}

var signs = {
    'none': () => {
        return "";
    },
    'HS256': sha_sign.bind(0, hash.SHA256),
    'HS384': sha_sign.bind(0, hash.SHA384),
    'HS512': sha_sign.bind(0, hash.SHA512),
    'HSM3': sha_sign.bind(0, hash.SM3),
    'RS256': pk_sign.bind(0, 'RSA', hash.SHA256),
    'RS384': pk_sign.bind(0, 'RSA', hash.SHA384),
    'RS512': pk_sign.bind(0, 'RSA', hash.SHA512),
    'ES256': pk_sign.bind('P-256', 'EC', hash.SHA256),
    'ES384': pk_sign.bind('P-384', 'EC', hash.SHA384),
    'ES512': pk_sign.bind('P-521', 'EC', hash.SHA512),
    'ES256K': pk_sign.bind('secp256k1', 'EC', hash.SHA256),
    'SM2SM3': pk_sign.bind('SM2', 'SM2', hash.SM3),
    'EdDSA': pk_sign.bind('Ed25519', 'EC', 0)
};

var verifys = {
    'none': () => {
        return true;
    },
    'HS256': sha_verify.bind(0, hash.SHA256),
    'HS384': sha_verify.bind(0, hash.SHA384),
    'HS512': sha_verify.bind(0, hash.SHA512),
    'HSM3': sha_verify.bind(0, hash.SM3),
    'RS256': pk_verify.bind(0, 'RSA', hash.SHA256),
    'RS384': pk_verify.bind(0, 'RSA', hash.SHA384),
    'RS512': pk_verify.bind(0, 'RSA', hash.SHA512),
    'ES256': pk_verify.bind('P-256', 'EC', hash.SHA256),
    'ES384': pk_verify.bind('P-384', 'EC', hash.SHA384),
    'ES512': pk_verify.bind('P-521', 'EC', hash.SHA512),
    'ES256K': pk_verify.bind('secp256k1', 'EC', hash.SHA256),
    'SM2SM3': pk_verify.bind('SM2', 'SM2', hash.SM3),
    'EdDSA': pk_verify.bind('Ed25519', 'EC', 0)
};

exports.ALGORITHMS = [
    'HS256', 'HS384', 'HS512', 'HSM3',
    'RS256', 'RS384', 'RS512',
    'ES256', 'ES256K', 'ES384', 'ES512', 'SM2SM3',
    'EdDSA'
];

function sort_object(o) {
    return Object.keys(o)
        .sort()
        .reduce((result, k) => {
            var _o = o[k];
            if (typeof _o === 'object' && !Array.isArray(_o))
                _o = sort_object(_o);
            result[k] = _o;
            return result
        }, {})
}

exports.sign = (header, payload, key) => {
    alg = header['alg'];

    if ((alg != '' && alg != null) &&
        header['alg'] === undefined) {
        header['alg'] = alg;
    }

    var _sign = signs[alg];
    if (_sign === undefined)
        throw new Error('unsupported alg name: ' + alg);

    var data = b64(JSON.stringify(sort_object(header))) + "." + (payload ? b64(JSON.stringify(sort_object(payload))) : "");
    return data + '.' + _sign(data, key);
};

exports.verify = (signature, key, acceptAlgs) => {
    var a = signature.split(".");

    var header = JSON.parse(new Buffer(a[0], 'base64').toString());
    var alg = null;
    var algType = null;
    if (header.alg === undefined) {
        throw new Error("algorithm not specified in header");
    } else {
        alg = header.alg;
        algType = alg.substr(0, 2);
    }

    if (acceptAlgs != null &&
        Object.prototype.toString.call(acceptAlgs) === '[object Array]' &&
        acceptAlgs.length > 0) {
        var acceptAlgStr = ":" + acceptAlgs.join(":") + ":";
        if (acceptAlgStr.indexOf(":" + alg + ":") == -1) {
            throw new Error("algorithm '" + alg + "' not accepted in the list");
        }
    }

    if (alg != "none" && key === null) {
        throw new Error("key shall be specified to verify.");
    }

    var _verify = verifys[alg];
    if (_verify === undefined)
        throw new Error('unsupported alg name: ' + alg);

    return _verify(a[0] + '.' + a[1], a[2], key);
};

exports.decode = signature => {
    var a = signature.split('.');
    return {
        header: JSON.parse(new Buffer(a[0], 'base64').toString()),
        payload: JSON.parse(new Buffer(a[1], 'base64').toString())
    }
};