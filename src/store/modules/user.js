const user = {
    state: null != sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {//公共state对象，存储所有组件状态
        user: {
            id: '',
            groupName: [],
            name: '',
            role: '',
            status: ''
        }
    },
    getters: {//唯一取值的方法，计算属性
        getUser(state) {
            return state.user;
        }
    },
    mutations: {//唯一可以修改state值的方法，同步阻塞的
        updateUser(state, user) {
            state.user = user;
        }
    },
    actions: {//异步调用mutations方法
        asyncUpdateUser(context, user) {
            context.commit('updateUser', user)
        }
    },
}
export default user;