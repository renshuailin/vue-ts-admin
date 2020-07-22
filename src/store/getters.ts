import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
  user(state: any): void {
    return state.user;
  },
  routers(state: any): void {
    return state.routers;
  }
};

export default getters;
