<template>
    <div class="recaptcha_box center opacity"
        :class="[isTrue && 'is_back_show']">
        <div class="container">
            <div class="title">
                <div class="title_l">
                    <span>提现申请</span>
                </div>
                <div class="title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>
            <div class="from">
                <a-form-model ref="cashForm" :model="cashForm" :rules="cashForm.rules" class="cashForm">
                    
                    <!-- 收款方式 -->
                    <a-form-model-item ref="payMethod" prop="payMethod">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    收款方式
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                 <a-radio-group v-model="cashForm.payMethod" buttonStyle="solid" >
                                    <a-radio-button :value="1">
                                        支付宝
                                    </a-radio-button>
                                    <a-radio-button :value="2">
                                        微信
                                    </a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </a-form-model-item>
                    
                    <!-- 收款账号 -->
                    <a-form-model-item ref="number" prop="number">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    收款账号
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <a-input size="large"
                                    v-model="cashForm.number" 
                                    placeholder="请输入收款账号" />
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 可以提现余额 -->
                    <a-form-model-item ref="code" prop="code">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    可提现余额
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <span class="from-money">{{base.currencySymbol}} {{balance.toFixed(2)}}</span>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 提现金额 -->
                    <a-form-model-item ref="money" prop="money">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    提现金额
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                               <a-input-number size="large" 
                                    @change="changeTmpMonry"
                                    placeholder="请输入提现金额"
                                    v-model="cashForm.money" 
                                    :style="{ width: '100%' }"  
                                    :min="minCash" 
                                    :max="100000"
                                    :precision="2"/>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <!-- 实际提现金额 -->
                    <a-form-model-item ref="code" prop="code">
                        <a-row class="account-router" :gutter="[{md:12}]">
                            <a-col :span="24" :md="6">
                                <div class="from-title">
                                    实际到账金额
                                </div>
                            </a-col>
                            <a-col :span="24" :md="18">
                                <div class="from-money">
                                    {{base.currencySymbol}} {{tmpMoney}}
                                </div>
                                <div class="from-service">
                                    <span>手续费：{{serviceMoney}}元（{{cashServicePercent}}%）</span>
                                </div>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                </a-form-model>
            </div>
            <div class="action">
                <span>
                    {{base.currencySymbol}}{{tmpMoney}}元提现到{{userInfo.nickName}}对应的账户
                </span>
                <a-button @click="onSubmit" type="primary">
                    确认提现
                </a-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .recaptcha_box {
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
        .container{
            background-color: white;
            width: 620px;
            margin: 0 auto;
            position: relative;  
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            .title{
                font-size: 16px;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                .title_l{
                    display: block;
                    align-items: center;
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .from{
                padding: 40px;
                .from-title{
                    font-size: 16px;
                    font-weight: 700;
                }
                .from-money{
                    font-size: 22px;
                    font-weight: 700;
                }
                .from-service{
                    font-size: 12px;
                    line-height: 22.5px;
                    color: #8590a6;
                }
            }
            .action{
                height: 55px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0 40px;
                background: #f5f6f7;
                margin-top: 30px;
                span{
                    margin-right: 20px;
                }
            }
        }
    }
    .is_back_show {
        opacity: 1 !important;
        background: rgba(42, 44, 48, 0.7);
        pointer-events: auto !important;
        opacity: 1;
        visibility: visible;
        transform: perspective(1px) scale(1);
        transition: visibility 0s linear 0s,opacity .15s 0s,transform .15s;
    }
    @media only screen and (max-width: 768px) {
        .recaptcha_box{
            .container{
                margin: 0 20px;
            }
        }
    }
</style>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
export default {
    data(){
        return{
            isTrue: false,
            state: null, // 准备（prepare） 确定（ ascertain） 取消（cancel）
            minCash: 0,
            cashServicePercent:0,
            cashForm:{
                payMethod:null,
                number:null,
                money:null,
                rules:{
                    payMethod:[
                        { required: true, message: '请设置提现方式', trigger: 'blur' }
                    ],
                    number:[
                        { required: true, message: '请输入提现账号', trigger: 'blur' }
                    ],
                    money:[
                        { required: true, message: '请输入提现金额', trigger: 'blur' }
                    ],
                },
            },
            tmpMoney:0,
            serviceMoney:0,
            balance:0
        }
    },
    computed:{
        ...mapState("user",["userInfo"]),
        ...mapState(["base","pay"]),
    },
    methods:{
        async confirm(
            balance = 0,
        ) {
            this.balance = balance || this.balance;
            console.log(this.pay)
            this.minCash = this.pay.cashMin
            this.cashServicePercent = this.pay.cashServicePercent * 100
            this.open();
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare' };
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                        return true;
                    }
                });
                this.state = res;
            });
        },
        changeTmpMonry(e){
            let tmpM = e
            this.serviceMoney = (tmpM * (this.cashServicePercent / 100)).toFixed(2)
            this.tmpMoney = ((tmpM - tmpM * (this.cashServicePercent / 100)).toFixed(2))
        },
        onSubmit(e){
            this.$refs.cashForm.validate(async valid => {
                if (valid) {
                    if (this.balance < this.tmpMoney) {
                        this.$message.error(
                            "余额不足",
                            3
                        )
                        return
                    }
                
                    if (this.cashForm.money < this.minCash) {
                        this.$message.error(
                            "少于最少提现额度",
                            3
                        )
                        return
                    }



                    let formData = {}
                    formData = Object.assign(formData,this.cashForm)
                    
                    const res = await this.$axios.post(api.postCashCreate,formData)
                    if (res.code != 1) {
                        this.$message.error(
                            res.message,
                            3
                        )
                        return
                    }
                    this.cashForm.payMethod = null
                    this.cashForm.number = null
                    this.cashForm.money = null
                    this.tmpMoney = 0
                    this.serviceMoney = 0
                    this.balance = 0
                    this.ascertain()
                } else {
                    return false;
                }
            });
        },
        cancel(){
            this.cashForm.payMethod = null
            this.cashForm.number = null
            this.cashForm.money = null
            this.tmpMoney = 0
            this.serviceMoney = 0
            this.balance = 0
            this.state.state = 'cancel'
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
        }
    }
}
</script>