/* eslint-disable */
// prettier-ignore
import { AspidaClient, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'
// prettier-ignore
import { Methods as Methods1 } from './callback'
// prettier-ignore
import { Methods as Methods2 } from './next'
// prettier-ignore
import { Methods as Methods3 } from './pause'
// prettier-ignore
import { Methods as Methods4 } from './previous'
// prettier-ignore
import { Methods as Methods5 } from './repeat'
// prettier-ignore
import { Methods as Methods6 } from './resume'
// prettier-ignore
import { Methods as Methods7 } from './shuffle'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/callback'
  const PATH1 = '/next'
  const PATH2 = '/pause'
  const PATH3 = '/previous'
  const PATH4 = '/repeat'
  const PATH5 = '/resume'
  const PATH6 = '/shuffle'
  const GET = 'GET'
  const PUT = 'PUT'

  return {
    callback: {
      get: (option: { query: Methods1['get']['query'], config?: T }) =>
        fetch(prefix, PATH0, GET, option).send(),
      $get: (option: { query: Methods1['get']['query'], config?: T }) =>
        fetch(prefix, PATH0, GET, option).send().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    next: {
      put: (option?: { config?: T }) =>
        fetch<Methods2['put']['resBody']>(prefix, PATH1, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods2['put']['resBody']>(prefix, PATH1, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    pause: {
      put: (option?: { config?: T }) =>
        fetch<Methods3['put']['resBody']>(prefix, PATH2, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods3['put']['resBody']>(prefix, PATH2, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    previous: {
      put: (option?: { config?: T }) =>
        fetch<Methods4['put']['resBody']>(prefix, PATH3, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods4['put']['resBody']>(prefix, PATH3, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`
    },
    repeat: {
      put: (option: { body: Methods5['put']['reqBody'], config?: T }) =>
        fetch<Methods5['put']['resBody']>(prefix, PATH4, PUT, option, 'FormData').json(),
      $put: (option: { body: Methods5['put']['reqBody'], config?: T }) =>
        fetch<Methods5['put']['resBody']>(prefix, PATH4, PUT, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`
    },
    resume: {
      put: (option?: { config?: T }) =>
        fetch<Methods6['put']['resBody']>(prefix, PATH5, PUT, option).json(),
      $put: (option?: { config?: T }) =>
        fetch<Methods6['put']['resBody']>(prefix, PATH5, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`
    },
    shuffle: {
      put: (option: { body: Methods7['put']['reqBody'], config?: T }) =>
        fetch<Methods7['put']['resBody']>(prefix, PATH6, PUT, option, 'FormData').json(),
      $put: (option: { body: Methods7['put']['reqBody'], config?: T }) =>
        fetch<Methods7['put']['resBody']>(prefix, PATH6, PUT, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH6}`
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
