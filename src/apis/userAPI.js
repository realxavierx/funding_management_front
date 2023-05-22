import request from '../utils/request';

export function getAllUsers() {
    return request({
        method: 'GET',
        url: '/user/getAllUsers'
    })
}

export function getUserById(sid) {
    return request({
        method: 'GET',
        url: '/user/getUserInfo',
        params: {
            userid: sid
        }
    })
}

export function getUserGroup(sid) {
    return request({
        method: 'GET',
        url: '/user/getGroupInfo',
        params: {
            userid: sid
        }
    })
}

export function addUserGroup(sid, group) {
    return request({
        method: 'GET',
        url: '/user/insertGroup',
        params: {
            group: group,
            userid: sid
        }
    })
}

export function updateAvatar(sid, avatar) {
    return request({
        method: 'POST',
        url: '/user/updateAvatar',
        data: {
            userid: sid,
            avatar: avatar
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

export function updateOnline(sid, online) {
    return request({
        method: 'GET',
        url: '/user/updateOnline',
        params: {
            userid: sid,
            online: online
        }
    })
}

export function getOnlineUsers() {
    return request({
        method: 'GET',
        url: '/user/getOnlineUsers',
    })
}

export function deleteUser(id) {
    return request({
        method: 'GET',
        url: '/user/delete',
        params: {
            id: id
        }
    })
}

export function blockUser(sid) {
    return request({
        method: 'GET',
        url: '/user/blockUser',
        params: {
            sid: sid
        }
    })
}

export function unblockUser(sid) {
    return request({
        method: 'GET',
        url: '/user/unBlockUser',
        params: {
            sid: sid
        }
    })
}

export function getAllUsersByGroup(group) {
    return request({
        method: 'GET',
        url: '/user/getAllUsersByGroup',
        params: {
            group: group
        }
    })
}

export function getAllResearchGroups() {
    return request({
        method: 'GET',
        url: '/groups/getAllResearchGroups'
    })
}

export function getAllExpenseCategories() {
    return request({
        method: 'GET',
        url: '/categories/getAllExpenseCategories'
    })
}

export function getFundingInfoByGroupAndFundingName(funding, group) {
    return request({
        method: 'GET',
        url: '/funding/getFundingInfoByGroupAndFundingName',
        params: {
            funding: funding,
            group: group
        }
    })
}

export function applyFunding(id, fundName, applicantID, group, money, category0, category1, summary, remarks,status) {
    return request({
        method: 'POST',
        url: '/apply/applyFunding',
        data: {
            id: id,
            fundName: fundName,
            applicant: applicantID,
            group: group,
            money: money,
            first_category: category0,
            second_category: category1,
            abstracts: summary,
            remarks: remarks,
            status:status,
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


export function applyFundingDraft(id, fundName, applicantID, group, money, category0, category1, summary, remarks) {
    return request({
        method: 'POST',
        url: '/apply/applyFundingDraft',
        data: {
            id: id,
            fundName: fundName,
            applicant: applicantID,
            group: group,
            money: money,
            first_category: category0,
            second_category: category1,
            abstracts: summary,
            remarks: remarks,
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

export function calculateExpenditureSummaryUser(group) {
    return request({
        method: 'GET',
        url: '/funding/calculateExpenditureSummaryUser',
        params: {
            group: group
        }
    })
}

export function notifyUser(id) {
    return request({
        method: 'GET',
        url: '/notification/user',
        params: {
            id: id
        }
    })
}


export function deleteAllNotificationOfUser(id) {
    return request({
        method: 'GET',
        url: '/notification/deleteAllNotificationOfUser',
        params: {
            id: id
        }
    })
}

export function getApplicationsByGroup(group, limit, offset, status) {
    return request({
        method: 'GET',
        url: '/apply/getApplicationsByGroup',
        params: {
            group: group,
            limit: limit,
            offset: offset,
            status: status
        }
    })
}

export function getApplicationCountByGroup(group, status) {
    return request({
        method: 'GET',
        url: '/apply/getApplicationCountByGroup',
        params: {
            group: group,
            status: status
        }
    })
}


export function deleteApplicationByID(id) {
    return request({
        method: 'GET',
        url: '/apply/deleteApplicationByID',
        params: {
            id: id
        }
    })
}

