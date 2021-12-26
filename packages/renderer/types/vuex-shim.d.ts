import type { Store } from 'vuex';
import type { DeepReadonly } from 'vue';

export declare interface IRootState {
    name: string
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<DeepReadonly<adasd>>;
    }
}