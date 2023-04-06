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