import type { Size } from '../types/formats'

export interface GenerateImageSizesOptions {
  width: number
  minWidth?: number
  step?: number
}

function getDescriptor(width: number, step: number): string {
  return `${Math.round(width * step)}w`
}

/**
 * Generate sizes
 */
export function generateImageSizes(options: GenerateImageSizesOptions): Size[] {
  const { width, minWidth = 640, step = 0.7 } = options
  const sizes: Size[] = []

  let currentWidth = width

  while (true) {
    const normalizedWidth = Math.round(currentWidth)

    sizes.push({
      width: normalizedWidth,
      descriptor: getDescriptor(normalizedWidth, step),
    })

    currentWidth *= step

    if (currentWidth < minWidth) {
      const normalizedWidth = Math.round(currentWidth)

      sizes.push({
        width: normalizedWidth,
        descriptor: getDescriptor(normalizedWidth, step),
      })

      break
    }
  }

  return sizes
}
