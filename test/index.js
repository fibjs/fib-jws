var jws = require('..');

var test = require('test');
test.setup();

const jwk_rsa = {
    "kty": "RSA",
    "e": "AQAB",
    "n": "t0LunXgUABq9Xj48Cvov_eWAQrB0zPMSHeoYkZeYV1PyjtYDhKCoXHRy5kotd__Pb8Up491lIgirsqS77elx551xh0lkkhnCptAH9PEqmNUB7TLbD4bpE54e0YPQ1FV806g2WIGMzJiufE0bascj8GQZn8FBj1PH4asagVCdyS8",
    "d": "VAdqpeWDNjEMl4PtwBLLop1y3CFQzRC_Q9ws-8UI4zHozDmxT0TjLdFvRczJYHZ5RQSgmozPbHWRVM5YJVSfFw9-OsOZLY3OtknBuvhuurhmfiluoIbfl8xrKDf8bhl-2TH_tE7OpL_Z_BBjVS9hiZVE-YmUDNCfgvyM64Kz3fE",
    "p": "5uZREKybxtz0nxF5iB83CJB8KxrksM8P6xFWcpFji4oU_CVo0hUlG8oXJxTNkPBlrII__Lkq5Y6ZNhSdeLNZzQ",
    "q": "yy7lcdB4b8q5QhYMO_a4yVCWQnDWZiAF8sjhFTH2a683XTA3Rp9xQDZvYqc0FFtv8XLR9BcRQtMS42XQoKHC6w",
    "dp": "l_2b9yHoGOtxixPxsAz8KQMS-TzmtQxYKiBri1bw8_WdAq2NZlzM5JIO04b6GiJkiz3h6PXqqtlHOTYwwjctMQ",
    "dq": "Sl3QxvaJjklBw0l0kuH7wltHk-ve3SQtaS5TC8Hssn9AIVCLesLS3bDO1eni6uyIrXPcGp3yyGWfDTHvyUtLnw",
    "qi": "sicXoD3X6VR5lhG_faUMDQjKLvi9IIgeNxLJdQj-WVsIwshJ2dOVKpR8hUnhDPNJFutz5HEtDX92P1ZizuGBXQ"
};

const jwk_p256 = {
    "kty": "EC",
    "crv": "P-256",
    "x": "QSsDKjaLTNb3CBZIIqlqwMC-tcQgHGuHdatw6xx0QuA",
    "y": "VAgVNr07Ck6OuQQiWMGq4s8YZGKRT87qRk4r4nAalVg",
    "d": "KZgvxxGq-xztOtnQ9XJHKtFwb6Qj8-3wEQFV7kW6BkE"
};

const jwk_p256k = {
    "kty": "EC",
    "crv": "secp256k1",
    "x": "7E2eEBAdhCFYOTlCT3o3B-aFiYxxG6yMA4yCUJWS95I",
    "y": "95WgicRnizqQwlYcHsyZR4mswaUETsc_KuWxyw6_uO0",
    "d": "FbEkNqkmYfaf50DPKP4Oion-BsZFQx7g1A3pM5s5X5U"
};

const jwk_p384 = {
    "kty": "EC",
    "crv": "P-384",
    "x": "b0IQZ3q4kjIndXrr3pPLMLzdbr74j4KN7f2v3tWjFP9B6P5lp9eTp4He3OQSmLcF",
    "y": "0sZ10AUJ26UlV0PHXIoParNSFPuBkrcGA5XPsZjHR5ifoMdvLRaeFl4Y6uugos4Q",
    "d": "XakINEHwR0V0kQ7XyitbM3I98dypz2lUXWd46MJ8DzKjM8OO_sxFIaZ4P7bKR0qj"
};

