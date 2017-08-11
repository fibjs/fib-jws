var jws = require('..');

var test = require('test');
test.setup();

// z1.prv.p5p.pem (RSA)
var z1PrvPemP5P = "" +
    "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIBOgIBAAJBAOhmTdK0BSkSFWjzs5vJemLnujwJur3E8NzY35DreQubtkWitw4x\n" +
    "EnR7TTxBtRQkiVEV/viPedQ+rlsaTjUY/VkCAwEAAQJAeLvFTGRnlemmI8sPkSx/\n" +
    "n2hhcRVg5Xut4h3tL32Vefhicvq55xqycoLCdgxATa5qyKOrhSz2vNVi+a/4JHom\n" +
    "TQIhAP6b1FCGazJVYU/el2p2rAsdWDDdpk9TWblG2FErwSOfAiEA6atoD18F27D0\n" +
    "MRsOb0No9IdKEjiXnYvGAMNcbyBwfAcCIQDVSctpjcF9T+MOWoTzrehgAzwe639n\n" +
    "0oZGXJ/YF9RbNwIgGEm0u0RJO5idCS2ixnXfRut5C4POXpXUsuebiAF7L6kCIH0m\n" +
    "GpYlbUmwIMsdWH7N4Sfgk6TSs0zb/xcfNBJbWFep\n" +
    "-----END RSA PRIVATE KEY-----\n";
// z1.prv.p5e.pem (RSA)
var z1PrvPemP5E = "" +
    "-----BEGIN RSA PRIVATE KEY-----\n" +
    "Proc-Type: 4,ENCRYPTED\n" +
    "DEK-Info: DES-EDE3-CBC,4626F2E5853E783F\n" +
    "\n" +
    "3vFpkrnbantC8RSzng2+jBw/VX95oi0VGKP0G8whENHUOVQXB/YOUSj+n80Y0Wwc\n" +
    "GpeQi8U0FQdWyYv8b9aioeFB06r9t9mJsYscJ/wcIvv5tTMkr89cwN3+4GQQuqNg\n" +
    "TmI9ekeoZ3NP26hTM4XTuFqHx4dzNNwjDLc8txc77WE/o4J4p8k9Py5yPZjs9EKy\n" +
    "wy/yxtqQYQuFj90OMEG1G89iHTZRcq4YTZYdqg6P/XEUvyjifN+7Nym8f2N9TDDn\n" +
    "RJtApPQlrgXvUDQKz6Lu1ZYMwe94E9YdutDGQMbxixbiyxlcxrkb/oEHH5WP5qPG\n" +
    "w/xzh08Ce2Ftba2Q860S8nznjyZFiv+lqSKBahbujgP/63ZL+JbAd4cYBqgm4g1C\n" +
    "YwMhHJbaVCzwYduxdyK2JBYEosDZiDfnOP4DqPhJYpg=\n" +
    "-----END RSA PRIVATE KEY-----\n";
var z1PrvPemP5EPass = "hoge";
// z1.prv.p8e.pem (RSA)
var z1PrvPemP8E = "" +
    "-----BEGIN ENCRYPTED PRIVATE KEY-----\n" +
    "MIIBpjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIyScsGkpMl3kCAggA\n" +
    "MBQGCCqGSIb3DQMHBAiObBK7oyBAzwSCAWCkStExnU3pYBQAxRqDctg5QEO3Ic1d\n" +
    "GsRW+JW0kNonUydoOSD/7DBglnSDowiQ69HCW4OmumSJIU0hewX0yburFuy6Zs/q\n" +
    "DkWox7oxBCsgFmfmkKGcK0USeJ+LX+YZVbvCCvHZkd99pEqQSfkRu4DgXbWmo6Zv\n" +
    "2A6VFyBhE9MFmYex8mHTZ5cchBzAiFWRzjpRX94F4vbUFoXPGrEbOLovM2VpZ8Df\n" +
    "1nLuXhWYVHsXHWn+fm7TH4Xzh1mFYYkTiXL9ABwKKohEL2SQJzKpa9FZvOZAmlSe\n" +
    "UgQxVQLM/ZC+o4Vs4JHqIu4Ek2bgjEqDzo2EPznpcCsQTcwOqhPwNjP4Y3ovn1Nm\n" +
    "8i0Hx51OA0vjRZBvvduKM9d5kRAOg8jqLjeWU3KraWLuSJ96RTzlWFgw6PsML+RE\n" +
    "LHfdKDjRT0NMEMRh892oBi828asvvSWO6HYcM0xclt0uakxJhVP/mtzA\n" +
    "-----END ENCRYPTED PRIVATE KEY-----\n";
