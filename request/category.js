const service = require('./index')

export const getCateGory = () => {
  return service({
    url: '/api/category'
  })
}