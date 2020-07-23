import { ActionTree } from "vuex";
import { RouterMap } from "../router/index";
import jwt_decode from "jwt-decode";

const actions: ActionTree<any, any> = {
  async setUser({ state, commit }, user: any) {
    const decode: any = jwt_decode(user);
    commit("SET_USER", decode);

    const { key } = decode;
    //返回用户所拥有路由
    let accessedRouters = filterAsyncRouter(RouterMap, key);
    commit("SET_ROUTERS", accessedRouters);
  }
};
function filterAsyncRouter(asyncRouterMap: Array<any>, roles: string) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // console.log(route);
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });

  return accessedRouters;
}

/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPermission(roles: string, route: any) {
  if (route.meta && route.meta.roles) {
    // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}

export default actions;
