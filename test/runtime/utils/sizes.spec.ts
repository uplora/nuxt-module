import { describe, expect, it } from 'vitest'
import { generateImageSizes } from '../../../src/runtime/utils/sizes'

describe('generateImageSizes()', () => {
  it('should generate sizes with default step', () => {
    const sizes = generateImageSizes({ width: 1000 })
    expect(sizes).toEqual([
      { width: 1000, descriptor: '700w' },
      { width: 700, descriptor: '490w' },
      { width: 490, descriptor: '343w' },
    ])
  })

  it('should generate sizes with custom step', () => {
    const sizes = generateImageSizes({ width: 1000, step: 0.5 })
    expect(sizes).toEqual([
      { width: 1000, descriptor: '500w' },
      { width: 500, descriptor: '250w' },
    ])
  })

  it('should generate sizes with custom minWidth', () => {
    const sizes = generateImageSizes({ width: 1000, minWidth: 200 })
    expect(sizes).toEqual([
      { width: 1000, descriptor: '700w' },
      { width: 700, descriptor: '490w' },
      { width: 490, descriptor: '343w' },
      { width: 343, descriptor: '240w' },
      { width: 240, descriptor: '168w' },
      { width: 168, descriptor: '118w' },
    ])
  })
})
