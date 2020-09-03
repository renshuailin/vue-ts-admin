import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import Home from "views/Home.vue";
import Layout from "views/Layout/Layout.vue";
import jwt_decode from "jwt-decode";

Vue.use(VueRouter);

export const RouterMap = [
  {
    path: "/",
    name: "dash",
    component: Layout,
    redirect: "/home",
    hidden: true,
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          icon: "fa fa-home"
        },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/data",
    name: "data",
    component: Layout,
    hidden: true,
    meta: {
      title: "数据管理",
      icon: "fa fa-database"
    },
    redirect: "/tableData",
    children: [
      {
        path: "/tableData",
        name: "tableData",
        meta: {
          title: "表格管理",
          icon: "fa fa-table"
        },
        component: () => import("@/views/Data/TableData.vue")
      },
      {
        path: "/chartData",
        name: "chartData",
        meta: {
          title: "图表管理",
          icon: "fa fa-bar-chart"
        },
        component: () => import("@/views/Data/ChartData.vue")
      },
      {
        path: "/formData",
        name: "formData",
        meta: {
          title: "表单管理",
          icon: "fa fa-file-text-o",
          roles: ["admin", "editor"]
        },
        component: () => import("@/views/Data/FormData.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    redirect: "/accountData",
    hidden: true,
    children: [
      {
        path: "/accountData",
        name: "accountData",
        meta: {
          title: "账户管理",
          icon: "fa fa-user-plus",
          roles: ["admin"]
        },
        component: () => import("@/views/User/AccountData.vue")
      }
    ]
  },
  {
    path: "/info",
    component: Layout,
    redirect: "/userInfo",
    hidden: false,
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        meta: {
          title: "个人中心"
        },
        component: () => import("@/views/User/UserInfo.vue")
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    hidden: false,
    meta: {
      title: "404"
    },
    component: () => import("@/views/404.vue")
  },
  {
    path: "*",
    redirect: "/404"
  },
  {
    path: "/login",
    name: "login",
    hidden: false,
    meta: {
      title: "系统登录"
    },
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: "/password",
    name: "password",
    hidden: false,
    meta: {
      title: "找回密码"
    },
    component: () => import("@/views/Login/Password.vue")
  }
];

const routes: Array<RouteConfig> = RouterMap;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == "/login" || to.path == "/password") {
    next();
  } else {
    if (isLogin) {
      const decoded: any = jwt_decode(localStorage.tsToken);
      const { key } = decoded;
      //判断
      if (hasPermission(key, to)) {
        next();
      } else {
        next("/404");
      }
    } else {
      next("/login");
    }
  }
});
function hasPermission(roles: string, route: any) {
  if (route.meta && route.meta.roles) {
    // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}
export default router;
