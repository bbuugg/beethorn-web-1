<template>
    <div class="bingding-setting">
        <h2>账户设置</h2>
        <ul class="setting-contet">
            <li class="setting-item">
                <div class="setting-input-title">
                    登录密码
                </div>
                <div class="setting-input">
                    <span class="setting-input-span">已设置</span>
                    <a-button @click="showPassWordModal" type="dashed">
                        修改
                    </a-button>
                </div>
            </li>
            <li class="setting-item" v-if="config.loginRegisterMode == 'email'">
                <div class="setting-input-title">
                    验证邮箱
                </div>
                <div class="setting-input">
                    <span v-if="email != ''">{{email}}</span>
                    <span v-else class="setting-input-span">未设置</span>
                    <a-button @click="showEmailModal" type="dashed">
                       {{email != '' ? "修改" : "设置"}}
                    </a-button>
                </div>   
            </li>
            <li class="setting-item" v-if="config.loginRegisterMode == 'phone'">
                <div class="setting-input-title">
                    验证手机
                </div>
                <div class="setting-input">
                     <span v-if="phone != ''">{{phone}}</span>
                    <span v-else class="setting-input-span">未设置</span>
                    <!-- <a-button  v-if="phone == ''" @click="showPhoneModal" type="dashed">
                       {{phone != '' ? "修改" : "设置"}}
                    </a-button> -->
                </div>
            </li>
            <li class="setting-item">
                <div class="setting-input-title">
                    QQ
                </div>
                <div class="setting-input">
                    <span class="setting-input-span">未设置</span>
                    <a-button type="dashed">
                        绑定
                    </a-button>
                </div>
            </li>
            <li class="setting-item">
                <div class="setting-input-title">
                    微信
                </div>
                <div class="setting-input">
                    <span class="setting-input-span">未设置</span>
                    <a-button type="dashed">
                        绑定
                    </a-button>
                </div>
            </li>
        </ul>

        <!-- 密码模态 -->
        <a-modal
            title="修改密码"
            :visible="passWordModal.visible"
            @ok="passWordhandleOk"
            @cancel="passWordhandleCancel"
            okText="确定"
            cancelText="取消"
            class="binding-modal"
            >
            <a-form-model 
                ref="passWordModal" 
                :model="passWordModal" 
                :rules="passWordModal.rules" class="register_input">
                <a-form-model-item  
                    ref="account" 
                    prop="account">
                    <a-input size="large" v-model="passWordModal.account" 
                    :placeholder="config.loginRegisterMode == 'email'?'请输入邮箱':'请输入手机号'">
                        <a-icon slot="prefix" type="user" />
                    </a-input>
                </a-form-model-item>
                <a-form-model-item ref="code" prop="code">
                    <div class="code">
                        <a-input :maxLength="6" class="code_input" size="large" v-model="passWordModal.code" placeholder="验证码" />
                        <a-button size="large"  type="primary" @click="sendPassWordCode" :disabled="!passWordModal.show">
                            {{passWordModal.content}}
                        </a-button>
                    </div>
                </a-form-model-item>
                <a-form-model-item ref="password" prop="password">
                    <a-input-password size="large" v-model="passWordModal.password" placeholder="密码" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>

        <!-- 邮箱模态 -->
        <a-modal
            title="设置邮箱"
            :visible="emailModal.visible"
            @ok="emailhandleOk"
            @cancel="emailhandleCancel"
            okText="确定"
            cancelText="取消"
            class="binding-modal"
            >
            <a-form-model ref="emailModalForm" :model="emailModal" :rules="emailModal.rules" class="emailModal_input">
                <a-form-model-item  ref="account" prop="account">
                    <a-input size="large" v-model="emailModal.account" placeholder="输入邮箱" />
                </a-form-model-item>
                <a-form-model-item ref="code" prop="code">
                    <div class="code">
                        <a-input :maxLength="6" class="code_input" size="large" v-model="emailModal.code" placeholder="验证码" />
                        <a-button @click="emailSendCode" size="large" type="primary" :disabled="!emailModal.show">
                             {{emailModal.content}}
                        </a-button>
                    </div>
                </a-form-model-item>
            </a-form-model>
            
        </a-modal>

        <!-- 手机模态 -->
        <a-modal
            title="设置手机"
            :visible="phoneModal.visible"
            @ok="phoneModal"
            @cancel="phoneModal"
            okText="确定"
            cancelText="取消"
            class="binding-modal"
            >
            <a-form-model ref="phoneModal" :model="phoneModal" :rules="phoneModal.rules" class="phoneModal_input">
                <a-form-model-item  ref="account" prop="account">
                    <a-input size="large" v-model="phoneModal.account" placeholder="输入手机号" />
                </a-form-model-item>
                <a-form-model-item ref="code" prop="code">
                    <div class="code">
                        <a-input :maxLength="6" class="code_input" size="large" v-model="phoneModal.code" placeholder="验证码" />
                        <a-button size="large" @click="phoneSendCode"  type="primary" :disabled="!phoneModal.show">
                             {{phoneModal.content}}
                        </a-button>
                    </div>
                </a-form-model-item>
            </a-form-model>
        </a-modal>

    </div>