var z1PrvPemP8EPass = "passwd";
var z1PubPemP8 = "" +
    "-----BEGIN PUBLIC KEY-----\n" +
    "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOhmTdK0BSkSFWjzs5vJemLnujwJur3E\n" +
    "8NzY35DreQubtkWitw4xEnR7TTxBtRQkiVEV/viPedQ+rlsaTjUY/VkCAwEAAQ==\n" +
    "-----END PUBLIC KEY-----\n";
var z1CertPEM = "" +
    "-----BEGIN CERTIFICATE-----\n" +
    "MIIBdTCCAR+gAwIBAgIBBTANBgkqhkiG9w0BAQUFADAaMQswCQYDVQQGEwJVUzEL\n" +
    "MAkGA1UECgwCYTEwHhcNMTMwNTA0MDM0MTQxWhcNMjMwNTA0MDM0MTQxWjAaMQsw\n" +
    "CQYDVQQGEwJVUzELMAkGA1UECgwCYTEwXDANBgkqhkiG9w0BAQEFAANLADBIAkEA\n" +
    "6GZN0rQFKRIVaPOzm8l6Yue6PAm6vcTw3NjfkOt5C5u2RaK3DjESdHtNPEG1FCSJ\n" +
    "URX++I951D6uWxpONRj9WQIDAQABo1AwTjAdBgNVHQ4EFgQUxUc+4gDI561wA9/1\n" +
    "QguM3fTCDhUwHwYDVR0jBBgwFoAUxUc+4gDI561wA9/1QguM3fTCDhUwDAYDVR0T\n" +
    "BAUwAwEB/zANBgkqhkiG9w0BAQUFAANBALL2k69LjwOYfDXv3TXJUAFGUqto+Noj\n" +
    "CJLP08fOfNBZy+KAIy0GsrNU/3uRViqbuGqAnH9kFFwHQjOAFrAe8XQ=\n" +
    "-----END CERTIFICATE-----\n";
// z3.prv.p8p.pem (RSA)
var z3PrvPemP8P = "" +
    "-----BEGIN PRIVATE KEY-----\n" +
    "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALDikFExZMEW5bws\n" +
    "j9DckEA+Ai7jYe7+In5UHpsqCaqXlPlJQFpziDWDHp1IlWI6r+nZ/7AJhS3y6wbV\n" +
    "rF8IN4ohKaga1LIL3RDfnGbm4QcF06rrE0vHkMALUu0o/7zmR0qUgeNnRhd21J/+\n" +
    "5vt9nzbaigklghW3DKYCaZN/n3CbAgMBAAECgYEAq1zjGXWzuYi4SkQVk++KZGJu\n" +
    "dQRehU15F0/hUss4ECfH8HXxvW893zHG//MoncBjWjeTCPVAK9KxtK5ezrZELpXb\n" +
    "Q82HCR2yhf0Wjt4dMVPwyXs6AFfjv5fPYrwODQIOAccXuf8CirfHQlJu9WZCJH6X\n" +
    "mbOgYSxgzlWUn00vlTkCQQDeStbmlwK4SeSA6yKhCk2Oab3qojtP/FPPiNrMqVnH\n" +
    "IDDH9A0LAfUUvTsZL6PvLCsmkr2ubBn4EZUYX5qaIJkdAkEAy7UO9s4UJC3s4vVL\n" +
    "wOzqSkxq287x1wfRkLJbYCkkouV93MoGDoq2dJ1jLD99Ts0QB8zkcu/Bk4whAS/u\n" +
    "PIg7FwJBALDvtxCCINsZjfWDs+OlNMhnqJCLo1RuTzPBBg+juN9D4zA1NPCPFUn1\n" +
    "uYW5ou4sJQimAq9EQoNvU1K8Pm3yBo0CQQCaQfWe99dQvmZQR6ih48ZXlR6mbUO9\n" +
    "rfIIPMftPbq8kESLWYDUqj4YeMaMz1c4wRiOj52/W8eez9J+b6lctVzpAkAUWYjg\n" +
    "GoRPQcbtp1pc2qb4wIMG9+D/VevHkHH7x/RAIgNkK3+Y0XiAa2hAZvveUYua05Yy\n" +
    "akHe+tn1GooNC2SE\n" +
    "-----END PRIVATE KEY-----\n";
