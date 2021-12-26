import { createStore } from 'vuex';
import type { IRootState } from '../../../../types/vuex-shim';

export default createStore<IRootState>({
    state: {
        name: '',
    },
    mutations: {
        setModal(state, name: string) {
            state.name = name;
        },
    },
    actions: {
        async openModal(
           { commit, state },
        ) {
            console.log('uppssss');
            commit('setModal', state);
        },
    },
});