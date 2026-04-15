import { GlobalRegistrator } from '@happy-dom/global-registrator'

declare global {
  // React's test renderer reads this exact global name.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

GlobalRegistrator.register()
globalThis.IS_REACT_ACT_ENVIRONMENT = true
