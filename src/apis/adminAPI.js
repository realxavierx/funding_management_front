import request from '../utils/request';

export function getAllFundingInfo() {
    return request({
        method: 'GET',
        url: '/funding/getAllFundingInfo'
    })
}

export function getApplications(limit, offset) {
    return request({
        method: 'GET',
        url: '/apply/getApplications',
        params: {
            limit: limit,
            offset: offset
        }
    })
}

export function getTotalCount() {
    return request({
        method: 'GET',
        url: '/apply/getTotalCount'
    })
}
