import type { Format, Size, Source } from '../types/formats'

export interface UseImageOptions {
  id: string
  formats?: Format[]
  sizes?: Size[]
}

export interface UseImageReturn {
  img: string
  original: string
  srcset?: string
  sources?: Source[]
}

export function useImage(_options: UseImageOptions): UseImageReturn {
  return {
    img: '',
    original: '',
  }
}
