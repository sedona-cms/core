import Vue from 'vue'

type Sedona = {
    config: ModuleConfig
}

declare module 'vue/types/vue' {
    interface Vue {
        $sedona: Sedona
    }
}
