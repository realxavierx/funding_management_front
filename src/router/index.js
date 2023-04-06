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
import UserManagement from "@/views/administrator/UserManagement";
import fundingManagement from "@/views/administrator/FundingManagement";
import FundingManagement from "@/views/administrator/FundingManagement";
import UseOfFunds from "@/views/user/UseOfFunds";
import GroupPage from "@/views/GroupPage";

const routes = [
    {
        path: '/',
        name: 'home',
        component: UserLogin,
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
        children: [
            {
                path: 'userManagement',
                name: 'userManagement',
                component: UserManagement
            },
            {
                path: 'groupManagement',
                name: 'groupManagement',
                component: GroupManagement,
            },
            {
                path: 'fundingManagement',
                name: 'fundingManagement',
                component: FundingManagement,
            },
            {
                path: 'applicationManagement',
                name: 'applicationManagement',
                component: ApplicationManagement
            },
            {
                // 课题组情况
                path: 'groupPage',
                name: 'groupPage',
                component: GroupPage
            }
        ]
    },
    {
        path: '/user',
        name: 'userHome',
        component: UserHome,
        children: [
            {
                // 报销申请
                path: 'application',
                name: 'application',
                component: Application,
            },
            {
                // 经费使用情况
                path: 'useOfFunds',
                name: 'useOfFunds',
                component: UseOfFunds,
            },
            {
                // 课题组情况
                path: 'groupPage',
                name: 'groupPage',
                component: GroupPage
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