const jwk_p521 = {
    "kty": "EC",
    "crv": "P-521",
    "x": "AevYZBcVpweNUIPTxRa1PGCHpNiiVJcNu4gSVvxIkXSENkFNr36P1lSeEuqPo2tqtaBBd_O3E91R3JjcbG4h0nG9",
    "y": "AZWbIcFfv5GFWIdXqauxAWyweN04NriqgqwyXG4F3hoG66JxjIe9j1_7ZuOCWjMSCeWxTjtkc3bzM3YZh3qxExCq",
    "d": "ADyFyNJCqtc5f1YGu330J_qFLVvapnDRydPsrFwIxxPVtnbGUdUsD3-nQfgnhTV2H49Bku2n7k9mmF6638oXBw1s"
};

const jwk_ed25519 = {
    "kty": "OKP",
    "crv": "Ed25519",
    "x": "xaJMTnO3oEipwJmmN68usxFKyWuImM2FP8jYvA3Z46o",
    "d": "dBiAYmRBdLn_80Xiy8F6jVPJ9s-jap-f3Anbk0suRhg"
}

const jwk_sm2 = {
    "kty": "EC",
    "crv": "SM2",
    "x": "Na1B7soopNRgyrVnvCxwi-7Ru0nq5HORSLM2tquM7qQ",
    "y": "zmOTuaAha3Kuoo2UE0_edqQsvMe7jVJvA0cCjaTl7Tc",
    "d": "SdOvpH5DJ97dnA3UInQfwe6MK9nnaIQUb35cOFCNNRY"
};

var hJWSHSPass = "616161";
var sJWSHS256 = 'eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.30u5iaBy0IWqpiHcXKZGf7RO-rZgWHDj1bTI3YoFaTk';
var sJWSHS256BufKey = 'eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.pLem30ReEpeXgMt6e3gjZ6QYSpLBbhd_NB-Afud1m4A';
var sJWSHS512 = 'eyJhbGciOiJIUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.9edDUgkCWS2bMzpwQEuEC-CR3Oq4Uh9lAthMggxVXjznd6eg1D2WhjKqwBoJZAapvyKeQDxOxP2xx5x5c7AgoA';
var sJWSRS256 = 'eyJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.ZazJJUUs46DcEHrfgs_3Uygj4ASAMS2Xt1y0jzHVQGQ-Q18FDrnF06rzcEb393jaMGXSxa9EbYVwV-V3U9byW8L2-knFOG81bVCJi2IIs3t0usZp0_VvX9J6BeX7dNjVd4YfMTLUbeXgyJ5xZTo2y2LYTFrrizGaOPskFnSHSxw';
var sJWSRS384 = 'eyJhbGciOiJSUzM4NCIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.N_gjaRG3Ub40H7BQJnuIMD0Ctuo7UbIFJy57HVaoBm7SEPOXs-SRCp5vEPQmmBmPCk1xC7BZ50uMedV7pEffmswfdTqoqZ1Hx_zVq2BPOVAh0vEPQfXQxDz6EK8R0pFrGUViqjDNGb5iCq3eUuJlQSU1y3B1nyn6JDRqkv6b8jg';
var sJWSRS512 = 'eyJhbGciOiJSUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.VCd2nFVU_cPMj4I1e5O3OPgjAPcTFz-Gvq9-CdrnTcv0OPa43yPU2CyvUQs2B8VeaIlnu6LJt-bPIy90GdstmNY6oRqQAO1BAdXnTNT-8FfpCCe8eLQ9y0JLnUCmZIyuxuvocq5CTuJU5UKf9yxUKLzp44LqCagR0Bz1JsMen9o';

