export const useFetchTryCatch = async (fn: Function) => {
  try {
    await fn()
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}
