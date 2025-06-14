<template>
  <div :class="ui.root({ class: props.ui?.root })">
    <div
      v-if="lqip"
      :class="ui.lqip({ class: props.ui?.lqip })"
      :style="{
        backgroundImage: lqip.image,
        backgroundColor: lqip.color,
      }"
    />
    <picture :class="ui.picture({ class: props.ui?.picture })">
      <template v-if="image.sources && image.sources.length > 1">
        <source
          v-for="(source, key) in image.sources"
          :key="key"
          :srcset="source.srcset"
          :type="source.type"
        >
      </template>

      <img
        ref="image"
        v-bind="imageAttrs"
        :src="image.img"
        :srcset="image?.srcset"
        :alt="alt"
        :loading="loading"
        :class="ui.img({ class: props.ui?.img })"
      >
    </picture>
  </div>
</template>

<script lang="ts">
import type { SerializableHead } from '@unhead/vue/types'
import type { ImgHTMLAttributes } from 'vue'
import type { Format, LQIP, Size } from '../types/formats'
import type { ComponentSlots } from '../types/tv'
import { computed, onMounted, useHead, useNuxtApp, useTemplateRef } from '#imports'
import { tv } from 'tailwind-variants'
import { useImage } from '../composables/useImage'

const uploraImage = tv({
  slots: {
    root: 'relative',
    lqip: 'bg-cover bg-no-repeat bg-center',
    picture: '',
    img: '',
  },
})

export interface UploraImageProps {
  id: string
  alt: string
  formats?: Format[]
  sizes?: Size[]
  lqip?: LQIP
  loading?: 'lazy' | 'eager'
  preload?: boolean | { fetchPriority: 'auto' | 'high' | 'low' }
  // csp
  nonce?: string
  imgAttrs?: ImgHTMLAttributes
  ui?: ComponentSlots<typeof uploraImage>
}

export interface UploraImageEmits {
  load: [Event]
  error: [string | Event]
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<UploraImageProps>(), {
  loading: 'lazy',
})
const emit = defineEmits<UploraImageEmits>()

const nuxtApp = useNuxtApp()
const initialLoad = nuxtApp.isHydrating

const image = computed(() => useImage({
  id: props.id,
  formats: props.formats,
  sizes: props.sizes,
}))

if (import.meta.server && props.preload) {
  useHead({ link: () => {
    if (!image.value.img) {
      return []
    }

    const link: NonNullable<SerializableHead['link']>[number] = {
      rel: 'preload',
      as: 'image',
      imagesrcset: image.value.srcset,
      nonce: props.nonce,
      ...(typeof props.preload !== 'boolean' && props.preload?.fetchPriority
        ? { fetchpriority: props.preload.fetchPriority }
        : {}),
    }

    return [link]
  } })
}

const imageRef = useTemplateRef('image')
const imageAttrs = computed(() => ({
  ...(props.imgAttrs || {}),
  ...(import.meta.server ? { onerror: 'this.setAttribute(\'data-error\', 1)' } : {}),
}))

onMounted(() => {
  if (!imageRef.value) {
    return
  }

  if (imageRef.value.complete && initialLoad) {
    if (imageRef.value.getAttribute('data-error')) {
      emit('error', new Event('error'))
    } else {
      emit('load', new Event('load'))
    }
  }

  imageRef.value.onload = (event) => {
    emit('load', event)
  }

  imageRef.value.onerror = (event) => {
    emit('error', event)
  }
})

const ui = computed(() => uploraImage({}))
</script>
