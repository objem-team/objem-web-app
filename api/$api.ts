/* eslint-disable */
// prettier-ignore
import { AspidaClient } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'
// prettier-ignore
import { Methods as Methods1 } from './next'
// prettier-ignore
import { Methods as Methods2 } from './pause'
// prettier-ignore
import { Methods as Methods3 } from './previous'
// prettier-ignore
import { Methods as Methods4 } from './resume'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/next'
  const PATH1 = '/pause'
  const PATH2 = '/previous'
  const PATH3 = '/resume'
  const GET = 'GET'
  const PUT = 'PUT'

  return {
    next: {
      put: (option?: { config?: T }) =>
        fetch<Methods1['put']['resBody']>(prefix, PATH0, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods1['put']['resBody']>(prefix, PATH0, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    pause: {
      put: (option?: { config?: T }) =>
        fetch<Methods2['put']['resBody']>(prefix, PATH1, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods2['put']['resBody']>(prefix, PATH1, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    previous: {
      put: (option?: { config?: T }) =>
        fetch<Methods3['put']['resBody']>(prefix, PATH2, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods3['put']['resBody']>(prefix, PATH2, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    resume: {
      put: (option?: { config?: T }) =>
        fetch<Methods4['put']['resBody']>(prefix, PATH3, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods4['put']['resBody']>(prefix, PATH3, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`
    },
    get: (option?: { config?: T }) =>
      fetch<Methods0['get']['resBody']>(prefix, '', GET, option).json(),
    $get: (option?: { config?: T }) =>
      fetch<Methods0['get']['resBody']>(prefix, '', GET, option).json().then(r => r.body),
    $path: () => `${prefix}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
