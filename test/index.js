var jws = require('..');

var test = require('test');
test.setup();

// z1.prv.p5p.pem (RSA)
var z1PrvPemP5P = `
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAOhmTdK0BSkSFWjzs5vJemLnujwJur3E8NzY35DreQubtkWitw4x
EnR7TTxBtRQkiVEV/viPedQ+rlsaTjUY/VkCAwEAAQJAeLvFTGRnlemmI8sPkSx/
n2hhcRVg5Xut4h3tL32Vefhicvq55xqycoLCdgxATa5qyKOrhSz2vNVi+a/4JHom
TQIhAP6b1FCGazJVYU/el2p2rAsdWDDdpk9TWblG2FErwSOfAiEA6atoD18F27D0
MRsOb0No9IdKEjiXnYvGAMNcbyBwfAcCIQDVSctpjcF9T+MOWoTzrehgAzwe639n
0oZGXJ/YF9RbNwIgGEm0u0RJO5idCS2ixnXfRut5C4POXpXUsuebiAF7L6kCIH0m
GpYlbUmwIMsdWH7N4Sfgk6TSs0zb/xcfNBJbWFep
-----END RSA PRIVATE KEY-----`;
// z1.prv.p5e.pem (RSA)
var z1PrvPemP5E = `
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: DES-EDE3-CBC,4626F2E5853E783F

3vFpkrnbantC8RSzng2+jBw/VX95oi0VGKP0G8whENHUOVQXB/YOUSj+n80Y0Wwc
GpeQi8U0FQdWyYv8b9aioeFB06r9t9mJsYscJ/wcIvv5tTMkr89cwN3+4GQQuqNg
TmI9ekeoZ3NP26hTM4XTuFqHx4dzNNwjDLc8txc77WE/o4J4p8k9Py5yPZjs9EKy
wy/yxtqQYQuFj90OMEG1G89iHTZRcq4YTZYdqg6P/XEUvyjifN+7Nym8f2N9TDDn
RJtApPQlrgXvUDQKz6Lu1ZYMwe94E9YdutDGQMbxixbiyxlcxrkb/oEHH5WP5qPG
w/xzh08Ce2Ftba2Q860S8nznjyZFiv+lqSKBahbujgP/63ZL+JbAd4cYBqgm4g1C
YwMhHJbaVCzwYduxdyK2JBYEosDZiDfnOP4DqPhJYpg=
-----END RSA PRIVATE KEY-----`;
var z1PrvPemP5EPass = "hoge";
// z1.prv.p8e.pem (RSA)
var z1PrvPemP8E = `
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIBpjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIyScsGkpMl3kCAggA
MBQGCCqGSIb3DQMHBAiObBK7oyBAzwSCAWCkStExnU3pYBQAxRqDctg5QEO3Ic1d
GsRW+JW0kNonUydoOSD/7DBglnSDowiQ69HCW4OmumSJIU0hewX0yburFuy6Zs/q
DkWox7oxBCsgFmfmkKGcK0USeJ+LX+YZVbvCCvHZkd99pEqQSfkRu4DgXbWmo6Zv
2A6VFyBhE9MFmYex8mHTZ5cchBzAiFWRzjpRX94F4vbUFoXPGrEbOLovM2VpZ8Df
1nLuXhWYVHsXHWn+fm7TH4Xzh1mFYYkTiXL9ABwKKohEL2SQJzKpa9FZvOZAmlSe
UgQxVQLM/ZC+o4Vs4JHqIu4Ek2bgjEqDzo2EPznpcCsQTcwOqhPwNjP4Y3ovn1Nm
8i0Hx51OA0vjRZBvvduKM9d5kRAOg8jqLjeWU3KraWLuSJ96RTzlWFgw6PsML+RE
LHfdKDjRT0NMEMRh892oBi828asvvSWO6HYcM0xclt0uakxJhVP/mtzA
-----END ENCRYPTED PRIVATE KEY-----`;
var z1PrvPemP8EPass = "passwd";
var z1PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOhmTdK0BSkSFWjzs5vJemLnujwJur3E
8NzY35DreQubtkWitw4xEnR7TTxBtRQkiVEV/viPedQ+rlsaTjUY/VkCAwEAAQ==
-----END PUBLIC KEY-----`;
var z1CertPEM = `
-----BEGIN CERTIFICATE-----
MIIBdTCCAR+gAwIBAgIBBTANBgkqhkiG9w0BAQUFADAaMQswCQYDVQQGEwJVUzEL
MAkGA1UECgwCYTEwHhcNMTMwNTA0MDM0MTQxWhcNMjMwNTA0MDM0MTQxWjAaMQsw
CQYDVQQGEwJVUzELMAkGA1UECgwCYTEwXDANBgkqhkiG9w0BAQEFAANLADBIAkEA
6GZN0rQFKRIVaPOzm8l6Yue6PAm6vcTw3NjfkOt5C5u2RaK3DjESdHtNPEG1FCSJ
URX++I951D6uWxpONRj9WQIDAQABo1AwTjAdBgNVHQ4EFgQUxUc+4gDI561wA9/1
QguM3fTCDhUwHwYDVR0jBBgwFoAUxUc+4gDI561wA9/1QguM3fTCDhUwDAYDVR0T
BAUwAwEB/zANBgkqhkiG9w0BAQUFAANBALL2k69LjwOYfDXv3TXJUAFGUqto+Noj
CJLP08fOfNBZy+KAIy0GsrNU/3uRViqbuGqAnH9kFFwHQjOAFrAe8XQ=
-----END CERTIFICATE-----`;
// z3.prv.p8p.pem (RSA)
var z3PrvPemP8P = `
-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALDikFExZMEW5bws
j9DckEA+Ai7jYe7+In5UHpsqCaqXlPlJQFpziDWDHp1IlWI6r+nZ/7AJhS3y6wbV
rF8IN4ohKaga1LIL3RDfnGbm4QcF06rrE0vHkMALUu0o/7zmR0qUgeNnRhd21J/+
5vt9nzbaigklghW3DKYCaZN/n3CbAgMBAAECgYEAq1zjGXWzuYi4SkQVk++KZGJu
dQRehU15F0/hUss4ECfH8HXxvW893zHG//MoncBjWjeTCPVAK9KxtK5ezrZELpXb
Q82HCR2yhf0Wjt4dMVPwyXs6AFfjv5fPYrwODQIOAccXuf8CirfHQlJu9WZCJH6X
mbOgYSxgzlWUn00vlTkCQQDeStbmlwK4SeSA6yKhCk2Oab3qojtP/FPPiNrMqVnH
IDDH9A0LAfUUvTsZL6PvLCsmkr2ubBn4EZUYX5qaIJkdAkEAy7UO9s4UJC3s4vVL
wOzqSkxq287x1wfRkLJbYCkkouV93MoGDoq2dJ1jLD99Ts0QB8zkcu/Bk4whAS/u
PIg7FwJBALDvtxCCINsZjfWDs+OlNMhnqJCLo1RuTzPBBg+juN9D4zA1NPCPFUn1
uYW5ou4sJQimAq9EQoNvU1K8Pm3yBo0CQQCaQfWe99dQvmZQR6ih48ZXlR6mbUO9
rfIIPMftPbq8kESLWYDUqj4YeMaMz1c4wRiOj52/W8eez9J+b6lctVzpAkAUWYjg
GoRPQcbtp1pc2qb4wIMG9+D/VevHkHH7x/RAIgNkK3+Y0XiAa2hAZvveUYua05Yy
akHe+tn1GooNC2SE
-----END PRIVATE KEY-----`;
var z3PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw4pBRMWTBFuW8LI/Q3JBAPgIu
42Hu/iJ+VB6bKgmql5T5SUBac4g1gx6dSJViOq/p2f+wCYUt8usG1axfCDeKISmo
GtSyC90Q35xm5uEHBdOq6xNLx5DAC1LtKP+85kdKlIHjZ0YXdtSf/ub7fZ822ooJ
JYIVtwymAmmTf59wmwIDAQAB
-----END PUBLIC KEY-----`;
// z4.prv.p8p.pem (RSA 2048bit)
var z4PrvPemP8P = `
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfdOqotHd55SYO
0dLz2oXengw/tZ+q3ZmOPeVmMuOMIYO/Cv1wk2U0OK4pug4OBSJPhl09Zs6IwB8N
wPOU7EDTgMOcQUYB/6QNCI1J7Zm2oLtuchzz4pIb+o4ZAhVprLhRyvqi8OTKQ7kf
Gfs5Tuwmn1M/0fQkfzMxADpjOKNgf0uy6lN6utjdTrPKKFUQNdc6/Ty8EeTnQEwU
lsT2LAXCfEKxTn5RlRljDztS7Sfgs8VL0FPy1Qi8B+dFcgRYKFrcpsVaZ1lBmXKs
XDRu5QR/Rg3f9DRq4GR1sNH8RLY9uApMl2SNz+sR4zRPG85R/se5Q06Gu0BUQ3UP
m67ETVZLAgMBAAECggEADjU54mYvHpICXHjc5+JiFqiH8NkUgOG8LL4kwt3DeBp9
bP0+5hSJH8vmzwJkeGG9L79EWG4b/bfxgYdeNX7cFFagmWPRFrlxbd64VRYFawZH
RJt+2cbzMVI6DL8EK4bu5Ux5qTiV44Jw19hoD9nDzCTfPzSTSGrKD3iLPdnREYaI
GDVxcjBv3Tx6rrv3Z2lhHHKhEHb0RRjATcjAVKV9NZhMajJ4l9pqJ3A4IQrCBl95
ux6Xm1oXP0i6aR78cjchsCpcMXdP3WMsvHgTlsZT0RZLFHrvkiNHlPiil4G2/eHk
wvT//CrcbO6SmI/zCtMmypuHJqcr+Xb7GPJoa64WoQKBgQDwrfelf3Rdfo9kaK/b
rBmbu1++qWpYVPTedQy84DK2p3GE7YfKyI+fhbnw5ol3W1jjfvZCmK/p6eZR4jgy
J0KJ76z53T8HoDTF+FTkR55oM3TEM46XzI36RppWP1vgcNHdz3U4DAqkMlAh4lVm
3GiKPGX5JHHe7tWz/uZ55Kk58QKBgQDtrkqdSzWlOjvYD4mq4m8jPgS7v3hiHd+1
OT8S37zdoT8VVzo2T4SF+fBhI2lWYzpQp2sCjLmCwK9k/Gur55H2kTBTwzlQ6WSL
Te9Zj+eoMGklIirA+8YdQHXrO+CCw9BTJAF+c3c3xeUOLXafzyW29bASGfUtA7Ax
QAsR+Rr3+wKBgAwfZxrh6ZWP+17+WuVArOWIMZFj7SRX2yGdWa/lxwgmNPSSFkXj
hkBttujoY8IsSrTivzqpgCrTCjPTpir4iURzWw4W08bpjd7u3C/HX7Y16Uq8ohEJ
T5lslveDJ3iNljSK74eMK7kLg7fBM7YDogxccHJ1IHsvInp3e1pmZxOxAoGAO+bS
TUQ4N/UuQezgkF3TDrnBraO67leDGwRbfiE/U0ghQvqh5DA0QSPVzlWDZc9KUitv
j8vxsR9o1PW9GS0an17GJEYuetLnkShKK3NWOhBBX6d1yP9rVdH6JhgIJEy/g0Su
z7TAFiFc8i7JF8u4QJ05C8bZAMhOLotqftQeVOMCgYAid8aaRvaM2Q8a42Jn6ZTT
5ms6AvNr98sv0StnfmNQ+EYXN0bEk2huSW+w2hN34TYYBTjViQmHbhudwwu8lVjE
ccDmIXsUFbHVK+kTIpWGGchy5cYPs3k9s1nMR2av0Lojtw9WRY76xRXvN8W6R7Eh
wA2ax3+gEEYpGhjM/lO2Lg==
-----END PRIVATE KEY-----`;
// z4.pub.p8.pem (RSA 2048bit)
var z4PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA33TqqLR3eeUmDtHS89qF
3p4MP7Wfqt2Zjj3lZjLjjCGDvwr9cJNlNDiuKboODgUiT4ZdPWbOiMAfDcDzlOxA
04DDnEFGAf+kDQiNSe2ZtqC7bnIc8+KSG/qOGQIVaay4Ucr6ovDkykO5Hxn7OU7s
Jp9TP9H0JH8zMQA6YzijYH9LsupTerrY3U6zyihVEDXXOv08vBHk50BMFJbE9iwF
wnxCsU5+UZUZYw87Uu0n4LPFS9BT8tUIvAfnRXIEWCha3KbFWmdZQZlyrFw0buUE
f0YN3/Q0auBkdbDR/ES2PbgKTJdkjc/rEeM0TxvOUf7HuUNOhrtAVEN1D5uuxE1W
SwIDAQAB
-----END PUBLIC KEY-----`;
// _gitpg/jsrsasign/test/eckey/k1.prv.p8p.pem (ECC NIST P-256)
var k1PrvPemP8P = `
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbVzfPnZPxfAyxqE
ZV05laAoJAl+/6Xt2O4mOB611sOhRANCAASgFTKjwJAAU95g++/vzKWHkzAVmNMI
tB5vTjZOOIwnEb70MsWZFIyUFD1P9Gwstz4+akHX7vI8BH6hHmBmfeQl
-----END PRIVATE KEY-----`;
// _gitpg/jsrsasign/test/eckey/k1.pub.pem (ECC NIST P-256)
var k1PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEoBUyo8CQAFPeYPvv78ylh5MwFZjT
CLQeb042TjiMJxG+9DLFmRSMlBQ9T/RsLLc+PmpB1+7yPAR+oR5gZn3kJQ==
-----END PUBLIC KEY-----`;
// _gitpg/jsrsasign/test/eckey/k6.prv.p8p.pem (ECC NIST P-384)
var k6PrvPemP8P = `
-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDAamStb0Xep3y3sWw2u
SSAdUPkgQ9Rvhlnx8XEVOYy2teh69T0on77ja02m03n8t8WhZANiAARUNSar38Rz
lKPyZFsNSGUanzpNRth0C+MikVEH8FAlDHMMpAs34dyF4IK0uxgbiEe9bQ+ieLrl
6xwFR0yaTivuwoyXC+ScGUnwnpaXmid6UUgw4ypbneHsaKuZ9JLdMAo=
-----END PRIVATE KEY-----`;
// _gitpg/jsrsasign/test/eckey/k6.pub.p8.pem (ECC NIST P-384)
var k6PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEVDUmq9/Ec5Sj8mRbDUhlGp86TUbYdAvj
IpFRB/BQJQxzDKQLN+HcheCCtLsYG4hHvW0Poni65escBUdMmk4r7sKMlwvknBlJ
8J6Wl5onelFIMOMqW53h7GirmfSS3TAK
-----END PUBLIC KEY-----`;

// (ECC NIST P-521)
var k5PrvPemP8P = `
-----BEGIN PRIVATE KEY-----
MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBRNEQ8Y1gwDMH8pne
z9uq4ODLE/KTx7eCzMNKlGRIhx/8Mo2+B9ORKPMFk4on0wFW7T+rp7NpXm1wxTOY
HSTf7mWhgYkDgYYABADSmlI0TDURn/W+oZrgkPgC0F/56jGtzDFSTQEodep5E0Sw
KvBrWN48PSbxukE9JdXPm2soe1yc9BC/Km6nrQJhnQDeIhUCoVSA8GTZ0EwL1AcT
5YfKcvwwCdM4lHRU1jYXti4IpC/pggFT3N+IRFmS6M8gTYzvxCZMDUnYHimDB+1p
jw==
-----END PRIVATE KEY-----`;

// (ECC NIST P-521)
var k5PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQA0ppSNEw1EZ/1vqGa4JD4AtBf+eox
rcwxUk0BKHXqeRNEsCrwa1jePD0m8bpBPSXVz5trKHtcnPQQvypup60CYZ0A3iIV
AqFUgPBk2dBMC9QHE+WHynL8MAnTOJR0VNY2F7YuCKQv6YIBU9zfiERZkujPIE2M
78QmTA1J2B4pgwftaY8=
-----END PUBLIC KEY-----`;

