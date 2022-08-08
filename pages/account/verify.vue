<template>
    <div class="verify-center">
        <h2>认证中心</h2>
        <a-form-model ref="verifyForm" :model="verifyForm" :rules="verifyForm.rules">
            <ul class="setting-content">
                <a-alert v-if="status == 1 && state == null" message="请等待三个工作日，正在审核您的资料" type="info" show-icon />
                <a-alert v-if="status == 2 && state == null" type="success" message="您已通过实名认证" banner />
               
                <!-- <li class="setting-item">
                    <div class="setting-input-title">
                        认证信息
                    </div>
                    <div class="setting-input">
                        <div class="ac-upload">
                            <a-upload
                                name="file"
                                :customRequest="uploadAvatar"
                                :showUploadList="false"
                                >
                                <div class="frist upload">
                                    <img v-if="avatarLink!= null" class="frist-img" :src="avatarLink">
                                    <div v-else class="frist-upload-box">
                                        <a-icon type="upload" />
                                        <p>上传证件正面</p>
                                    </div>
                                </div>
                            </a-upload>
                            <a-upload
                                name="file"
                                :customRequest="uploadCover"
                                :showUploadList="false"
                                >
                            <div class="second upload">
                                <img v-if="coverLink != null" class="second-img" :src="coverLink">
                                <div v-else class="frist-upload-box">
                                    <a-icon type="upload" />
                                    <p>上传证件反面</p>
                                </div>
                            </div>
                            </a-upload>
                        </div>
                    </div>
                </li> -->


                <li class="setting-item">
                    <div class="setting-input-title">
                        真实姓名
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="name" prop="name">
                            <a-input  :disabled="status != 0" v-model="verifyForm.name" size="large" placeholder="请输入真实姓名" />
                        </a-form-model-item>
                    </div>
                </li>  
                <li class="setting-item">
                    <div class="setting-input-title">
                        证件号
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="code" prop="code">
                            <a-input :disabled="status != 0" v-model="verifyForm.code" size="large" placeholder="请输入证件号" />
                        </a-form-model-item>
                    </div>
                </li>  
                <li class="setting-item">
                    <div class="setting-input-title">
                        联系方式
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="mode" prop="mode">
                            <a-radio-group :disabled="status != 0"  v-model="verifyForm.mode">
                                <a-radio :value="1">
                                    QQ
                                </a-radio>
                                <a-radio :value="2">
                                    微信
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </div>
                </li>
                <li class="setting-item">
                    <div class="setting-input-title">
                        联系号码
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="number" prop="number">
                            <a-input :disabled="status != 0" v-model="verifyForm.number" size="large" placeholder="请输入联系号码" />
                        </a-form-model-item>
                    </div>
                </li>

                <div  class="setting-item-price" v-if="price != 0 && status == 0">
                    <span v-if="!isPay"  class="price-tag">
                        {{base.currencySymbol}} {{price}}
                    </span>
                    <a-button v-if="!isPay" type="primary" @click="goPay">
                        支付
                    </a-button>
                    <div v-if="isPay" class="pay-ok">
                        已支付
                    </div>
                    <p>我们会人工对您的认证信息进行审核，通过认证之后您将获得一些特殊的权力。</p>
                </div>
                <div class="setting-save">
                    <a-button :disabled="status != 0" @click="onSubmit" size="large"  type="primary">
                    保存
                    </a-button>
                </div>
            </ul>
        </a-form-model>

        <!-- <div v-if="status == 1" class="verify-ds">
            
            <div class="verify-ds-box">
                <div class="verify-ds-box-title">
                    <div class="verify-ds-box-title-img">
                       <img src="/img/0.jpg"> 
                    </div>
                    <div class="verify-ds-box-title-text">
                        您已通过了实名认证
                    </div>
                </div>
                <div class="verify-ds-box-content">
                    <div class="verify-ds-box-content-name">
                        真实姓名：21阿三大苏打
                    </div>
                    <div class="verify-ds-box-content-number">
                        证号号码： 4****************9
                    </div>
                </div>
            </div>
            <div class="verify-desc-box">
                实名认证审核通过后，将不能修改认证信息。
                <p>如有特殊情况（如：改名、移民等导致原证件无效），请联系客服人员进行处理。</p>
            </div>
        </div> -->
    </div>
</template>

