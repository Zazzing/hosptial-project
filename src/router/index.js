import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Validator from 'vue-validator'

// 首页导航条
import Home from '@/view/home'
// 注册
import Register from '@/view/register'
// 登录
import Login from '@/view/login'
// 首页内容
import Hello from '@/view/home_content/hello'
// 个人信息
import Personal from '@/view/information/personal'

// 项目模块
import project from '@/view/project/project'
import smallproject from '@/view/project/smallproject'
import Package from '@/view/project/package'
import registration from '@/view/project/registration'
// 会员模块
import members from '@/view/members/member'
import account from '@/view/members/account'
import integral from '@/view/members/integral'
import mem_package from '@/view/members/mem_package'
import style from '@/view/members/style'

// 问诊模块
import Inquiry from '@/view/inquiry/inquiry'
import InquiryNone from '@/view/inquiry/inquiryNone'

// 排班模块
import Arrange from '@/view/arrange/arrange';
import AddWork from '@/view/arrange/new_add_work';

// 预约模块
import Reservation from '@/view/reservation/reservation'
import Mrliu from '@/view/reservation/Mrliu'
import Vdetails from '@/view/reservation/Vdetails'
import Visdoctor from '@/view/reservation/Visdoctor'
import Appointreport from '@/view/reservation/appointreport'
import LiuContent from '@/view/reservation/liuContent'

Vue.use(Router)
Vue.use(Resource)
Vue.use(Validator)

export default new Router({
  routes: [
    {path:'/',component: Login},
    { path: '/register',component: Register},
    { path: '/home',component: Home,name:'',
        children:[
            {path:'personal',component: Personal ,name:'个人信息'},
            {path:'hello',component: Hello ,name:'子首页'},
            {path:'Inquiry',component: Inquiry,name:'问诊' },
            {path:'Noinquiry',component: InquiryNone,name:'无问诊' },
            {path: 'arrange',component: Arrange,name:'排班',
                children:[
                   {path:'new_add_work',component: AddWork}
                ]
            },
            {path:'members',component: members,name:'会员',
                children:[
                  {path:'mem_package',component: mem_package,name:'会员套餐'},
                  {path:'account',component: account,name:'会员帐号'},
                  {path:'integral',component: integral,name:'会员积分'},
                  {path:'style',component: style,name:'会员类型'},
                  {path: '/', redirect: 'account' }//在子路由定向到account
                ]
            },
            {path:'project',component: project,name:'项目',
                children:[
                  {path:'smallproject',component: smallproject,name:'子项目'},
                  {path:'package',component: Package,name:'套餐'},
                  {path:'registration',component: registration,name:'挂号费'},
                  {path: '/', redirect: 'smallproject' }//在子路由定向到smallproject
                ]
            },
            {path:'reservation',component: Reservation,name:'预约',
                children:[
                  {path:'Mrliu',component: Mrliu,name:'今日预约',
                      children:[
                        {path:'Visdoctor',component: Visdoctor,name:'出诊医生'},
                        {path:'liuContent',component: LiuContent,name:'刘医生'},
                        {path: '/', redirect: 'Visdoctor' }
                      ]

                  },
                  {path:'Vdetails',component: Vdetails,name:'详情页'},
                  {path: '/', redirect: 'Mrliu' },
                  {path: 'appointreport', component: Appointreport,name:'预约报备' }
                ]
            },
            
        ]
}     
  ]
})