var secp256k1PrvPemP8P = `
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIKiy2VesuKrIF99w6KYA8kV4wZ1ScFXkbQpf8IzfC4hZoAcGBSuBBAAK
oUQDQgAE2Fqc5YCa++3gap6JkRP2tmEMQyb55sgxZqPAD78XUgu5rW6iVDRxB3Vz
NgfL27rhLROzfytvEBZ5dV/vq9uHBA==
-----END EC PRIVATE KEY-----`;
var secp256k1PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE2Fqc5YCa++3gap6JkRP2tmEMQyb55sgx
ZqPAD78XUgu5rW6iVDRxB3VzNgfL27rhLROzfytvEBZ5dV/vq9uHBA==
-----END PUBLIC KEY-----`;

var sm2PrvPemP8P = `
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEILLEx8bur4Goiqx9wjvaqaXMDOG4DFu7dZMOilG20xF9oAoGCCqBHM9V
AYItoUQDQgAEwfulw1wMxo7b+3HrGlEvfyaUkjy/qHgclV503uiei42yv2o3HcEU
+5+rL3os/o5ZiO5/IYdH6aR3AVJTVGSUiA==
-----END EC PRIVATE KEY-----`;

var sm2PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoEcz1UBgi0DQgAEwfulw1wMxo7b+3HrGlEvfyaUkjy/
qHgclV503uiei42yv2o3HcEU+5+rL3os/o5ZiO5/IYdH6aR3AVJTVGSUiA==
-----END PUBLIC KEY-----`;

