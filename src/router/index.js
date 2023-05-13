import {createRouter, createWebHistory} from 'vue-router'

//login
import UserLogin from '@/views/login/UserLogin.vue'
import UserSignIn from '@/views/login/UserSignIn.vue'
import UserSignUp from '@/views/login/UserSignUp.vue'
import ResetPassword from '@/views/login/ResetPassword.vue'

//admin
import AdminHome from "@/views/administrator/AdminHome";
import GroupManagement from "@/views/administrator/GroupManagement";
import ApplicationManagement from "@/views/administrator/ApplicationManagement";
import UserManagement from "@/views/administrator/UserManagement";
import fundingManagement from "@/views/administrator/FundingManagement";
import FundingManagement from "@/views/administrator/FundingManagement";
import AdminHomePage from "@/views/administrator/AdminHomePage";
import AdminMessageNotification from "@/views/administrator/AdminMessageNotification";
import GroupDetails from "@/views/administrator/GroupDetails";

//user
import Application from "@/views/user/Application";
import UserHome from "@/views/user/UserHome";
import UseOfFunds from "@/views/user/UseOfFunds";
import UserHomePage from "@/views/user/UserHomePage";
import GroupPage from "@/views/user/GroupPage";
import MessageNotification from "@/views/user/MessageNotification";
import ApplicationCheck from "@/views/user/ApplicationCheck";

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
                path: 'adminHomePage',
                name: 'adminHomePage',
                component: AdminHomePage
            },
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
            }, {
                path: 'adminMessageNotification',
                name: 'adminMessageNotification',
                component: AdminMessageNotification
            }, {
                path: 'groupDetails',
                name: 'groupDetails',
                component: GroupDetails
            }
        ]
    },
    {
        path: '/user',
        name: 'userHome',
        component: UserHome,
        children: [
            {
                path: 'userHomePage',
                name: 'userHomePage',
                component: UserHomePage
            },
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
            },
            {
                path: 'messageNotification',
                name: ' messageNotification',
                component: MessageNotification
            }, {
                path: 'applicationCheck',
                name: 'applicationCheck',
                component: ApplicationCheck

            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
//登录拦截
// router.beforeEach((to, from, next) => {
//     const user = sessionStorage.getItem("user")
//     if (to.name !== 'userLogin' && !user) {
//         next({name: 'userLogin'})
//     } else {
//         next()
//     }
// })

export default router
