import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => {
  return param === '2022' || param === '2023'
}
