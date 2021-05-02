import originAxios from 'axios'

export default function axios(options) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    //配置请求和响应拦截
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return error
    })

    instance.interceptors.response.use(response => {
      return response.data
    }, error => {
      console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })

    //传入对象进行网络请求
    instance(options).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
