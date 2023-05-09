export const useFetchTryCatch = async (fn: Function) => {
  try {
    return await fn()
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}