describe("jws", () => {
    it("ALGORITHMS", () => {
        assert.deepEqual(jws.ALGORITHMS, [
            'HS256', 'HS384', 'HS512', 'HSM3',
            'RS256', 'RS384', 'RS512',
            'ES256', 'ES256K', 'ES384', 'ES512', 'SM2SM3',
            'EdDSA'
        ]);
    });

    describe("sign", () => {
        it("algorithm test: unknown algorithm", () => {
            assert.throws(() => {
                var sJWS = jws.sign({
                    "cty": "JWT",
                    "alg": "unknown"
                }, {
                    "age": 21
                });
            });
        });

        it("algorithm test: none specifyed in args", function () {
            var sJWS = jws.sign({
                "cty": "JWT",
                "alg": "none"
            }, {
                "age": 21
            });
            assert.equal(sJWS, 'eyJhbGciOiJub25lIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.');
        });

        it("algorithm test: order of args", function () {
            var sJWS = jws.sign({
                "cty": "JWT",
                "alg": "none"
            }, {
                "object": {
                    "z": 300,
                    "a": 100,
                    "b": 200
                },
                "array": [
                    1, 2, 3, 4, 5
                ],
                "age": 21
            });
            assert.equal(sJWS, 'eyJhbGciOiJub25lIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxLCJhcnJheSI6WzEsMiwzLDQsNV0sIm9iamVjdCI6eyJhIjoxMDAsImIiOjIwMCwieiI6MzAwfX0.');
        });

        it("algorithm test: none", function () {
            var sJWS = jws.sign({
                "alg": "none",
                "cty": "JWT"
            }, {
                "age": 21
            });
            assert.equal(sJWS, 'eyJhbGciOiJub25lIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.');
        });

        it("algorithm test: HS256", function () {
            var sJWS = jws.sign({
                "alg": "HS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, hJWSHSPass);
            assert.equal(sJWS, sJWSHS256);
        });

        it("algorithm test with Buffer key: HS256", function () {
            var sJWS = jws.sign({
                "alg": "HS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, new Buffer(hJWSHSPass, 'hex'));
            assert.equal(sJWS, sJWSHS256BufKey);
        });

        it("algorithm test: HS512", function () {
            var sJWS = jws.sign({
                "alg": "HS512",
                "cty": "JWT"
            }, {
                "age": 21
            }, hJWSHSPass);
            assert.equal(sJWS, sJWSHS512);
        });

        it("algorithm test: HSM3", function () {
            var sJWS = jws.sign({
                "alg": "HSM3",
                "cty": "JWT"
            }, {
                "age": 21
            }, hJWSHSPass);
            assert.equal(sJWS, 'eyJhbGciOiJIU00zIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.PBcFzxrSZLm2BcF8_4-ZWczfrRQrKP507YvKVF_MjL8');
        });

        it("algorithm test: RS256", function () {
            var sJWS = jws.sign({
                "alg": "RS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_rsa);
            assert.equal(sJWS, sJWSRS256);
        });

        it("algorithm test: RS384", function () {
            var sJWS = jws.sign({
                "alg": "RS384",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_rsa);
            assert.equal(sJWS, sJWSRS384);
        });

        it("algorithm test: RS512", function () {
            var sJWS = jws.sign({
                "alg": "RS512",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_rsa);
            assert.equal(sJWS, sJWSRS512);
        });

        it("sign test for algorithm ES256(NIST P-256)", function () {
            var sJWS = jws.sign({
                "alg": "ES256",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_p256);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFUzI1NiIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm ES256K(secp256k1)", function () {
            var sJWS = jws.sign({
                "alg": "ES256K",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_p256k);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm ES384(NIST P-384)", function () {
            var sJWS = jws.sign({
                "alg": "ES384",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_p384);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFUzM4NCIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm ES512(NIST P-521)", function () {
            var sJWS = jws.sign({
                "alg": "ES512",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_p521);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm SM2SM3", function () {
            var sJWS = jws.sign({
                "alg": "SM2SM3",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_sm2);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm EdDSA", function () {
            var sJWS = jws.sign({
                "alg": "EdDSA",
                "cty": "JWT"
            }, {
                "age": 21
            }, jwk_ed25519);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFZERTQSIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2], 'DlwPYT6e2hg8V908m_M7o98KLZ6NpwaxXGlfg5twmLST-jDqW0COxj-tP4Vk826Szrf3z7cOa3xGbXo-WEfoDg');
        });

        xit("algorithm test: PS256", function () {
            var sJWS = jws.sign({
                "alg": "PS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);

            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJQUzI1NiIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2], 'YTCmApFpE7mH_SyiqhSRfUSj12E6JnWrhNon7q4iXQPcYNpReBuEiDJ1PYvxmYqrHaf4lFYNeiq5HkaoW2LSKRke168jBPfXIBBMzgV50prMb7b1h7Xz7lH6QeW9R_L-F00SS3tzHlRPu8ber0K2_1H8tiJ-TMJ9Qws0tAGSLCU');
        });

        xit("algorithm test: PS384", function () {
            var sJWS = jws.sign({
                "alg": "PS384",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJQUzM4NCIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2], 'Gs2QjLH6DjLDE-I87m9cAz_vgTvJW0FNBCpxLG-dlMHeGxZvvrMAhqV8W23wtrdeDO_xzWRYahIqTEbZJgRk-DwPqwa03EPuLo-puKyiW-k3xowgZ64DxTDJwZJ1I-tNaC2AjUtJlnmT1dCpdVhPGdZSw0y08zwZ7RIa7lZ17IY');
        });

        xit("algorithm test: PS512", function () {
            var sJWS = jws.sign({
                "alg": "PS512",
                "cty": "JWT"
            }, {
                "age": 21
            }, z4PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJQUzUxMiIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2], 'k0RMLj7dBQyI9bnorV7fJE15N_E1peyhoIrFoiwzilHhBOd3gpH_idXvI5s_Ury46tfTelWShVcjMQeHbeY9t5cjOwoTpc7Q8lIgjCQH-VSvhv2Ks8ybU4hYT7JsJ6gkKj2bWduHOZdAyj9SpY-Wu_gZLHENMCLgKYq-2ShTfHHRkvhxKZYnAgMz6x25chVG6NPALmMX6_pZfXAvLIiWlMr1iyuPbZTzfW-Y_SmFUPdVqcWkXZJaWMjKwkQYxZ1GrXgvGVSfxNpKPSg3JXIQvMuAr-fQLeMbn0OOf1frtUjH7Pvpv0QyJxDZG5GqzK2B9OdEYU8XjRW1Xsc2WScZTw');
        });
    });

    describe("jws", () => {
        it("verify test for algorithm none", function () {
            var result = jws.verify('eyJjdHkiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZ2UiOiAyMX0.');
            assert.equal(result, true);
        });

        it("verify test for algorithm none with ignored key", function () {
            var result = jws.verify('eyJjdHkiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZ2UiOiAyMX0.', 'ignored key');
            assert.equal(result, true);
        });

        it("verify test for algorithm HS256", function () {
            var result = jws.verify(sJWSHS256, hJWSHSPass);
            assert.equal(result, true, "");
        });

        it("verify test for algorithm HS256 with Buffer key", function () {
            var result = jws.verify(sJWSHS256BufKey, new Buffer(hJWSHSPass, 'hex'));
            assert.equal(result, true, "");
        });

        it("verify test for algorithm HS512", function () {
            var result = jws.verify(sJWSHS512, hJWSHSPass);
            assert.equal(result, true);
        });

        it("verify test for algorithm RS256 z3", function () {
            var result = jws.verify(sJWSRS256, jwk_rsa);
            assert.equal(result, true);
        });

        it("verify test for algorithm RS384 z3", function () {
            var result = jws.verify(sJWSRS384, jwk_rsa);
            assert.equal(result, true);
        });

        it("verify test for algorithm RS512 z3", function () {
            var result = jws.verify(sJWSRS512, jwk_rsa);
            assert.equal(result, true);
        });

        it("verify test for algorithm ES256(NIST P-256)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.izTfVUDNG2S4laFxJbBV3PiE1GaSKB0FDbfNvYm1meagwIwbCLeuUHHZUM9wqTSES78KlOjY2_U7w0PW0wbyig', jwk_p256), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.Zyw4voTJU-ZUfb_C3pH4HWwVPTGBnPnNItxXHfEovf1vs6SYJxQc3pEM9JvSkFmdP9Co22tTvK30M7G7Ttyf_g', jwk_p256), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.UyPLqSunksUkaSKWz5UZf_Mwjurzhsr8hQPnLQGZulScZq-4XHcCj9Qw-VakQp6tP7pY-P6Ja6YwXC-aRnnfXw', jwk_p256), true);
        });

        it("verify test for algorithm ES256K(secp256k1)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.CyhJ2Z8GU8JMsW3cMePaF0Pj9kcHu8IGJowvEWkDw-GHbhbaWsaCbREtHKmGnoKVhFsMshyBpP-yzt-wCGhZgA', jwk_p256k), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.bhHUGivuD9EOFvVW8SqQ0_3rt6k3QkPlXnwcDOVI_1V9U0DO7IHam6cQEZwgfbsb9_U5bhWsn2GNAYqC7zTOUA', jwk_p256k), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.tcOlglTG8jAC3ZmLBLeHtpzd7GxKTGxp74a1sLEBq3b4R1AQwOqka_0OmTUd5qcbS3pLXQntOMPT3gHsbD95Kg', jwk_p256k), true);
        });

        it("verify test for algorithm ES384(NIST P-384)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.x5H1t5AEiAnR9GDKKtDJtXxnlPpNyLnsZY2ycYQ_Gjj6VgckeOehscomG6-nhan78nprOGbbIaFBgebeldh1VXZ7NEt802FLIRBVZvFOJYXVH1vAxOCi6ZQFKsihOOG-', jwk_p384), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.JRPI36qVt_hO8STBL-A8iDjBkA_fZqqRKrjsU6u3PsppeNO_h8OSwmHCrzpbeNTzNgghnaDJY5h1LpvxGQcOMABODJ4iWe4gm0aQvZsdq9KWIZV675JiJHgprFKtyDTd', jwk_p384), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.9joaqGjz7x9zxoZgnH2Boj4WAW3Ul29r5FiyiGDrzyC7OQiS9v51Gf39_oNa48e3iPdIVG02TtiXSOisLK3qq4_5YVdmn7CLp78l3w3Cm-MpBz_zxCAcfBKmB2apOWH8', jwk_p384), true);
        });

        it("verify test for algorithm ES512(NIST P-521)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.AVbef8S9_aJY49ZQQ2MqxizaDRt_3FEd3DUmSWkFf-jZ1Jtha9rJKR6XRkLcxfVVCilg1xPGALFQQ4a4nwlB3cNaASiRdktbLASTDb7UZ9LbiFkq1CHnzhfTkPpHDvHSLj04lZ3jbsZdxjbRW8pvDZiMycPAfvIVVMddGUsvPLEM5rgO', jwk_p521), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.AEh9pEMuUepHngHJuPPScbniLfVFITFyPz_s92_LVsZDfhZUY7_FfvgKiX98c0jqhzwcVDhrmdN71CV3BEdG4bIBAYWuHUclW5Zo-71B0wlulqq0Rpkxk6nOGXkE_4uOJoPrkaek9PteFHH7Oio7ENb69zYM-JIRlNzJs3nNvIAH0fGl', jwk_p521), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.AS1u_sSuAHd3vO7ziVXX8neeykcL4Gi_t8gfj4FpXebmp36zR-Z1SvaYlPPKqergnTLBZD_u15mzzIPmZ1LvFXjVALWfWbdcK2JMRNXtTKPX8dO7UI_6mya0Fgu-Wg58hSZ9PGUTKgseHUPWU-1yx0uDP-Lo_Kbm3deZ3RAFqd8f0eus', jwk_p521), true);
        });

        if (process.version <= "v0.37.0") {
            var sm2PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoEcz1UBgi0DQgAEwfulw1wMxo7b+3HrGlEvfyaUkjy/
qHgclV503uiei42yv2o3HcEU+5+rL3os/o5ZiO5/IYdH6aR3AVJTVGSUiA==
-----END PUBLIC KEY-----`;

            it("verify test for algorithm SM2SM3", function () {
                assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.AzJ4KaYFfDnJqmzhdgVomSrP8SKjV2222ARJpSpE2dkHSPD_GcLf3CXjhIfCvwAvgP1Al8z8P6eJ_UkGvlnxLA', sm2PubPemP8), true);
                assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.5Tvn62blLvNX7yUzCXDJg8gXR4CBLvVNVnG3PfLX4zP0g2YwB-5r6k-lp4Ub4aSFMZm9xDTyIOQCPCiQH99LSg', sm2PubPemP8), true);
                assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.G1A-6xxdYPTKKk5fcpUGrmnPDqpXuPZ438I8Mx7tafGDXVYsmomd0i9EN-6blH0OpHOmBrch_OnS-uFUlw_OOw', sm2PubPemP8), true);
            });
        } else {
            it("verify test for algorithm SM2SM3", function () {
                assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.K0hN53oMxZptFIVaNmb7U_2Z6B4osY7ku23gcE-ynVEi3k6h9TQ-onH3QOuULB2TLfnHiKWd7o4jDfjFLGfFfQ', jwk_sm2), true);
                assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.i7K40oqnBFZbBaWHyjpl652Hcp2dQhZtWR21oVF-6xzsoTyES3p44fyacVcTMxtOM67J01giKcMKL8fQWDyN6Q', jwk_sm2), true);
                assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.JzGXEcph3eFsY2jWI6j5V2ip9eY9UGjjqWNJA2OvijkcfrcomYaNmi5j_BM-le4LpZRB-od83kl5Yx0zmSf8Jg', jwk_sm2), true);
            });
        }

        it("verify test for algorithm EdDSA", function () {
            assert.equal(jws.verify('eyJhbGciOiJFZERTQSIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.DlwPYT6e2hg8V908m_M7o98KLZ6NpwaxXGlfg5twmLST-jDqW0COxj-tP4Vk826Szrf3z7cOa3xGbXo-WEfoDg', jwk_ed25519), true);
        });

        xit("verify test for algorithm PS256 z3", function () {
            assert.equal(jws.verify('eyJhbGciOiJQUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.TGkI8x3Be2Z4Hu5c1hP75uMg0XDmDBrqb-pAbp0IbCYElPloOsGVaEqdPqsl8Ck2b3tmMrFtzcUTSYMWncpP4sBlFH5HCVEBo-8Qt23K53wNBM5d13vD0u-GPDUkdz1WbMrGfsOg64yiQrz1aIkLPaKvTN9lOni4hutNHBnIWZA', jwk_rsa), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.cVJs2mltXOoWwm7nrlf8tdUQ6THB65BD4oVdxhPcvMVv8qZPG8EEjsRzaexevBt_U5yzidkjqcy4eK9A2vJpm1Nx1iMlHlvps1Qp28m9fQcfXDn0UUpMKRCtjeof4Q4y3Luse5tecHkfTClyCvenJ1cCmYsV8QhVATeLy3J4z5g', jwk_rsa), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.kax6sH0vKJwRE6RJkEZeH0IEPsZ0_KU3QTNBNAeBm677I3OwiZqDb-ryVj442odoUywRiJlSexnz4MbPQ0vCOLT_KvfAVers0NFXJmM6E0vfFfw1Jgs5dNwedBo0BAqD-jL9qS21OBKDb7QCNHDGRiMR6KldGp9v312Vb7HO3GQ', jwk_rsa), true);
        });

        xit("verify test for algorithm PS384 z3", function () {
            assert.equal(jws.verify('eyJhbGciOiJQUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.W7smmk62AVqQvkMUlOOFs251qGFZdq87CqWmExhl1JfKTjadUScrFZQ5_1oaAP234dq8sTG42Sdotvcb_tz15bfR4qHIcNzpHjO0QKNHLe3STLgBuwkFR4O4waaldqqRyqxFbS2zxW6QSbH2mayIm_3ipbL9Evbqm3aC0TcwvnQ', jwk_rsa), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.BztDRoB11X7HgIpg_uRSMa0T8gkOgHFmlPo8FGkrmDTUnV9ZbO12L7bmOzrbeCbtWOYyVO8XKUfqo8gUATgr6g4IEnpG8HTPZRsouxGvr7YvLp-NHypwtXSxo4U8QCDs--fpOcmTnQpShKOd9EPwuTuoeLjGG6o6DOOu7SgK7EM', jwk_rsa), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.c7MSE8a-P4OD9gfPEixnS5o1ZgN99yTrt_o2G3OINX47rFOYiVgvrDgrZZXzTFNSZTcuHn4GbU3lB9IWVZMZJl8SE7qdNlSanM9YmkSsYfn4bvGFLdS62yfQWdwM-zngVI2KU5azXXS3DWMjBWrI3hlqqCjdNMMhRWfmoUnzVmc', jwk_rsa), true);
        });

        xit("verify test for algorithm PS512 z4", function () {
            assert.equal(jws.verify('eyJhbGciOiJQUzUxMiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.NEI4dMWsOkkwXT1KwOeoG99-CARxw3ChuuFafAEL6MA5pv3karjnqtaGWkCQCfEvvAACQXxUeEnaLT6Gp34HPJF0IS62qLGakOPJQqkfhSOi-Xe1yayqd4vN6YJ7noAial-fI53QqQcGqZ--CveagYOzNm57aOEdrRr0yDJtk3ZGE5qYVsRuqrVx-5UWhJ8NqkQWupx31IXBnWG8YVeoQXw_6DVPYaTDgyHzS8-lh6VQ1CGwPu6t9qjvBymZQnSIYy1sfUjyWCPYMOrO6MdQaTV2Y1mC5J0rZvn2jaA5vWuGn0YwMA2mQt3EFB9pEVpSxS5kAdilVfJq-Rpl4GoH3g', z4PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzUxMiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.MkwM9gx9CAcRo7x_vJDF23IIpLfB-nY7w5azrbre10OJWeDGPBoZJTJiucXwLzD_C-nrSnnnioTqRm8UeTL9je36HTfAG_8LvWzWUR11WY5SvhYnX-Nynw98I11EKLDGMjrSRUjbPELQICZ8CpniupcH9PCr-ExhcDZtcTVywST5IPsj01fKvtNyFPV-KHFnDEFd2U5MBdOKDOiqU2jrlG6WGKM_irDZ4jw01dSdn4kEsPYYC7U5dsQ91tcpeyGrj0EoD03-NbaHlF9LFd4RH1L2Eglj5zW664X4_86yVtF5inTKZqQHGoQ-KjY2BycJR7_K29Rgrp86SP2SEx4nEw', z4PubPemP8), true);
        });
    });

    describe('acceptAlgs', () => {
        it("arg test", function () {
            var func1 = function (a, b) {
                return b;
            };
            var result = func1(1);
            assert.equal(result, null);
        });

        it("arg acceptAlgs test (HS256 not in [HS512])", function () {
            var msg = "";
            try {
                var result = jws.verify(sJWSHS256, hJWSHSPass, ["HS512"]);
            } catch (ex) {
                msg = ex;
            }
            assert.notEqual(msg, "");
        });

        it("arg acceptAlgs test (HS256 in [HS256])", function () {
            var msg = "";
            try {
                var result = jws.verify(sJWSHS256, hJWSHSPass, ["HS256"]);
            } catch (ex) {
                msg = ex;
            }
            assert.equal(msg, "");
        });
    });

    it("decode", function () {
        assert.deepEqual(jws.decode('eyJjdHkiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZ2UiOjIxfQ.'), {
            header: {
                "cty": "JWT",
                "alg": "none"
            },
            payload: {
                "age": 21
            }
        });
    });
});

test.run(console.DEBUG);