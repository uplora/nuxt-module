import type { ImageExtension } from '@uplora/formats'
import type { Format, Size, Source, Srcset } from '../types/formats'
import { imagesExtensionsToMimeTypes } from '@uplora/formats'
import { createImageResolver } from '../utils/resolver'

export interface UseImageOptions {
  id: string
  formats?: Format[]
  sizes?: Size[]
}

export interface UseImageReturn {
  img: string
  original: string
  srcset?: Srcset
  sources: Source[]
}

export function useImage(options: UseImageOptions): UseImageReturn {
  const resolve = createImageResolver(options.id)

  const original = resolve()
  const sizes: Size[] = options.sizes ?? [{ descriptor: '1x' }]
  const sources: Source[] = []

  function makeSrcset(format?: ImageExtension): Srcset | null {
    if (sizes && sizes.length > 1) {
      return sizes
        .map((size) => `${resolve({ resize: { width: size.width, height: size.height }, format })} ${size.descriptor}`)
        .join(', ')
    }

    return null
  }

  if (options.formats) {
    for (const format of options.formats) {
      const srcset = makeSrcset(format)

      sources.push({
        img: resolve({
          resize: {
            width: sizes[0].width,
            height: sizes[0].height,
          },
          format,
        }),
        ...(srcset ? { srcset } : {}),
        type: imagesExtensionsToMimeTypes[format],
      })
    }
  } else {
    const srcset = makeSrcset()

    sources.push({
      img: resolve({
        resize: {
          width: sizes[0].width,
          height: sizes[0].height,
        },
      }),
      ...(srcset ? { srcset } : {}),
    })
  }

  return {
    img: original,
    original,
    ...(sources.length > 0
      ? {
          img: sources[0].img,
          srcset: sources[0].srcset,
        }
      : {}),
    sources,
  }
}
