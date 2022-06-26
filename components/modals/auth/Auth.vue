<template>
    <div class="login_box center opacity"
        :class="[isTrue && 'is_back_show']">
        <div class="login_container">
            <a-icon class="login_close" type="close" @click="close"/>
            <a-row>
                <a-col :md="24" :span="24" class="login_right">
                    <!-- 标题 -->
                    <h2>登录</h2>
    
                    <!-- 注册框 -->
                    <a-form-model 
                    ref="loginForm" 
                    :model="loginForm" 
                    :rules="loginForm.rules" class="register_input">
                        <a-form-model-item  
                            ref="account" 
                            prop="account">
                            <a-input size="large" v-model="loginForm.account" 
                            :placeholder="config.loginRegisterMode == 'email'?'请输入邮箱':'请输入手机号'">
                                <a-icon slot="prefix" type="user" />
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item v-if="loginForm.mode == LOGINMODE.CODE" ref="code" prop="code">
                            <div class="code">
                                <a-input :maxLength="6" class="code_input" size="large" v-model="loginForm.code" placeholder="验证码" />
                                <a-button size="large"  type="primary" @click="sendCode" :disabled="!loginForm.show">
                                    {{loginForm.content}}
                                </a-button>
                            </div>
                        </a-form-model-item>
                        <a-form-model-item v-if="loginForm.mode == LOGINMODE.PASS" ref="password" prop="password">
                            <a-input-password size="large" v-model="loginForm.password" placeholder="密码" />
                        </a-form-model-item>
                        <div v-if="loginForm.mode == LOGINMODE.CODE" class="go_login" @click="changeLoginMode(LOGINMODE.PASS)">
                            密码登录
                        </div>
                        <div v-if="loginForm.mode == LOGINMODE.PASS" class="go_login" @click="changeLoginMode(LOGINMODE.CODE)">
                            验证码登录
                        </div>
                    </a-form-model>
                    
                    <a-button @click="onSubmit" size="large" type="primary" block>
                        立即登录
                    </a-button>
                    <!-- 社交登录 -->
                    <div v-if="config.social.length > 0" class="login_open">
                        <div class="login_open_title">社交登录:</div>
                        <ul class="login_open_ul">
                            <li class="wechat">
                                <a-icon type="wechat" />
                                <span>微信</span>
                            </li>
                            <li class="qq">
                                <a-icon type="qq" />
                                <span>QQ</span>
                            </li>
                        </ul>
                    </div>

                    <!-- 协议 -->
                    <div  class="register_proxy">
                        <span>
                            注册登录即表示同意
                            <a href="/" target="_blank"><span>用户协议</span></a>
                            ,
                            <a href="/" target="_blank"><span>隐私协议</span></a>
                        </span>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex"
