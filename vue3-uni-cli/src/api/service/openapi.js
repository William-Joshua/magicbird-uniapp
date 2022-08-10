import Request from 'luch-request'
import request from '/src/utils/request'

const http = new Request()

export function commonRequest(type, bodyOrParams) {
  return request.post(`openapi/common/request/${type}`, bodyOrParams)
}

export function getCompanyInfo(companyName) {
  return commonRequest('get', {
    url: `http://shuidi.cn/?action=company_name_notice&company_name=${companyName}`,
    action: 'company_name_notice',
    company_name: companyName
  }).then((res) => {
    console.log(res)
    return res.data?.data?.company_list || []
  })
}