var ed25519PrvPemP8P = `
-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIJ1hsZ3v/VpguoRK9JLsLMREScVpezJpGXA7rAMcrn9g
-----END PRIVATE KEY-----`;

var ed25519PubPemP8 = `
-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA11qYAYKxCrfVS/7TyWQHOg7hcvPapiMlrwIaaPcHURo=
-----END PUBLIC KEY-----`;

var hJWSHSPass = "616161";
var sJWSHS256 = 'eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.pLem30ReEpeXgMt6e3gjZ6QYSpLBbhd_NB-Afud1m4A';
var sJWSHS512 = 'eyJhbGciOiJIUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.8MblrpemJve17TRLftnvsvDk-Qxz-sWDgVkdURv6Mv9ZSnkKJ5aNfCOkRwD3bCf_nO_LruUlf7olMDKJFd4aCw';
var sJWSRS256 = 'eyJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.OoVNI-3eO1TKSjFBmYkHRx_fnKHwsl9or1396QtfdJM5cFAEP6ZVSzhHab5H6t24vmDzGEOlUj9aQPZFarvKCJfiBe2tLk5iWhkLmY9fmeMgMIgwbYTVkwm5HWDeYntMd8NR8r-nfM2PBYRrtwaNSj3bCqlqLUr7mNGh6t-nw_o';
var sJWSRS384 = 'eyJhbGciOiJSUzM4NCIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.UMDJVFxQ5KKeyCzp9BcSKav6pWCK8by4mLmwb7yJ2ZpUJyjS4IIwiDKbk_HGKZCB7NYOWCRznKr5Uq_-lxMb6nl25XOEZNz7PJsOhNA_dImPirWGpXUMcyXmPNsR2SmmSNwrFDNd0suOKQ1OqO80zA2m46HrBi2xLQgVB7EL8sU';
var sJWSRS512 = 'eyJhbGciOiJSUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.WbpWEI34EMx3yJLdCwkaXCBVtIuDZHCg-XkxTcHm_pX93ryJZxofUDpzLALx257DfD-g2KbSpQFxvJDFebgvqanRO3PxQdPgpXVW8MUD-BtFHLyROHOVOczf5OFRqCEKpvNnPMRuC00FT-08jMJZxQJWPd6Xtb1AnpXulM7MTmI';