import api from "@/api/index"
import {LOGINMODE} from "@/shared/mode"
export default {
    data() {
        return {
            LOGINMODE,
            loginForm:{
                show: true,
                count: 0,
                content: "发送验证码",
                timer: null,
                account:null,
                mode: LOGINMODE.CODE,
                code:null,
                password:null,
                rules:{
                    account:[
                        // { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'change' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 6, message: '用户名最小长度为6', trigger: 'change' },
                    ],
                },
            },
            // registerType: 0 email, 1 telephone
            registerType: 0,
            config: {
                loginRegisterMode: "",
                policyUrl: "",
                protocolUrl: "",
                social: ""
            },
            isTrue: false,
            state: null // 准备（prepare） 确定（ ascertain） 取消（cancel）
        };
    },
    methods: {
        ...mapActions("user",["A_UPDATE_USER","A_UPDATE_TOKEN"]),
        // ...mapActions("auth",["SendCaptcha","RegisterConfig","ToRegister","ToLogin"]),
        async confirm() {

            const res = await this.$axios.get(api.getOption)     
            this.config.loginRegisterMode=res.data.info.loginRegisterMode
            this.config.policyUrl=res.data.info.policyUrl
            this.config.protocolUrl=res.data.info.protocolUrl
            this.config.social= res.data.info.social

            if (res.data.info.loginRegisterMode == "email") {
                this.loginForm.rules.account.push({
                    pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                    message: '请输入邮箱', trigger: 'blur'
                })
            }else{
                this.loginForm.rules.account.push({
                    pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '请输入手机号', trigger: 'blur'
                })
            }
            
            // this.config = JSON.parse(data.config)
            this.open();
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare' };
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                        return true;
                    }
                });
                this.state = res;
            });
        },
        changeLoginMode(e){
            this.loginForm.mode = e
        },
        onSubmit(){
            this.$refs.loginForm.validate(async (valid) => {
                try {
                    if (!valid) {
                        return false;
                    } 
                    const formData = {
                        "account":this.loginForm.account,
                        "password" : this.loginForm.password,
                        "code":this.loginForm.code,
                        "mode":this.loginForm.mode,
                    }  
                    const {code,message,data} = await this.$axios.post(api.postLogin,formData)
             
                    if (code != 1) {
                        this.$message.error(
                            message,
                            3
                        )
                        return
                    }
                    this.A_UPDATE_TOKEN(data.token)
                    const res = await this.$axios.get(api.getAccountInfo)
                    // userInfo.avatar = res.data.info.avatar
                    // userInfo.nickName = res.data.info.nickName
                    // userInfo.userId = res.data.info.userId
                    this.A_UPDATE_USER(res.data.info)
                    this.loginForm.account = null
                    this.loginForm.password = null
                    this.loginForm.code = null
                    this.$cookies.set("Beethorn-token",data.token,{
                        maxAge: 60 * 60 * 24 * 7,
                        path: '/'
                    })
                    // 刷新当前页面
                    location.reload()
                    // 连接ws
                    // this.$setWs.initWebSocket("ws://localhost:8199/ws/web")
                    // this.close()
                } catch (error) {
                    console.log(error)
                    setTimeout(() => {
                        this.$notification.error({
                            message: '网络错误',
                            description: "请稍后再试"
                        })
                    }, 1000)
                }
            });
        },
        sendCode(){
            this.$refs.loginForm.validateField("account",async (err)=>{
                if (err != "") {
                    return false
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.loginForm.count = TIME_COUNT;
                this.loginForm.show = false;
                this.loginForm.timer = setInterval(() => {
                    if (this.loginForm.count > 0 && this.loginForm.count <= TIME_COUNT) {
                            this.loginForm.count--;
                            this.loginForm.content = `${this.loginForm.count}秒后重发`
                        } else {
                            this.loginForm.show = true;
                            this.loginForm.content = "发送验证码"
                            clearInterval(this.loginForm.timer);
                            this.loginForm.timer = null;
                        }
                    }, 1000)
                }

                const formData = {
                    account:this.loginForm.account,
                }
                const res = await this.$axios.post(api.sendCaptcha,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                
            })
        },

        cancel(){
            this.state.state = "cancel"
            this.close()
        },
        ascertain(){
            this.state.state = "ascertain"
            this.close()
        },
        open() {
            this.isTrue = true;
        },
        close() {
            this.isTrue = false;
        },
        
    }
};
</script>

<style lang="less" scoped>

.login_box {
    user-select: none;
    pointer-events: none;
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transform: perspective(1px) scale(1.1);
    transition: visibility 0s linear .15s,opacity .15s 0s,transform .15s;
    display: flex;
    align-items: center;
    justify-content: center;
    .login_container{
        width: 340px;
        background-color: white;
        position: relative;  
        .login_close{
            position: absolute;
            right: -40px;
            font-size: 30px;
            color: #fff;
            z-index: 22;
            cursor: pointer;
        }
        .login_right{
            padding: 30px 24px 24px;
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            h2{
                text-align: center;
            }

            .login_input{
                margin: 40px 0 0 0;
                .login_register{
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    .forget{
                        color: #0084ff;
                    }
                    .go_register{
                        cursor: pointer;
                        color: #0084ff;
                    }
                }
            }

            .register_input{
                margin: 40px 0 0 0;
                .go_login{
                    margin-bottom: 20px;
                    color: #1890ff;
                    cursor: pointer;
                }
                .code{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .code_input{
                        // width: 100px;
                        margin-right: 20px;
                    }
                }
            }

            .login_open{
                margin-top: 20px;
                padding: 10px;
                border: 1px dashed rgba(202, 202, 202, 0.7);
                display: flex;
                justify-content: space-between;
                .login_open_title{
                    font-size: 16px;
                }
                .login_open_ul{
                    display: flex;
                    .wechat{
                        background: rgba(0, 132, 255, 0.09);
                        padding: 0 6px;
                        margin-right: 10px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 3px;
                        color: #17b31e;
                        font-size: 16px;
                        span{
                            margin-left: 5px;
                        }
                    }
                    .qq{
                        background: rgba(0, 132, 255, 0.09);
                        padding: 0 6px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 3px;
                        color: #4cc0f2;
                        font-size: 16px;
                        span{
                            margin-left: 5px;
                        }
                    }
                }
            }

            .register_proxy{
                margin-top: 10px;
                padding: 10px 0;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #f3f3f3;
                text-align: center;
                background: #f5f5f5;
                a{
                    color: #0084ff;
                }
            }
        }
    }
}
.is_back_show {
    opacity: 1 !important;
    background: rgba(42, 44, 48, 0.7);
    pointer-events: auto !important;
    visibility: visible;
    transform: perspective(1px) scale(1);
    transition: visibility 0s linear 0s,opacity .15s 0s,transform .15s;
}

@media only screen and (max-width: 768px) {
    .login_box{
        .login_container{
            margin: 0 20px;   
            .login_close{
                position: absolute;
                top: 0;
                right: 0;
                font-size: 20px;
                color: #000;
                padding: 10px;    
            }
        }
    }
}
</style>
