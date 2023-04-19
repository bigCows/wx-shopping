const service = require('./index')

export const getList = (id) =>{
  return service({
    url: `/api/list?id=${id}`,
  })
}