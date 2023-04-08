// import { createStore } from 'vuex'
//
// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
import { createStore } from 'vuex';
import user from './modules/user';

export default createStore({
  modules: {
    user,
  },
});
