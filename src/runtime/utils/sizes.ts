import type { Size, Srcset } from '../types/formats'

export interface GenerateSizesOptions {
  width: number
  height?: number
  minWidth?: number
  step?: number
}

/**
 * Convert sizes to srcset
 */
export function sizesToSrcset(sizes: Size[]): Srcset {
  return sizes
    .map((size) => `${size.width ?? ''}x${size.height ?? ''} ${size.descriptor}`)
    .join(', ')
}

/**
 * Generate sizes
 */
export function generateSizes(options: GenerateSizesOptions): Size[] {
  const { width, minWidth = 640, step = 0.7 } = options
  const sizes: Size[] = []

  let currentWidth = width

  while (true) {
    sizes.push({
      width: Math.round(currentWidth),
      descriptor: 'x', // todo: придумать, как вычислять данное поле
    })

    currentWidth *= step

    if (currentWidth < minWidth) {
      sizes.push({
        width: Math.round(currentWidth),
        descriptor: 'x',
      })

      break
    }
  }

  return sizes
}
