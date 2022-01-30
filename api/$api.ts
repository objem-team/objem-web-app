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
import { Methods as Methods4 } from './repeat'
// prettier-ignore
import { Methods as Methods5 } from './resume'
// prettier-ignore
import { Methods as Methods6 } from './shuffle'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/next'
  const PATH1 = '/pause'
  const PATH2 = '/previous'
  const PATH3 = '/repeat'
  const PATH4 = '/resume'
  const PATH5 = '/shuffle'
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
    repeat: {
      put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
        fetch<Methods4['put']['resBody']>(prefix, PATH3, PUT, option, 'FormData').json(),
      $put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
        fetch<Methods4['put']['resBody']>(prefix, PATH3, PUT, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`
    },
    resume: {
      put: (option?: { config?: T }) =>
        fetch<Methods5['put']['resBody']>(prefix, PATH4, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods5['put']['resBody']>(prefix, PATH4, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`
    },
    shuffle: {
      put: (option: { body: Methods6['put']['reqBody'], config?: T }) =>
        fetch<Methods6['put']['resBody']>(prefix, PATH5, PUT, option, 'FormData').json(),
      $put: (option: { body: Methods6['put']['reqBody'], config?: T }) =>
        fetch<Methods6['put']['resBody']>(prefix, PATH5, PUT, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`
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
