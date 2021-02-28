const DEBUG = true

export const debug = (message:any) => {
  if (DEBUG) {
    console.log(message)
  }
}

export const isLocalhost = () => window.location.href.indexOf('localhost') > -1