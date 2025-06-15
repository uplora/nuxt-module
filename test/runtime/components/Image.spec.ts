import type { Format, LQIP, Size } from '../../../src/runtime/types/formats'
import { describe, expect, it } from 'vitest'
import Image, { type UploraImageProps } from '../../../src/runtime/components/Image.vue'
import ComponentRender from '../../component-render'

describe('image', () => {
  it.each([
    ['simple', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test' } }],
    ['with formats', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', formats: ['jpg', 'webp'] as Format[] } }],
    ['with sizes', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', sizes: [{ width: 100, descriptor: '1x' }] as Size[] } }],
    ['with lqip', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', lqip: { image: 'https://fluxor.uplora.ru/fgu1yd2ncj05iogcooz31u55/-/resize/100x/-/format/jpg', color: '#000000' } as LQIP } }],
    ['with loading', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', loading: 'eager' as const } }],
    ['with preload', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', preload: true } }],
    ['with nonce', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', nonce: '1234567890' } }],
    ['with imgAttrs', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', imgAttrs: { width: 100, height: 100 } } }],
    ['with ui', { props: { id: 'fgu1yd2ncj05iogcooz31u55', alt: 'test', ui: { root: 'w-full h-full' } } }],
  ])('render %s correctly', async (nameOrHtml: string, options: { props?: UploraImageProps }) => {
    const html = await ComponentRender(nameOrHtml, options, Image)
    expect(html).toMatchSnapshot()
  })
})
