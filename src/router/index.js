import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import UserLogin from '@/views/login/UserLogin.vue'
import AdministratorLogin from '@/views/login/AdministratorLogin.vue'
import UserSignIn from '@/views/login/UserSignIn.vue'
import UserSignUp from '@/views/login/UserSignUp.vue'
import ResetPassword from '@/views/login/ResetPassword.vue'
import AdminHome from "@/views/administrator/AdminHome";
import GroupManagement from "@/views/administrator/GroupManagement";
import Application from "@/views/user/Application";
import UserHome from "@/views/user/UserHome";
import ApplicationManagement from "@/views/administrator/ApplicationManagement";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/userLogin',
        name: 'userLogin',
        component: UserLogin
    },
    {
        path: '/administratorLogin',
        name: 'administratorLogin',
        component: AdministratorLogin
    },
    {
        // 登录
        path: '/userLogin/userSignIn',
        name: 'userSignIn',
        component: UserSignIn
    },
    {
        // 注册
        path: '/userLogin/userSignUp',
        name: 'userSignUp',
        component: UserSignUp
    },
    {
        // 忘记密码
        path: '/userLogin/resetPassword',
        name: 'resetPassword',
        component: ResetPassword
    },
    {
        path: '/admin',
        name: 'adminHome',
        component: AdminHome,
        children: [{
            path: 'groupManagement',
            name: 'groupManagement',
            component: GroupManagement,
        }, {
            path: 'applicationManagement',
            name: 'applicationManagement',
            component: ApplicationManagement
        }
        ]
    },
    {
        path: '/user',
        name: 'userHome',
        component: UserHome,
        children: [{
            path: 'application',
            name: 'application',
            component: Application,
        }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
