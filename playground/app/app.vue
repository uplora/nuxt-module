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
            :ui="{ root: 'rounded-md' }"
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
  formats: ('jpg' | 'webp' | 'avif')[]
  sizes: 'none' | 'one' | 'many'
}

const formats = [
  { label: 'Jpg', value: 'jpg' },
  { label: 'WebP', value: 'webp' },
  { label: 'Avif', value: 'avif' },
]

const sizes = [
  { label: 'None', value: 'none' },
  { label: '256x', value: 'one' },
  { label: '256x, 512x', value: 'many' },
]

const state = reactive<State>({
  id: 'ytttsuxr3is94mbzjkvr1mgh',
  alt: 'Simple uplora image',
  lqip: true,
  formats: ['jpg', 'webp'],
  sizes: 'many',
})

const lqipComputed = computed(() => {
  if (state.lqip) {
    return {
      color: '#ab7c5d',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAclBMVEUiKCLCu7LSo4HftJOwr6q5ta9LOi0pKiQyLiY+MynmvZvZrIlYQTLVx7qlpqLLwbfq07zrxqbuz7JkSTfKmXe3hmbfz75xUTyfc1WrfF3BkG6TaU58WEKcnJeHYEffwafQu6fhybLFq5Wwo5WSko2FiYXlL2BpAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAklEQVR4nJ2VbW+bQAzH/z4oJC2iaUqkbVGaStu+/1dqlFfV+gRqk0B4mGwfcNAs0uqrjjP1z76zzYV+g6UBkANIRdthKJe7S35cq+afIajhoS8YSpXyHUAIa0868WBsJwyA9BpGCVW7nZAQraLqjp2lSOELkLsh1LzsEN4IseMdOFJqGBBigQUT4rEse4KVEk4k+sX2AYA/orb+Y2TRuw7EmXNowM8VwGa9YcDaI4t4ESF6j4zoJeCTUL7YS6ItEIsWmQiWqnnzMTKU8PlQxto3d9tVucQaa1brGnV/mLquayCO+VhLEP3ULW5XavMKazzdTxXYT/fyNMDNZr1Zb+inLUtt2PT59jl5Sp46+1YsdSNz8yCAOm/mlDwlmF6NCEynCRLMtLTmnh+Pi+1KcyiH+wCKoAgKBAUQFJyiK/H8Mid4NHuYPT6X2WorqTI1l2ZfVuDBf7yoqviVAzc8efR2/wh/mWbI8itORTpJJ/ms6DpP5WAm0tvgjfFOgQOAEFggi7PZm7ZZn2cDXKfXb1o0Sl6UaSGE0h8z29a1kUpK7WwDUwJm2kAC6eT2f9teufwj4dmN5FLcRNJL3ScC5PQDKM5QveTtRAtc8Jqxdoculoe9f3lMGAF66hTWWx840aDvPJefOWmZw0RIkUnba/Rt8LGfCAe3oecvc9BSWgLnQCtzmQPQnQJ2phOYFe1OHC/8WnsGXk96TDYMkpIqdJTH0T9ah4bJCp5gDUB8pZRQMxbfXsagW/ilrNWfRKxGOx12DUU29y5ohpgVr/IsorotswNqPHtEl6HATUcLDuL1UmuUqetJeRd0U3a8kGRQV+AxZ9PkSOlLxfTHghOjZ0Ml9eObRUQDWvkIuT9Jug2jhGrE7rp2pAhAofP1DcnujHyjya2mIki77slPmJNmavPzGRtdGO7rMB9hrnHvov1FhwdUYVXBz6vKz52cDs930l+Y8xhfLAwO2cYiYms5XfwjAsup6G240QFbMSfe5XwFhWBQx/9JeHaPZzEdX+O/JH8BtUM+KttnGNQAAAAASUVORK5CYII=',
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
