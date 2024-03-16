var crypto = require('crypto');
var base64 = require('base64');
var legacy = require('./legacy');

exports.ALGORITHMS = [
    'HS256', 'HS384', 'HS512', 'HSM3',
    'RS256', 'RS384', 'RS512',
    'ES256', 'ES256K', 'ES384', 'ES512', 'SM2SM3',
    'EdDSA'
];

exports.decode = signature => {
    var a = signature.split('.');
    return {
        header: JSON.parse(new Buffer(a[0], 'base64').toString()),
        payload: JSON.parse(new Buffer(a[1], 'base64').toString())
    }
};

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

const signs = {
    HS256: {
        algo: 'SHA256',
        hmac: true
    },
    HS384: {
        algo: 'SHA384',
        hmac: true
    },
    HS512: {
        algo: 'SHA512',
        hmac: true
    },
    HSM3: {
        algo: 'SM3',
        hmac: true
    },
    RS256: {
        algo: 'SHA256'
    },
    RS384: {
        algo: 'SHA384'
    },
    RS512: {
        algo: 'SHA512'
    },
    ES256: {
        algo: 'SHA256',
        dsaEncoding: 'ieee-p1363'
    },
    ES256K: {
        algo: 'SHA256',
        dsaEncoding: 'ieee-p1363'
    },
    ES384: {
        algo: 'SHA384',
        dsaEncoding: 'ieee-p1363'
    },
    ES512: {
        algo: 'SHA512',
        dsaEncoding: 'ieee-p1363'
    },
    SM2SM3: {
        algo: 'SM3',
        dsaEncoding: 'ieee-p1363'
    },
    EdDSA: {
        algo: null
    }
};

function sign(header, payload, key) {
    alg = header['alg'];

    if ((alg != '' && alg != null) &&
        header['alg'] === undefined) {
        header['alg'] = alg;
    }

    var data = base64.encode(JSON.stringify(sort_object(header)), true) + "." +
        (payload ? base64.encode(JSON.stringify(sort_object(payload)), true) : "");

    if (alg === 'none')
        return data + '.';

    var _sign = signs[alg];
    if (_sign === undefined)
        throw new Error('unsupported alg name: ' + alg);


    if (_sign.hmac)
        return data + '.' + base64.encode(crypto.createHmac(_sign.algo, key).update(data).digest(), true);

    var signature = base64.encode(crypto.sign(_sign.algo, data, {
        key,
        dsaEncoding: _sign.dsaEncoding
    }), true);

    return data + '.' + signature;
};

function verify(signature, key, acceptAlgs) {
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
        if (acceptAlgStr.indexOf(":" + alg + ":") == -1)
            throw new Error("algorithm '" + alg + "' not accepted in the list");
    }

    if (alg === 'none')
        return true;

    if (key === null)
        throw new Error("key shall be specified to verify.");

    var _sign = signs[alg];
    if (_sign === undefined)
        throw new Error('unsupported alg name: ' + alg);

    if (_sign.hmac)
        return base64.encode(crypto.createHmac(_sign.algo, key).update(a[0] + '.' + a[1]).digest(), true) === a[2];

    return crypto.verify(_sign.algo, a[0] + '.' + a[1], {
        key,
        dsaEncoding: _sign.dsaEncoding
    }, base64.decode(a[2]));
};

if (crypto.createSign) {
    exports.sign = sign;
    exports.verify = verify;
} else {
    exports.sign = legacy.sign;
    exports.verify = legacy.verify;
}
