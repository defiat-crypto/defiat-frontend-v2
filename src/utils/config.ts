const DEBUG = true

export const debug = (message:any) => {
  if (DEBUG) {
    console.log(message)
  }
}