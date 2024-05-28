import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(persist)
pinia.use(persist)

export default pinia


import { adminStore } from './admin'
import { tabClick } from './tab'
import { userStore } from './user'

export { adminStore, tabClick, userStore }