<script>
import {MODULE} from "@/shared/module"
import {ORDERTYPE} from "@/shared/order"
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    middleware: 'auth',
    data(){
        return{
            price: null,
            verifyForm:{
                verifyId:null,
                name:undefined,
                code:undefined,
                mode:undefined,
                number:undefined,
                rules:{
                    name:[
                        { required: true, message: '请输入真实姓名', trigger: 'change' },
                    ],
                    code:[
                        { required: true, message: '请输入证件号', trigger: 'change' },
                    ],
                    mode:[
                        { required: true, message: '请选择联系方式', trigger: 'change' },
                    ],
                    number:[
                        { required: true, message: '请输入联系号', trigger: 'change' },
                    ],
                },
            },
            isPay:false,
            status: null,
            state: null,
        }
    },
    mounted(){
        
        this.getData()
    },
    computed:{
        ...mapState(["base"]),
        ...mapState("user",["userInfo"]),
    },
    head(){
        return this.$seo(`用户中心-${this.base.title}`,`用户中心`,[{
            hid:"beethorn",
            name:"description",
            content:`用户中心`
        }])
    },
    methods:{
        async getData(){
            try {
              
                const res = await this.$axios.get(api.getAccountVerifyStatusIsPayPrice)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.status = res.data.info.status
                this.isPay = res.data.info.isPay
                this.price = res.data.info.price
                if (this.status != 0) {
                    const res = await this.$axios.get(api.getAccountVerify)
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    console.log(res)
                    this.verifyForm = Object.assign(this.verifyForm,res.data.info)
                    
                }
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        goPay(){
             // 判断
            const product = {
                detailId:this.userInfo.userId,
                detailModule:MODULE.USER,
                orderMoney:this.price,
                orderType: ORDERTYPE.VERIFY,
                orderMode: 1,
            }
            this.$Pay("支付认证费用",product).then(async (res)=>{
                if (res != false) {
                    this.isPay = true
                    return
                }
            }).catch((err)=>{
                console.log(err)
            })
        },

        // async uploadAvatar(file){
        //     const link = await this.upload(file)
        //     this.baseForm.avatar = link[0]
        //     this.avatarLink = this.$options.filters['resetLink'](link[0])
        // },
        // async uploadCover(file){
        //     const link = await this.upload(file)
        //     this.baseForm.cover = link[0]
        //     this.coverLink = this.$options.filters['resetLink'](link[0])
        // },
        onSubmit(){
            this.$confirm({
                title:"认证信息",
                content: '正在保存认证信息',
                cancelText:"取消",
                okText:"确定",
                onOk:() => {
                    this.$refs.verifyForm.validate(valid => {
                        
                        if (!this.isPay && this.price != 0) {
                            this.$message.error(
                                "请支付认证付费",
                                3
                            )
                            return
                        }
                       
                        if (valid) {
                            const formData = {
                                name:this.verifyForm.name,
                                number:this.verifyForm.number,
                                code:this.verifyForm.code,
                                mode:this.verifyForm.mode,
                            }
                            this.postCreate(formData)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postCreate(formData){
            try {
                
                const res = await this.$axios.post(api.postAccountVerify,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.status = res.data.status
                this.state = null

            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        async postEdit(formData){
            try {
                
                const res = await this.$axios.post(api.postVerifyEdit,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.status = res.data.status
                this.state = null

            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
    }
}
</script>


<style lang="less" scoped>
.verify-center{
    background-color: #fff;
    padding: 20px;
    h2{
        color: #bcbcbc;
        font-size: 18px;
    }
    .setting-content{
        margin-bottom: 20px;
        .setting-item{
            display: flex;
            border-bottom: 1px solid #ebeef5;
            padding: 20px 20px 0px 20px;
            .setting-input-title{
                font-weight: 700;
                font-size: 17px;
                width: 100px;
                flex-grow: 0;
            }
            .setting-input{
                width: 300px;
                .ac-upload{
                    display: flex;
                    margin-bottom: 20px;
                    .upload{
                        border: 2px dashed rgb(221, 221, 221);
                        padding: 5px;
                        width: 150px;
                        height: 150px;
                        cursor: pointer;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .frist-upload-box{
                            width: 100%;
                            height: 100%;
                            border: 1px dashed #d9d9d9;
                            background-color: #fafafa;
                            border-radius: 5px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            font-size: 39px;
                            p{
                                margin-top: 10px;
                                font-size: 14px;
                            }
                        }
                       
                    }
                    .second{
                        margin-left: 20px;
                    }
                }
            }
        }

        .setting-item-price{
            margin: 20px 0;
            padding: 20px;
            width: 100%;
            background: #f9f9f9;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .price-tag{
                font-size: 20px;
                font-weight: bold;
                display: inline-block;
                color: #1890ff;
                border: 3px solid #1890ff;
                background: linear-gradient(to bottom,rgba(238,238,238,.45),rgba(197,197,197,.62));
                padding: 5px 10px;
                border-radius: 30px;
                text-shadow: 0px 1px 0px #fff;
                line-height: 1;
                margin-bottom: 15px;
            }
            .pay-ok{
                color: #1890ff;
                font-size: 20px;
                font-weight: bold;
            }
            p{
                margin-top: 15px;
                
            }
        }
        .setting-save{
            margin-top: 20px;
            padding-left: 20px;
        }
    }
    .verify-ds{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .verify-ds-box{
            width: 407px;
            border: 2px solid #ddd;
            border-radius: 7px;
            margin-bottom: 20px;
            .verify-ds-box-title{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                .verify-ds-box-title-img{
                    width: 66px;
                    height: 66px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .verify-ds-box-title-text{
                    margin-left: 20px;
                    height: 97px;
                    border-bottom: 1px solid #ddd;
                    font-size: 18px;
                    color: #222;
                    font-weight: 700;
                    line-height: 96px;
                }
            }
            .verify-ds-box-content{
                padding: 35px 0;
                border-radius: 0 0 7px 7px;
                width: 100%;
                background: #f9f9f9;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .verify-ds-box-content-name{
                    margin-bottom: 20px;
                }
            }
        }
        .verify-desc-box{
            width: 407px;
        }

    }

}
</style>
