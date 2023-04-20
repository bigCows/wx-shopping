const service = require('./index')

export const login = (appCode,userName) =>{
  return service({
    url: `/api/users?code=${appCode}&userName=${userName}`
  })
}