var z3PubPemP8 = "" +
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw4pBRMWTBFuW8LI/Q3JBAPgIu\n" +
    "42Hu/iJ+VB6bKgmql5T5SUBac4g1gx6dSJViOq/p2f+wCYUt8usG1axfCDeKISmo\n" +
    "GtSyC90Q35xm5uEHBdOq6xNLx5DAC1LtKP+85kdKlIHjZ0YXdtSf/ub7fZ822ooJ\n" +
    "JYIVtwymAmmTf59wmwIDAQAB\n" +
    "-----END PUBLIC KEY-----\n";
// z4.prv.p8p.pem (RSA 2048bit)
var z4PrvPemP8P = "" +
    "-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfdOqotHd55SYO\n" +
    "0dLz2oXengw/tZ+q3ZmOPeVmMuOMIYO/Cv1wk2U0OK4pug4OBSJPhl09Zs6IwB8N\n" +
    "wPOU7EDTgMOcQUYB/6QNCI1J7Zm2oLtuchzz4pIb+o4ZAhVprLhRyvqi8OTKQ7kf\n" +
    "Gfs5Tuwmn1M/0fQkfzMxADpjOKNgf0uy6lN6utjdTrPKKFUQNdc6/Ty8EeTnQEwU\n" +
    "lsT2LAXCfEKxTn5RlRljDztS7Sfgs8VL0FPy1Qi8B+dFcgRYKFrcpsVaZ1lBmXKs\n" +
    "XDRu5QR/Rg3f9DRq4GR1sNH8RLY9uApMl2SNz+sR4zRPG85R/se5Q06Gu0BUQ3UP\n" +
    "m67ETVZLAgMBAAECggEADjU54mYvHpICXHjc5+JiFqiH8NkUgOG8LL4kwt3DeBp9\n" +
    "bP0+5hSJH8vmzwJkeGG9L79EWG4b/bfxgYdeNX7cFFagmWPRFrlxbd64VRYFawZH\n" +
    "RJt+2cbzMVI6DL8EK4bu5Ux5qTiV44Jw19hoD9nDzCTfPzSTSGrKD3iLPdnREYaI\n" +
    "GDVxcjBv3Tx6rrv3Z2lhHHKhEHb0RRjATcjAVKV9NZhMajJ4l9pqJ3A4IQrCBl95\n" +
    "ux6Xm1oXP0i6aR78cjchsCpcMXdP3WMsvHgTlsZT0RZLFHrvkiNHlPiil4G2/eHk\n" +
    "wvT//CrcbO6SmI/zCtMmypuHJqcr+Xb7GPJoa64WoQKBgQDwrfelf3Rdfo9kaK/b\n" +
    "rBmbu1++qWpYVPTedQy84DK2p3GE7YfKyI+fhbnw5ol3W1jjfvZCmK/p6eZR4jgy\n" +
    "J0KJ76z53T8HoDTF+FTkR55oM3TEM46XzI36RppWP1vgcNHdz3U4DAqkMlAh4lVm\n" +
    "3GiKPGX5JHHe7tWz/uZ55Kk58QKBgQDtrkqdSzWlOjvYD4mq4m8jPgS7v3hiHd+1\n" +
    "OT8S37zdoT8VVzo2T4SF+fBhI2lWYzpQp2sCjLmCwK9k/Gur55H2kTBTwzlQ6WSL\n" +
    "Te9Zj+eoMGklIirA+8YdQHXrO+CCw9BTJAF+c3c3xeUOLXafzyW29bASGfUtA7Ax\n" +
    "QAsR+Rr3+wKBgAwfZxrh6ZWP+17+WuVArOWIMZFj7SRX2yGdWa/lxwgmNPSSFkXj\n" +
    "hkBttujoY8IsSrTivzqpgCrTCjPTpir4iURzWw4W08bpjd7u3C/HX7Y16Uq8ohEJ\n" +
    "T5lslveDJ3iNljSK74eMK7kLg7fBM7YDogxccHJ1IHsvInp3e1pmZxOxAoGAO+bS\n" +
    "TUQ4N/UuQezgkF3TDrnBraO67leDGwRbfiE/U0ghQvqh5DA0QSPVzlWDZc9KUitv\n" +
    "j8vxsR9o1PW9GS0an17GJEYuetLnkShKK3NWOhBBX6d1yP9rVdH6JhgIJEy/g0Su\n" +
    "z7TAFiFc8i7JF8u4QJ05C8bZAMhOLotqftQeVOMCgYAid8aaRvaM2Q8a42Jn6ZTT\n" +
    "5ms6AvNr98sv0StnfmNQ+EYXN0bEk2huSW+w2hN34TYYBTjViQmHbhudwwu8lVjE\n" +
    "ccDmIXsUFbHVK+kTIpWGGchy5cYPs3k9s1nMR2av0Lojtw9WRY76xRXvN8W6R7Eh\n" +
    "wA2ax3+gEEYpGhjM/lO2Lg==\n" +
    "-----END PRIVATE KEY-----\n";
