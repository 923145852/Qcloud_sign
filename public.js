/**
 * 腾讯云API，生成签名插件
 */
const crypto = require('crypto');

class Public {

    static start({filed, host, url, type}){
        
        this.SecretId = 'AKIDz8krbsJ5yKBZQpn74WFkmLPx3gnPhESA';
        this.SecretKey = 'Gu5t9xGARNpq86cd98joQYCN3Cozk1qA';
        let filed_key = [];
        this.filed = '';
        url = url || '/v2/index.php';
        for(let key in filed){

            filed_key.push(key)
        };
        filed_key.sort();
        for (var i = 0; i < filed_key.length; i++) {
            this.filed += `${filed_key[i]}=${filed[filed_key[i]]}${(i==(filed_key.length - 1))?'':'&'}`;
        };
        console.log(this.filed)
        this.init_sign = `${type}${host}${url}?${this.filed}`;
        let code_sign = this.encode({
            key: this.SecretKey,
            text: this.init_sign,
        });
        code_sign = encodeURIComponent(code_sign);
        console.log(code_sign)
    };

    static encode({key, text}){

        var hmac = crypto.createHmac('sha256', key);
        hmac.update(text);
        let code_sign = hmac.digest('base64');
        console.log(code_sign)
        return code_sign;
    }
}
Public.start({
    filed: {
        "Action" : "DescribeInstances",
        "Nonce" : 11886,
        "Region" : "ap-guangzhou",
        "SecretId" : "AKIDz8krbsJ5yKBZQpn74WFkmLPx3gnPhESA",
        "SignatureMethod" : "HmacSHA256",
        "Timestamp" : 1465185768,
        "InstanceIds.0" : "ins-09dx96dg"
    },
    host: 'cvm.api.qcloud.com',
    type: 'GET'
})
// module.exports = new Public();