import { addComponentsDir, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'

export interface ModuleOptions {
  fluxorUrl?: string
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'uplora',
  },
  defaults: {
    fluxorUrl: 'https://fluxor.uplora.ru',
    prefix: 'Uplora',
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.uplora = defu(nuxt.options.runtimeConfig.public.uplora as any, {
      fluxorUrl: options.fluxorUrl,
    })

    const runtimeDir = resolve('./runtime')
    nuxt.options.alias['#uplora'] = runtimeDir
    nuxt.options.build.transpile.push(runtimeDir)

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false,
      global: true,
    })

    addImports({
      name: `use${options.prefix}Image`,
      from: resolve('runtime/composables/useImage'),
    })
  },
})
