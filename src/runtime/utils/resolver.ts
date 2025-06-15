import type { Filters } from '@uplora/serializer'
import { useRuntimeConfig } from '#imports'
import { serialize } from '@uplora/serializer'

export function createImageResolver(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const { fluxorUrl } = runtimeConfig.public.uplora as { fluxorUrl: string }

  return (filters?: Filters): string => {
    const serializeFilters = filters ? serialize(filters) : ''

    return `${fluxorUrl}/${id}${serializeFilters ? `/${serializeFilters}` : ''}`
  }
}
