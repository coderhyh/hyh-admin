let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:9090'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://localhost:9090'
} else {
  BASE_URL = 'http://localhost:9090'
}

export { BASE_URL, TIME_OUT }
