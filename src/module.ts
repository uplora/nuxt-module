import { defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  url: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'fluxor',
  },
  defaults: {
    url: 'https://fluxor.uplora.ru',
  },
  async setup() {
    // ...
  },
})
