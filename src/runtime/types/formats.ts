import type { ImageExtension, ImageMimeType } from '@uplora/formats'

/**
 * Format
 *
 * @example 'jpg'
 */
export type Format = ImageExtension

/**
 * Size
 */
export interface Size {
  /**
   * Width in pixels
   *
   * @example 1024
   */
  width?: number

  /**
   * Height in pixels
   *
   * @example 1024
   */
  height?: number

  /**
   * Descriptor
   *
   * @example 2x, 512px
   */
  descriptor: string
}

/**
 * LQIP base64 encoded image
 *
 * @example data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAA
 */
export type LQIP = string

/**
 * Image srcset
 *
 * @example https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg 1x, https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg 2x
 */
export type Srcset = string

/**
 * Source
 */
export interface Source {
  /**
   * Image URL
   *
   * @example https://uplora.ru/fgu1yd2ncj05iogcooz31u55
   */
  img: string

  /**
   * Image srcset
   *
   * @example https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg 1x, https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg 2x
   */
  srcset?: Srcset

  /**
   * Image mime type
   *
   * @example image/jpeg
   */
  type?: ImageMimeType
}