// z4.pub.p8.pem (RSA 2048bit)
var z4PubPemP8 = "" +
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA33TqqLR3eeUmDtHS89qF\n" +
    "3p4MP7Wfqt2Zjj3lZjLjjCGDvwr9cJNlNDiuKboODgUiT4ZdPWbOiMAfDcDzlOxA\n" +
    "04DDnEFGAf+kDQiNSe2ZtqC7bnIc8+KSG/qOGQIVaay4Ucr6ovDkykO5Hxn7OU7s\n" +
    "Jp9TP9H0JH8zMQA6YzijYH9LsupTerrY3U6zyihVEDXXOv08vBHk50BMFJbE9iwF\n" +
    "wnxCsU5+UZUZYw87Uu0n4LPFS9BT8tUIvAfnRXIEWCha3KbFWmdZQZlyrFw0buUE\n" +
    "f0YN3/Q0auBkdbDR/ES2PbgKTJdkjc/rEeM0TxvOUf7HuUNOhrtAVEN1D5uuxE1W\n" +
    "SwIDAQAB\n" +
    "-----END PUBLIC KEY-----\n";
// _gitpg/jsrsasign/test/eckey/k1.prv.p8p.pem (ECC NIST P-256)
var k1PrvPemP8P = "" +
    "-----BEGIN PRIVATE KEY-----\n" +
    "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbVzfPnZPxfAyxqE\n" +
    "ZV05laAoJAl+/6Xt2O4mOB611sOhRANCAASgFTKjwJAAU95g++/vzKWHkzAVmNMI\n" +
    "tB5vTjZOOIwnEb70MsWZFIyUFD1P9Gwstz4+akHX7vI8BH6hHmBmfeQl\n" +
    "-----END PRIVATE KEY-----\n";
// _gitpg/jsrsasign/test/eckey/k1.pub.pem (ECC NIST P-256)
var k1PubPemP8 = "" +
    "-----BEGIN PUBLIC KEY-----\n" +
    "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoBUyo8CQAFPeYPvv78ylh5MwFZjT\n" +
    "CLQeb042TjiMJxG+9DLFmRSMlBQ9T/RsLLc+PmpB1+7yPAR+oR5gZn3kJQ==\n" +
    "-----END PUBLIC KEY-----\n";
