import type { ClassValue } from 'tailwind-variants'

type Id<T> = {} & { [P in keyof T]: T[P] }

export type ComponentVariants<T extends { variants?: Record<string, Record<string, any>> }> = {
  [K in keyof T['variants']]: keyof T['variants'][K]
}

export type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T['slots']]?: ClassValue
}>
