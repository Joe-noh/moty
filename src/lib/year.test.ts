import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { currentYear } from '$lib/year'

describe('currentYear', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns prev year on January', () => {
    vi.setSystemTime(Date.parse('2023/01/10'))

    expect(currentYear()).toEqual(2022)
  })

  it('returns current year other than January', () => {
    vi.setSystemTime(Date.parse('2023/02/24'))

    expect(currentYear()).toEqual(2023)
  })
})