// _gitpg/jsrsasign/test/eckey/k6.prv.p8p.pem (ECC NIST P-384)
var k6PrvPemP8P = "" +
    "-----BEGIN PRIVATE KEY-----\n" +
    "MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDAamStb0Xep3y3sWw2u\n" +
    "SSAdUPkgQ9Rvhlnx8XEVOYy2teh69T0on77ja02m03n8t8WhZANiAARUNSar38Rz\n" +
    "lKPyZFsNSGUanzpNRth0C+MikVEH8FAlDHMMpAs34dyF4IK0uxgbiEe9bQ+ieLrl\n" +
    "6xwFR0yaTivuwoyXC+ScGUnwnpaXmid6UUgw4ypbneHsaKuZ9JLdMAo=\n" +
    "-----END PRIVATE KEY-----\n";
// _gitpg/jsrsasign/test/eckey/k6.pub.p8.pem (ECC NIST P-384)
var k6PubPemP8 = "" +
    "-----BEGIN PUBLIC KEY-----\n" +
    "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEVDUmq9/Ec5Sj8mRbDUhlGp86TUbYdAvj\n" +
    "IpFRB/BQJQxzDKQLN+HcheCCtLsYG4hHvW0Poni65escBUdMmk4r7sKMlwvknBlJ\n" +
    "8J6Wl5onelFIMOMqW53h7GirmfSS3TAK\n" +
    "-----END PUBLIC KEY-----\n";

var hJWSHSPass = "616161";
var sJWSHS256 = 'eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.pLem30ReEpeXgMt6e3gjZ6QYSpLBbhd_NB-Afud1m4A';
var sJWSHS512 = 'eyJhbGciOiJIUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.8MblrpemJve17TRLftnvsvDk-Qxz-sWDgVkdURv6Mv9ZSnkKJ5aNfCOkRwD3bCf_nO_LruUlf7olMDKJFd4aCw';
var sJWSRS256 = 'eyJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.OoVNI-3eO1TKSjFBmYkHRx_fnKHwsl9or1396QtfdJM5cFAEP6ZVSzhHab5H6t24vmDzGEOlUj9aQPZFarvKCJfiBe2tLk5iWhkLmY9fmeMgMIgwbYTVkwm5HWDeYntMd8NR8r-nfM2PBYRrtwaNSj3bCqlqLUr7mNGh6t-nw_o';
var sJWSRS384 = 'eyJhbGciOiJSUzM4NCIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.UMDJVFxQ5KKeyCzp9BcSKav6pWCK8by4mLmwb7yJ2ZpUJyjS4IIwiDKbk_HGKZCB7NYOWCRznKr5Uq_-lxMb6nl25XOEZNz7PJsOhNA_dImPirWGpXUMcyXmPNsR2SmmSNwrFDNd0suOKQ1OqO80zA2m46HrBi2xLQgVB7EL8sU';
var sJWSRS512 = 'eyJhbGciOiJSUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.WbpWEI34EMx3yJLdCwkaXCBVtIuDZHCg-XkxTcHm_pX93ryJZxofUDpzLALx257DfD-g2KbSpQFxvJDFebgvqanRO3PxQdPgpXVW8MUD-BtFHLyROHOVOczf5OFRqCEKpvNnPMRuC00FT-08jMJZxQJWPd6Xtb1AnpXulM7MTmI';

