
import notification from 'ant-design-vue/lib/notification'

export default function ({store, $axios,app: { $cookies },redirect})  {

	// 访问基本设置
    // $axios.defaults.baseURL = process.env.BASE_URL
    $axios.defaults.baseURL = "https://api.beethorn.com"
    $axios.defaults.timeout = 200000
    
	// request拦截器，我这里设置了一个token，当然你可以不要
	$axios.onRequest(config => {
        if(process.server){
            // 获取服务端的token
            let token = $cookies.get("Beethorn-token") ? $cookies.get("Beethorn-token") : null
            if (token != undefined || token != null || token != "") {
                config.headers['Authorization'] = `Bearer ${token}` 
            }
            return config
        }
    
        if(process.client){
            // 获取客户端token
            let token = store.state.user.token
            if (token != null) {
                config.headers['Authorization'] = `Bearer ${token}` 
            }
            return config
        }
        return config
    })
  
	$axios.onError(error => {
        // if (error.response.status === 403) {
        // // this.$notification.error({
        // //   message: 'Forbidden',
        // //   description: data.message
        // // })
        // }
        return error
    })
    

	// response拦截器，数据返回后，你可以先在这里进行一个简单的判断
    $axios.interceptors.response.use(response => {
        if (response.data.code == -996) {
            if (process.client) {
                notification.error({
                    message: '登录过期',
                    description: '登录过期'
                })
                store.dispatch("user/M_UPDATE_USER",{
                    token: null,
                    avatar: null,
                    nickName: null
                })
                $cookies.remove("beethorn-token")
                // location. reload()
                redirect("/404")
            }
        }

        return response.data
    })  
}
