const service = require('./index')

export const getGoodsOrder = (key) => {
  return service({
    url: `/api/goods_order?key=${key}`
  })
}