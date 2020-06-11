import Vue from 'vue'

export const state = Vue.observable({
  lock: false as boolean,
  lockedMenuItem: undefined as MenuItem | string | undefined, // a clicked route when a navigation is locked
})

export const mutations = {
  setLock: (value: boolean) => (state.lock = value),
  setLockedMenuItem: (value: MenuItem | string) => (state.lockedMenuItem = value),
}

export const router = {
  state,
  mutations,
}
