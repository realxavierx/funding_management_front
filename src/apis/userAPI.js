import request from '../utils/request';
import application from "@/views/user/Application";

export function getAllUsers() {
    return request({
        method: 'GET',
        url: '/user/getAllUsers'
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

export function applyFunding(fundName, applicant, group, money, category0, category1, summary, remarks) {
    return request({
        method: 'GET',
        url: '/apply/applyFunding',
        params: {
            fundName: fundName,
            applicant: applicant,
            group: group,
            money: money,
            first_category: category0,
            second_category: category1,
            abstracts: summary,
            remarks: remarks,
        }
    })
}



