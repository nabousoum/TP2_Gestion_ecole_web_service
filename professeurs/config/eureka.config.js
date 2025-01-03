const { Eureka } = require("eureka-js-client");

module.exports = new Eureka({
    instance: {
        app: 'PROFESSEURS',
        instanceId: 'professeurs:8084',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: 'http://localhost:8084/status',
        port: {
            '$': 8084,
            '@enabled': true,
        },
        vipAddress: '192.168.59.1',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
        maxRetries: 5,
        requestRetryDelay: 5000,
    },
});