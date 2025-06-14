<template>
  <div :class="ui.root({ class: props.ui?.root })">
    <picture :class="ui.picture({ class: props.ui?.picture })">
      ...
    </picture>
  </div>
</template>

<script lang="ts">
import type { Format, Size } from '../types/formats'
import type { ComponentSlots } from '../types/tv'
import { computed } from '#imports'
import { tv } from 'tailwind-variants'
import { useImage } from '../composables/useImage'

const uploraImage = tv({
  slots: {
    root: 'relative',
    picture: '',
  },
})

export interface UploraImageProps {
  src: string
  alt: string
  formats?: Format[]
  sizes?: Size[]
  loading?: 'lazy' | 'eager'
  ui?: ComponentSlots<typeof uploraImage>
}

export interface UploraImageEmits {
  load: [Event]
  error: [Event]
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<UploraImageProps>(), {
  loading: 'lazy',
})

defineEmits<UploraImageEmits>()

const _image = useImage({
  id: props.src,
  formats: props.formats,
  sizes: props.sizes,
})

const ui = computed(() => uploraImage({}))
</script>