</template>

<script>
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    middleware: 'auth',
    head(){
        return this.$seo(`用户中心-${this.base.title}`,`用户中心`,[{
            hid:"beethorn",
            name:"description",
            content:`用户中心`
        }])
    },
    computed:{
        ...mapState(["base"])
    },
    data(){
        return {
            config: {
                loginRegisterMode: "",
                policyUrl: "",
                protocolUrl: "",
                social: ""
            },
            email: null,
            phone: null,
            passWordModal:{
                show: true,
                count: 0,
                content: "发送验证码",
                timer: null,
                visible:false,
                account: null,
                code: null,
                pass: null,
                rules:{
                    account:[
                        { required: true, message: '请输入账户', trigger: 'blur' },
                    ],
                    code:[
                        { required: true, message: '请输入验证', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ]
                },
            },
            emailModal:{
                show: true,
                count: 0,
                content: "发送验证码",
                timer: null,
                visible:false,
                account: null,
                code: null,
                rules:{
                    account:[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { pattern:/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/, message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
            },
            phoneModal:{
                show: true,
                count: 0,
                content: "发送验证码",
                timer: null,
                visible:false,
                account: null,
                code: null,
                rules:{
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {pattern:/^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            try {
                const res = await this.$axios.get(api.getAccountSecurity)
                this.email = res.data.info.email
                this.phone = res.data.info.phone

                const option = await this.$axios.get(api.getOption)     
                this.config.loginRegisterMode=option.data.info.loginRegisterMode
                this.config.policyUrl=option.data.info.policyUrl
                this.config.protocolUrl=option.data.info.protocolUrl
                this.config.social= option.data.info.social
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        sendPassWordCode(){
            this.$refs.passWordModal.validateField("account",async (err)=>{
                if (err != "") {
                    return false
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.passWordModal.count = TIME_COUNT;
                this.passWordModal.show = false;
                this.passWordModal.timer = setInterval(() => {
                    if (this.passWordModal.count > 0 && this.passWordModal.count <= TIME_COUNT) {
                            this.passWordModal.count--;
                            this.passWordModal.content = `${this.passWordModal.count}秒后重发`
                        } else {
                            this.passWordModal.show = true;
                            this.passWordModal.content = "发送验证码"
                            clearInterval(this.passWordModal.timer);
                            this.passWordModal.timer = null;
                        }
                    }, 1000)
                }

                const formData = {
                    account:this.passWordModal.account,
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
        // 密码框modal
        showPassWordModal(){
            this.passWordModal.visible = true
            if (this.config.loginRegisterMode == "email") {
                this.passWordModal.rules.account.push({
                        pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                        message: '请输入邮箱', trigger: 'blur'
                    })
                }else{
                    this.passWordModal.rules.account.push({
                        pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '请输入手机号', trigger: 'blur'
                    })
                }
        },
        passWordhandleOk(){
            this.$refs.passWordModal.validate(async valid => {
                if (valid) {     
                    try {
               
                        const formData = {
                            account:this.passWordModal.account,
                            code:this.passWordModal.code,
                            password:this.passWordModal.password,
                        }
                        const res = await this.$axios.post(api.postAccountUpdatePassWord,formData)
                        if (res.code != 1) {
                            this.$message.success(
                                res.message,
                                3
                            )
                            this.passWordModal.visible = false
                            this.passWordModal.account = null
                            this.passWordModal.code = null
                            this.passWordModal.password = null
                            return;
                        }else{
                            this.$message.error(
                                "密码修改成功",
                                3
                            )
                            this.passWordhandleCancel()
                        }
                    } catch (error) {
                        // console.log(error)
                        setTimeout(() => {
                            this.$notification.error({
                                message: '网络错误',
                                description: "请稍后再试"
                            })
                        }, 1000)
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        passWordhandleCancel(){
            this.passWordModal.visible = false;
        },

        //  邮箱设置框
        showEmailModal(){
            this.emailModal.visible = true
        },
        emailhandleOk(){
            this.$refs.emailModalForm.validate(async valid => {
                if (valid) {     
                    try {
                        const formData = {
                            account:this.emailModal.account,
                            code:this.emailModal.code,
                        }
                        const res = await this.$axios.post(api.postAccountUpdateEmail,formData)
                         if (res.code != 1) {
                            this.$message.success(
                                res.message,
                                3
                            )
                            this.emailModal.visible = false
                            this.emailModal.account = null
                            this.emailModal.code = null
                            return;
                        }else{
                            this.$message.error(
                                "邮箱修改成功",
                                3
                            )
                            this.emailhandleCancel()
                        }
                    } catch (error) {
                        setTimeout(() => {
                            this.$notification.error({
                                message: '网络错误',
                                description: "请稍后再试"
                            })
                        }, 1000)
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        emailhandleCancel(){
            this.emailModal.visible = false;
        },
        emailSendCode(){
            this.$refs.emailModal.validateField("account",async (err)=>{
                if (err != "") {
                    return false
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.emailModal.count = TIME_COUNT;
                this.emailModal.show = false;
                this.emailModal.timer = setInterval(() => {
                    if (this.emailModal.count > 0 && this.emailModal.count <= TIME_COUNT) {
                            this.emailModal.count--;
                            this.emailModal.content = `${this.emailModal.count}秒后重发`
                        } else {
                            this.emailModal.show = true;
                            this.emailModal.content = "发送验证码"
                            clearInterval(this.emailModal.timer);
                            this.emailModal.timer = null;
                        }
                    }, 1000)
                }

                const formData = {
                    account:this.emailModal.account,
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

        //  手机设置框
        showPhoneModal(){
            this.phoneModal.visible = true
        },
        phonehandleOk(){
            this.$refs.phoneModal.validate(async valid => {
                if (valid) {     
                    try {
                        const formData = {
                            account:this.phoneModal.account,
                            code:this.phoneModal.code,
                        }
                        const res = await this.$axios.post(api.postAccountUpdatePhone,formData)
                         if (res.code != 1) {
                            this.$message.success(
                                res.message,
                                3
                            )
                            this.phoneModal.visible = false
                            this.phoneModal.account = null
                            this.phoneModal.code = null
                            return;
                        }else{
                            this.$message.error(
                                "手机号修改成功",
                                3
                            )
                            this.emailhandleCancel()
                        }
                    } catch (error) {
                        setTimeout(() => {
                            this.$notification.error({
                                message: '网络错误',
                                description: "请稍后再试"
                            })
                        }, 1000)
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        phonehandleCancel(){
            this.phoneModal.visible = false;
        },
        phoneSendCode(){
            this.$refs.phoneModal.validateField("account",async (err)=>{
                if (err != "") {
                    return false
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.phoneModal.count = TIME_COUNT;
                this.phoneModal.show = false;
                this.phoneModal.timer = setInterval(() => {
                    if (this.phoneModal.count > 0 && this.phoneModal.count <= TIME_COUNT) {
                            this.phoneModal.count--;
                            this.phoneModal.content = `${this.phoneModal.count}秒后重发`
                        } else {
                            this.phoneModal.show = true;
                            this.phoneModal.content = "发送验证码"
                            clearInterval(this.phoneModal.timer);
                            this.phoneModal.timer = null;
                        }
                    }, 1000)
                }

                const formData = {
                    account:this.phoneModal.account,
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


    }
}
</script>

<style lang="less" scoped>
.bingding-setting{
    background-color: #fff;
    padding: 20px;
    h2{
        color: #bcbcbc;
        font-size: 18px;
    }
    .setting-contet{
        margin: 20px 0;
        .setting-item{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ebeef5;
            padding: 20px;
            .setting-input-title{
                font-weight: 700;
                font-size: 17px;
                width: 100px;
                flex-grow: 0;
            }
            .setting-input{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .setting-input-span{
                    color: green;
                }
            }
        }
    } 
}
.binding-modal{
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
</style>