describe("jws", () => {
    it("ALGORITHMS", () => {
        assert.deepEqual(jws.ALGORITHMS, [
            'HS256', 'HS384', 'HS512',
            'RS256', 'RS384', 'RS512',
            'ES256', 'ES384', 'ES512'
        ]);
    });

    describe("sign", () => {
        it("algorithm test: unknown algorithm", () => {
            assert.throws(() => {
                var sJWS = jws.sign("unknown", '{"cty":"JWT"}', '{"age": 21}');
            });
        });

        it("algorithm test: none specifyed in args", function () {
            var sJWS = jws.sign("none", {
                "cty": "JWT"
            }, {
                "age": 21
            });
            assert.equal(sJWS, 'eyJjdHkiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZ2UiOjIxfQ.');
        });

        it("algorithm test: none", function () {
            var sJWS = jws.sign(null, {
                "alg": "none",
                "cty": "JWT"
            }, {
                "age": 21
            });
            assert.equal(sJWS, 'eyJhbGciOiJub25lIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.');
        });

        it("algorithm test: HS256", function () {
            var sJWS = jws.sign(null, {
                "alg": "HS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, hJWSHSPass);
            assert.equal(sJWS, sJWSHS256);
        });

        it("algorithm test: HS512", function () {
            var sJWS = jws.sign(null, {
                "alg": "HS512",
                "cty": "JWT"
            }, {
                "age": 21
            }, hJWSHSPass);
            assert.equal(sJWS, sJWSHS512);
        });

        it("algorithm test: RS256", function () {
            var sJWS = jws.sign(null, {
                "alg": "RS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            assert.equal(sJWS, sJWSRS256);
        });

        it("algorithm test: RS384", function () {
            var sJWS = jws.sign(null, {
                "alg": "RS384",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            assert.equal(sJWS, sJWSRS384);
        });

        it("algorithm test: RS512", function () {
            var sJWS = jws.sign(null, {
                "alg": "RS512",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            assert.equal(sJWS, sJWSRS512);
        });

        it("sign test for algorithm ES256(NIST P-256 k1)", function () {
            var sJWS = jws.sign(null, {
                "alg": "ES256",
                "cty": "JWT"
            }, {
                "age": 21
            }, k1PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFUzI1NiIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm ES384(NIST P-384 k6)", function () {
            var sJWS = jws.sign(null, {
                "alg": "ES384",
                "cty": "JWT"
            }, {
                "age": 21
            }, k6PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFUzM4NCIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        xit("algorithm test: PS256", function () {
            var sJWS = jws.sign(null, {
                "alg": "PS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);

            console.log(sJWS);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJQUzI1NiIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2], 'YTCmApFpE7mH_SyiqhSRfUSj12E6JnWrhNon7q4iXQPcYNpReBuEiDJ1PYvxmYqrHaf4lFYNeiq5HkaoW2LSKRke168jBPfXIBBMzgV50prMb7b1h7Xz7lH6QeW9R_L-F00SS3tzHlRPu8ber0K2_1H8tiJ-TMJ9Qws0tAGSLCU');
        });

        xit("algorithm test: PS384", function () {
            var sJWS = jws.sign(null, {
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
            var sJWS = jws.sign(null, {
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

        it("verify test for algorithm HS512", function () {
            var result = jws.verify(sJWSHS512, hJWSHSPass);
            assert.equal(result, true);
        });

        it("verify test for algorithm RS256 z3", function () {
            var result = jws.verify(sJWSRS256, z3PubPemP8);
            assert.equal(result, true);
        });

        it("verify test for algorithm RS384 z3", function () {
            var result = jws.verify(sJWSRS384, z3PubPemP8);
            assert.equal(result, true);
        });

        it("verify test for algorithm RS512 z3", function () {
            var result = jws.verify(sJWSRS512, z3PubPemP8);
            assert.equal(result, true);
        });

        it("verify test for algorithm ES256(NIST P-256 k1)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.qVXC_4YMmTvrBDuOYbDzBFnhZynGMKIsMbzUGtCbUcTESk-szN170wRvnI1p2XPfK4Nmr9-Tv_DICzC24MPdrA', k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.llxxbdRworpUTi3WEFjpeagXN7nQNknQXzrdXWbRuFumT7eqWqn05Vux88ubYQ62nLfUOme5Ou0SGxJYd6MwYw', k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.5ChOZc5w9T0SSSQgUK806RA36YCZGvYnUwBlTXsjmzJvv8PJ3FuPvjno0W36q1NJOQe3oGEaRl9o-OGR-0h95A', k1PubPemP8), true);
        });

        it("verify test for algorithm ES384(NIST P-384 k6)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.ImFmrFvzlyl-BGHz8sdD6we6T1uCL5d6Q-oCWmDSh-q8eSL1bxPix7XZjxZGYJySw1On974Vw2NmzffgXvDPk7Ayvau0_fp0v4KUh4x6RcGKZDQgXVli1mfrGKTFP37C', k6PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.Ay21GOTDEXWXr2svATEXAmDBVOVX38G4vSf5HJ9Nfqn1IggP1EDQQU6sJYPunNGkW7dQOZ5fOsgU9WibnOCrz73D3NDNDW5lVtFDmSp3dPQz_pddyv_SzOgXh81tlx-o', k6PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.1z6jcEq6MZxqRSdzGW7scWe-un0IQsB87EsUPY5HipsOrlusPcTAKGkGAodrQEEVxfGca2OCssfKdTH_lTwscmfuUayZDK9XzohB7tf6E92RI4Faox0AcicG-WXAH4fS', k6PubPemP8), true);
        });

        xit("verify test for algorithm PS256 z3", function () {
            assert.equal(jws.verify('eyJhbGciOiJQUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.TGkI8x3Be2Z4Hu5c1hP75uMg0XDmDBrqb-pAbp0IbCYElPloOsGVaEqdPqsl8Ck2b3tmMrFtzcUTSYMWncpP4sBlFH5HCVEBo-8Qt23K53wNBM5d13vD0u-GPDUkdz1WbMrGfsOg64yiQrz1aIkLPaKvTN9lOni4hutNHBnIWZA', z3PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.cVJs2mltXOoWwm7nrlf8tdUQ6THB65BD4oVdxhPcvMVv8qZPG8EEjsRzaexevBt_U5yzidkjqcy4eK9A2vJpm1Nx1iMlHlvps1Qp28m9fQcfXDn0UUpMKRCtjeof4Q4y3Luse5tecHkfTClyCvenJ1cCmYsV8QhVATeLy3J4z5g', z3PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.kax6sH0vKJwRE6RJkEZeH0IEPsZ0_KU3QTNBNAeBm677I3OwiZqDb-ryVj442odoUywRiJlSexnz4MbPQ0vCOLT_KvfAVers0NFXJmM6E0vfFfw1Jgs5dNwedBo0BAqD-jL9qS21OBKDb7QCNHDGRiMR6KldGp9v312Vb7HO3GQ', z3PubPemP8), true);
        });

        xit("verify test for algorithm PS384 z3", function () {
            assert.equal(jws.verify('eyJhbGciOiJQUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.W7smmk62AVqQvkMUlOOFs251qGFZdq87CqWmExhl1JfKTjadUScrFZQ5_1oaAP234dq8sTG42Sdotvcb_tz15bfR4qHIcNzpHjO0QKNHLe3STLgBuwkFR4O4waaldqqRyqxFbS2zxW6QSbH2mayIm_3ipbL9Evbqm3aC0TcwvnQ', z3PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.BztDRoB11X7HgIpg_uRSMa0T8gkOgHFmlPo8FGkrmDTUnV9ZbO12L7bmOzrbeCbtWOYyVO8XKUfqo8gUATgr6g4IEnpG8HTPZRsouxGvr7YvLp-NHypwtXSxo4U8QCDs--fpOcmTnQpShKOd9EPwuTuoeLjGG6o6DOOu7SgK7EM', z3PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJQUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.c7MSE8a-P4OD9gfPEixnS5o1ZgN99yTrt_o2G3OINX47rFOYiVgvrDgrZZXzTFNSZTcuHn4GbU3lB9IWVZMZJl8SE7qdNlSanM9YmkSsYfn4bvGFLdS62yfQWdwM-zngVI2KU5azXXS3DWMjBWrI3hlqqCjdNMMhRWfmoUnzVmc', z3PubPemP8), true);
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
            assert.equal(msg, "algorithm 'HS256' not accepted in the list");
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
});

test.run(console.DEBUG);