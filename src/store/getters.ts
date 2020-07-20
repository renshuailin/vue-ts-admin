import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
  user(state: any): void {
    return state.user;
  }
};

export default getters;
