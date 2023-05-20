import request from '../utils/request';

export function login(id, password) {
    return request({
        method: 'POST',
        url: '/user/login',
        data: {
            id: id,
            password: password
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

export function register(name, id, password, email, role) {
    return request({
        method: 'POST',
        url: '/user/register',
        data: {
            name: name,
            sid: id,
            password: password,
            role: role,
            email: email
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

export function modifyPasswd(id, password) {
    return request({
        method: 'POST',
        url: '/user/modifyPasswd',
        data: {
            sid: id,
            password: password
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
