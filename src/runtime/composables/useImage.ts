import type { Format, Size, Source, Srcset } from '../types/formats'
import { useRuntimeConfig } from '#imports'

export interface UseImageOptions {
  id: string
  formats?: Format[]
  sizes?: Size[]
}

export interface UseImageReturn {
  img: string
  original: string
  srcset?: Srcset
  sources?: Source[]
}

export function useImage(options: UseImageOptions): UseImageReturn {
  const runtimeConfig = useRuntimeConfig()
  const { fluxorUrl } = runtimeConfig.public.uplora as { fluxorUrl: string }

  return {
    img: `${fluxorUrl}/${options.id}`,
    original: '',
  }
}
