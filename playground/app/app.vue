<template>
  <UApp>
    <div class="py-10 max-w-4xl w-full mx-auto">
      <div class="flex gap-6">
        <UForm :state="state" class="w-52 shrink-0 space-y-4">
          <UFormField label="ID" name="id">
            <UInput v-model="state.id" />
          </UFormField>
          <UFormField label="Alt" name="alt">
            <UInput v-model="state.alt" />
          </UFormField>
          <UFormField label="LQIP" name="lqip">
            <UCheckbox v-model="state.lqip" label="On" />
          </UFormField>
          <UFormField label="Formats" name="formats">
            <UCheckboxGroup v-model="state.formats" :items="formats" />
          </UFormField>
          <UFormField label="Formats" name="formats">
            <URadioGroup v-model="state.sizes" :items="sizes" />
          </UFormField>
        </UForm>

        <div class="flex-1 w-full border-l border-default p-6 overflow-auto">
          <UploraImage
            :id="state.id"
            :alt="state.alt"
            :lqip="lqipComputed"
            :formats="state.formats"
            :sizes="sizesComputed"
            :ui="{ img: 'rounded-md' }"
            @load="onLoad"
            @error="onError"
          />

          <pre class="mt-6 font-mono text-sm/6 border border-muted bg-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words"><code>&lt;UploraImage
  :id=&quot;{{ state.id }}&quot;
  :alt=&quot;{{ state.alt }}&quot;
  :lqip=&quot;{{ lqipComputed ?? 'undefined' }}&quot;
  :formats=&quot;{{ state.formats }}&quot;
  :sizes=&quot;{{ sizesComputed ?? 'undefined' }}&quot;
/&gt;</code></pre>
        </div>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
interface State {
  id: string
  alt: string
  lqip: boolean
  formats: ('jpg' | 'webp')[]
  sizes: 'none' | 'one' | 'many'
}

const formats = [
  { label: 'Jpg', value: 'jpg' },
  { label: 'WebP', value: 'webp' },
]

const sizes = [
  { label: 'None', value: 'none' },
  { label: '256x', value: 'one' },
  { label: '256x, 512x', value: 'many' },
]

const state = reactive<State>({
  id: 'ytttsuxr3is94mbzjkvr1mgh',
  alt: 'Simple uplora image',
  lqip: false,
  formats: [],
  sizes: 'none',
})

const lqipComputed = computed(() => {
  if (state.lqip) {
    return {
      image: 'data:image/jpeg;base64,UklGRqAAAABXRUJQVlA4IJQAAAAQBQCdASogABYAPm0wlEckIqIhKAqogA2JZACxHoABExZ7s+cKGwGV5jV7VLJ8g5gAAP7jvV7Lt4vj9Edsi8pYVuGGtRb7WZ5n//i0WxeImX6a9bjryymCtQaMHK4Yz/rmmRYSyrViVS8TMciQNqoJ8qypBNfuySmF/HUseSll03LJ9xT9inr4f+VSjJx4QDcpHjAA',
      color: '#e0e0e0',
    }
  }

  return undefined
})

const sizesComputed = computed(() => {
  if (state.sizes === 'one') {
    return [{ width: 256, descriptor: '200w' }]
  }

  if (state.sizes === 'many') {
    return [{ width: 256, descriptor: '200w' }, { width: 512, descriptor: '500w' }]
  }

  return undefined
})

const toast = useToast()

function onLoad() {
  toast.add({
    title: 'Image load',
  })
}

function onError(e: any) {
  toast.add({
    title: 'Image error',
    description: e,
    color: 'error',
  })
}
</script>
