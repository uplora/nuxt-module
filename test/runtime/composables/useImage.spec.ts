import { describe, expect, it } from 'vitest'
import { useImage } from '../../../src/runtime/composables/useImage'

describe.todo('useImage()', () => {
  it('should return the simple image', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
    })
  })

  it('should return the image with one format', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
      formats: ['jpg'],
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      sources: [
        { img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg', type: 'image/jpeg' },
      ],
    })
  })

  it('should return the image with multiple formats', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
      formats: ['jpg', 'webp'],
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      sources: [
        { img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/jpg', type: 'image/jpeg' },
        { img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/format/webp', type: 'image/webp' },
      ],
    })
  })

  it('should return the image with one size', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
      sizes: [{ width: 100, descriptor: '1x' }],
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      srcset: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x 1x',
    })
  })

  it('should return the image with multiple sizes', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
      sizes: [{ width: 100, descriptor: '1x' }, { width: 200, descriptor: '2x' }],
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      srcset: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x 1x, https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/200x 2x',
    })
  })

  it('should return the image with one format and one size', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
      formats: ['jpg'],
      sizes: [{ width: 100, descriptor: '1x' }],
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      srcset: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg 1x',
      sources: [
        { img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg', type: 'image/jpeg' },
      ],
    })
  })

  it('should return the image with multiple formats and sizes', () => {
    const result = useImage({
      id: 'fgu1yd2ncj05iogcooz31u55',
      formats: ['jpg', 'webp'],
      sizes: [{ width: 100, descriptor: '1x' }, { width: 200, descriptor: '2x' }],
    })

    expect(result).toEqual({
      img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg',
      original: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55',
      srcset: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg 1x, https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg 2x',
      sources: [
        {
          img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg',
          srcset: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg 1x, https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg 2x',
          type: 'image/jpeg',
        },
        {
          img: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/200x/-/format/webp',
          srcset: 'https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/200x/-/format/webp 1x, https://uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/200x/-/format/webp 2x',
          type: 'image/webp',
        },
      ],
    })
  })
})