describe("jws", () => {
    it("ALGORITHMS", () => {
        assert.deepEqual(jws.ALGORITHMS, [
            'HS256', 'HS384', 'HS512', 'HSM3',
            'RS256', 'RS384', 'RS512',
            'ES256', 'ES256K', 'ES384', 'ES512', 'SM2SM3',
            'S256', 'S256K', 'S384', 'S512', 'SSM2',
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
            assert.equal(sJWS, 'eyJjdHkiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZ2UiOjIxfQ.');
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
            assert.equal(sJWS, sJWSHS256);
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
            assert.equal(sJWS, 'eyJhbGciOiJIU00zIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.QU2MA3Eo4CT7Oybsj8TQ1NOLwhu7gck792Yr990wRh8');
        });

        it("algorithm test: RS256", function () {
            var sJWS = jws.sign({
                "alg": "RS256",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            assert.equal(sJWS, sJWSRS256);
        });

        it("algorithm test: RS384", function () {
            var sJWS = jws.sign({
                "alg": "RS384",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            assert.equal(sJWS, sJWSRS384);
        });

        it("algorithm test: RS512", function () {
            var sJWS = jws.sign({
                "alg": "RS512",
                "cty": "JWT"
            }, {
                "age": 21
            }, z3PrvPemP8P);
            assert.equal(sJWS, sJWSRS512);
        });

        it("sign test for algorithm ES256(NIST P-256)", function () {
            var sJWS = jws.sign({
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

        it("sign test for algorithm ES256K(secp256k1)", function () {
            var sJWS = jws.sign({
                "alg": "ES256K",
                "cty": "JWT"
            }, {
                "age": 21
            }, secp256k1PrvPemP8P);
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
            }, k6PrvPemP8P);
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
            }, k5PrvPemP8P);
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
            }, sm2PrvPemP8P);
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
            }, ed25519PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJFZERTQSIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2], 'FZRETpvInH3tv8gNnTwuPIfguG7ZWxG1ep_q9b3EhA2KxCnLVHC21F0h2MzOsHMq9ynoDF7yfTV34Z2K_-IbBQ');
        });


        it("sign test for algorithm S256(NIST P-256)", function () {
            var sJWS = jws.sign({
                "alg": "S256",
                "cty": "JWT"
            }, {
                "age": 21
            }, k1PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJTMjU2IiwiY3R5IjoiSldUIn0');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm S256K(secp256k1)", function () {
            var sJWS = jws.sign({
                "alg": "S256K",
                "cty": "JWT"
            }, {
                "age": 21
            }, secp256k1PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJTMjU2SyIsImN0eSI6IkpXVCJ9');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm S384(NIST P-384)", function () {
            var sJWS = jws.sign({
                "alg": "S384",
                "cty": "JWT"
            }, {
                "age": 21
            }, k6PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJTMzg0IiwiY3R5IjoiSldUIn0');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm S512(NIST P-521)", function () {
            var sJWS = jws.sign({
                "alg": "S512",
                "cty": "JWT"
            }, {
                "age": 21
            }, k5PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJTNTEyIiwiY3R5IjoiSldUIn0');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
        });

        it("sign test for algorithm SSM2", function () {
            var sJWS = jws.sign({
                "alg": "SSM2",
                "cty": "JWT"
            }, {
                "age": 21
            }, sm2PrvPemP8P);
            var a = sJWS.split(".");

            assert.equal(a[0], 'eyJhbGciOiJTU00yIiwiY3R5IjoiSldUIn0');
            assert.equal(a[1], 'eyJhZ2UiOjIxfQ');
            assert.equal(a[2] != '', true);
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
            var result = jws.verify(sJWSHS256, new Buffer(hJWSHSPass, 'hex'));
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

        it("verify test for algorithm ES256(NIST P-256)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.qVXC_4YMmTvrBDuOYbDzBFnhZynGMKIsMbzUGtCbUcTESk-szN170wRvnI1p2XPfK4Nmr9-Tv_DICzC24MPdrA', k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.llxxbdRworpUTi3WEFjpeagXN7nQNknQXzrdXWbRuFumT7eqWqn05Vux88ubYQ62nLfUOme5Ou0SGxJYd6MwYw', k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NiIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.5ChOZc5w9T0SSSQgUK806RA36YCZGvYnUwBlTXsjmzJvv8PJ3FuPvjno0W36q1NJOQe3oGEaRl9o-OGR-0h95A', k1PubPemP8), true);
        });

        it("verify test for algorithm ES256K(secp256k1)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.h9IFSFKCz-bHAcY3SdFsrftRuMklKQcAWqhgSh2LYzVjnc0DKPxfAN2AOwJaMglUnRmC7RTyvOMX_dYS0t0AGA', secp256k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.9OEgxU240zu8MzyPTnkEThfVtSHsTZ-VokzRiD29R4QBy6_Kqdv6iLJt1tzdZFmO_5ErW5r7Hor07dTtaFBJ5Q', secp256k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzI1NksiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.jF2pBcWAXUUNKFJy4xuSMYhnQJ7f-j1TCUepZV9pBNMxRNN2YNKw_ek2Ef2NJ2-qV-xTQroYOm9I2lLS9iclSQ', secp256k1PubPemP8), true);
        });

        it("verify test for algorithm ES384(NIST P-384)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.ImFmrFvzlyl-BGHz8sdD6we6T1uCL5d6Q-oCWmDSh-q8eSL1bxPix7XZjxZGYJySw1On974Vw2NmzffgXvDPk7Ayvau0_fp0v4KUh4x6RcGKZDQgXVli1mfrGKTFP37C', k6PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.Ay21GOTDEXWXr2svATEXAmDBVOVX38G4vSf5HJ9Nfqn1IggP1EDQQU6sJYPunNGkW7dQOZ5fOsgU9WibnOCrz73D3NDNDW5lVtFDmSp3dPQz_pddyv_SzOgXh81tlx-o', k6PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzM4NCIsICJjdHkiOiJKV1QifQ.eyJhZ2UiOiAyMX0.1z6jcEq6MZxqRSdzGW7scWe-un0IQsB87EsUPY5HipsOrlusPcTAKGkGAodrQEEVxfGca2OCssfKdTH_lTwscmfuUayZDK9XzohB7tf6E92RI4Faox0AcicG-WXAH4fS', k6PubPemP8), true);
        });

        it("verify test for algorithm ES512(NIST P-521)", function () {
            assert.equal(jws.verify('eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.AKuic_wYsBge_1jHDce_ZlnIi1rMZTjAJn9RJ8zC06_D5GiIYoLeiEjc5RYq0w73ybamKb8ar1WWWhVNZ-peKF8EAbXyt5JhGv-_0xAs17F2cMTudAYzC451Vxh3j-pfh5OI6YDA--qfQvnl-A9ZXUZ0ebijENvhhsYeGcbqmrq8enOY', k5PrvPemP8P), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.AMOaPI3_sbf2kponSVi9cIKHsdR6HY7sz3vQI_Ai5MJQdgRKNCQO3t2KEPEYoFeVRdPz2kQNDRJJyV0PGqNIBdBJAcM-66iYovY7xorJYKNc0J7h5tWiLNglwyCyRYWy5tTwjBcmeyJEC64pmj4aJQIZRafvL-sbSCYgEprGcvZ_9uCh', k5PrvPemP8P), true);
            assert.equal(jws.verify('eyJhbGciOiJFUzUxMiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.ABGEdHY9oLylILuCgVUlc4Ikx-Yrs2ZFd9BZkH105OgR2kUWYwyjpgyskxb5DBQDBiLQGLoTFLoWd6Jp3PoTVEhlAMhgBQygxSb0U2K2hcSQ_ffBtQ42Ao3o8Oe5OVCxh78zB9dXUBN4YhIGxBuln5vZhwyn_2bVIzyEdEae5vfnBHNu', k5PrvPemP8P), true);
        });

        it("verify test for algorithm SM2SM3", function () {
            assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.AzJ4KaYFfDnJqmzhdgVomSrP8SKjV2222ARJpSpE2dkHSPD_GcLf3CXjhIfCvwAvgP1Al8z8P6eJ_UkGvlnxLA', sm2PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.5Tvn62blLvNX7yUzCXDJg8gXR4CBLvVNVnG3PfLX4zP0g2YwB-5r6k-lp4Ub4aSFMZm9xDTyIOQCPCiQH99LSg', sm2PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTTTJTTTMiLCJjdHkiOiJKV1QifQ.eyJhZ2UiOjIxfQ.G1A-6xxdYPTKKk5fcpUGrmnPDqpXuPZ438I8Mx7tafGDXVYsmomd0i9EN-6blH0OpHOmBrch_OnS-uFUlw_OOw', sm2PubPemP8), true);
        });

        it("verify test for algorithm EdDSA", function () {
            assert.equal(jws.verify('eyJhbGciOiJFZERTQSIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.FZRETpvInH3tv8gNnTwuPIfguG7ZWxG1ep_q9b3EhA2KxCnLVHC21F0h2MzOsHMq9ynoDF7yfTV34Z2K_-IbBQ', ed25519PubPemP8), true);
        });

        it("verify test for algorithm S256(NIST P-256)", function () {
            assert.equal(jws.verify('eyJhbGciOiJTMjU2IiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.xy-89LtiwJjlxa7dKHQHqLBwdo20UXpdbqVpVOAKEwYYOCadqRMCX2nDUzvof_UITNMIYVMjzPnF_2o_qYMFJw', k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTMjU2IiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.MbcGx7TKqTzgdmMaCWYHuCsRQBWczxiPgFIMyzFh16SJSaJdIkJkoSzMbkXHO95dKRv4el_un6Im3l_4yyY3iA', k1PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTMjU2IiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.-CEXg8dLvp-RjxyjdV-_XlybLT_KLxgaujhpaBwvfoOl36BapBmFxI8_64kO9mSsDLQRKFwb8Tv4ZYylWCd00g', k1PubPemP8), true);
        });

        it("verify test for algorithm S256K(secp256k1)", function () {
            assert.equal(jws.verify('eyJhbGciOiJTMjU2SyIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.gSbJdtbgCCq7TRBr3axbOWqCyLjOw9ezfXEGaeJeYlRWzFqT1a8NgR7W4P_mCQkJaqg4kTu8GnMcYReFzMxdRw', secp256k1PubPemP8), true);
        });

        it("verify test for algorithm S384(NIST P-384)", function () {
            assert.equal(jws.verify('eyJhbGciOiJTMzg0IiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.5WWfXrDg5lxODKGGyxcMwGjJzXfnVHTqYkSeFHziX75hJhz0m72m3QoB3H_RoLpOvJ5Ngqc9E5UgqWPZxOMu2_4NVh24MBK0GG5iMWXFRpUjOT1FuIBHkyh2xZvqAtzz', k6PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTMzg0IiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.NrYzmL9FGZLq7hV9i2NBP9Vgs4Np_VPfUxX_49IiV4sxtjMPPdLs-kAfDwAzHjuTgURSlVxFqk7fDSLhY-L2P51ZKd91o2Fo3am1ojbth8oC2lCAZTcDlvFQl_34GoD_', k6PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTMzg0IiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.qY8PCgD9Tl5feYs5C1yIh6X_gSqGWyGru-9BJKUE-ffQilYRTX6pOc0WSOHkx4d7UpbvYov7wyCWApH9T3waVLCsznjyKxWE5oDrl1uMQOu_Pi5NCJh827Z4-wX7Dccf', k6PubPemP8), true);
        });

        it("verify test for algorithm S512(NIST P-521)", function () {
            assert.equal(jws.verify('eyJhbGciOiJTNTEyIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.AAD823SmPjhwe95m63ko8i2lrjhXaNCFiEGMew5KGDIOyPY9whyrI5FRyTMFABqu_nPLuC9HKJXdvRDPg-xpauvqAWmb12tUopDuY3U0c_w5OqT_5kH7cSbTzeW1lY2leOzJ7l37xyGrm3-9mWSoUX-H6qNXjQmexDeIQAeXYBsRzlwT', k5PrvPemP8P), true);
            assert.equal(jws.verify('eyJhbGciOiJTNTEyIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.AADir4Nc06Pp6sNvp0Bd94r0zGakR3BSy_yg9K90_o3FKJf5cD6AR-LtapqMTxkSQt38I4vzTZXu4RtWOF44nO0MABM_Qt7xFcuEfZ-ORluXV228-8wu_jfMICIrre710-kadiYX7KFx4QC9pHHGF6mGQDrzmh43dgPuRb_OGSaALjh-', k5PrvPemP8P), true);
            assert.equal(jws.verify('eyJhbGciOiJTNTEyIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.AABJPULf5yXvPG1bSoKoBHmxn9Ea2sYuEc4SQ8lW8dHNiXDEuKpjZasq55NpR2q0bRQkb9yaVliDY2xJPp7pgngOAJg8ZJzIrFQXjVppvRd52N3vzuPABp_ftoPiqIQamXZD5UBl--jr2yRWxG8_DhBEUYxlAs_s4geqmPPnu_qCWMJN', k5PrvPemP8P), true);
        });

        it("verify test for algorithm SSM2", function () {
            assert.equal(jws.verify('eyJhbGciOiJTU00yIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.pkzXL51a1ViTAZxXsj0yS7MECszvk7PbeDsWSxv1cZmgMPm2q0pIdOLRDbiOazOX73YTtx8YXfnkJ_9iu7Xwxg', sm2PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTU00yIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.F-80GQHfytIIZm6T1DvylqCi8p_NC2MRc9_71tpiJgLKaKxEyxK6dqdv3o8WSiwef0U-8d6sGrIsFxDFOsvW1A', sm2PubPemP8), true);
            assert.equal(jws.verify('eyJhbGciOiJTU00yIiwiY3R5IjoiSldUIn0.eyJhZ2UiOjIxfQ.Sza0eEZJKz5Hb0Dn-aE7EYG1fheMV92mTfvlQLaE9tUVOqdoYXbmLSxI3bOuU_52k4SkoRxu7-oyJDetJ2yrEg', sm2PubPemP8), true);
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