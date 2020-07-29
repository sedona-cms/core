import Vue from 'vue'

export const state = Vue.observable({
  lock: false as boolean,
  lockedMenuItem: undefined as MenuItem | string | undefined, // a clicked route when a navigation is locked
  lockedRoute: undefined as string | undefined,
})

export const mutations = {
  setLock: (value: boolean): boolean => (state.lock = value),
  setLockedMenuItem: (value: MenuItem | string): MenuItem | string =>
    (state.lockedMenuItem = value),
  setLockedRoute: (value: string): string => (state.lockedRoute = value),
}

export const router = {
  state,
  mutations,
}
