import request from '../utils/request';

export function getAllFundingInfo() {
    return request({
        method: 'GET',
        url: '/funding/getAllFundingInfo'
    })
}

export function queryFundingInfo(group) {
    return request({
        method: 'GET',
        url: '/funding/queryFundingInfo',
        params: {
            group: group
        }
    })
}

export function getApplications(limit, offset, status) {
    return request({
        method: 'GET',
        url: '/apply/getApplications',
        params: {
            limit: limit,
            offset: offset,
            status: status
        }
    })
}

export function getTotalCount(status) {
    return request({
        method: 'GET',
        url: '/apply/getTotalCount',
        params: {
            status: status
        }
    })
}

export function calculateFundingSum() {
    return request({
        method: 'GET',
        url: '/funding/multiTotalTable'
    })
}

export function calculateExpenditureSummary() {
    return request({
        method: 'GET',
        url: '/funding/calculateExpenditureSummary'
    })
}

export function multiDetailTable() {
    return request({
        method: 'GET',
        url: '/funding/multiDetailTable'
    })
}


export function oneGroupMultiDetailTable(group_name) {
    return request({
        method: 'GET',
        url: '/funding//oneGroupMultiDetailTable',
        params: {
            group_name: group_name
        }
    })
}

export function approvalApplication(id, result, comment) {
    return request({
        method: 'POST',
        url: '/apply/approvalApplication',
        data: {
            id: id,
            result: result,
            comment: comment
        },
        transformRequest: [function (data) {
            let str = '';
            for (let key in data) {
                str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
            }
            return str;
        }]
    })
}


export function updateExecutionRate(code, rate) {
    return request({
        method: 'GET',
        url: '/funding/updateExecutionRate',
        params: {
            code: code,
            rate: rate
        }
    })
}

export function updateTotalMoneyByExecutionRate() {
    return request({
        method: 'GET',
        url: '/funding/updateTotalMoneyByExecutionRate',
    })
}
