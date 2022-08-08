<template>
    <div class="base-setting">
        <h2>基本资料</h2>
        <a-form-model ref="baseForm" :model="baseForm" :rules="baseForm.rules">
            <ul class="setting-contet">   
                <li class="setting-item">
                    <div class="setting-input-title">
                        头像封面
                    </div>
                    <div class="setting-input">
                        <div class="ac-upload">
                            <div class="frist upload" @click="uploadAvatar">
                                <img v-if="baseForm.avatar != null" class="frist-img" :src="baseForm.avatar">
                                <div v-else class="frist-upload-box">
                                    <a-icon type="upload" />
                                    <p>上传头像</p>
                                </div>
                            </div>
                            <div class="second upload" @click="uploadCover">
                                <img v-if="baseForm.cover != null" class="second-img" :src="baseForm.cover">
                                <div v-else class="frist-upload-box">
                                    <a-icon type="upload" />
                                    <p>上传封面</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>      
                <li class="setting-item">
                    <div class="setting-input-title">
                        昵称
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="nickName" prop="nickName">
                            <a-input v-model="baseForm.nickName" size="large" placeholder="请输入昵称" />
                        </a-form-model-item>
                    </div>
                </li>
                <li class="setting-item">
                    <div class="setting-input-title">
                        性别
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="sex" prop="sex">
                            <a-radio-group  v-model="baseForm.sex">
                                <a-radio :value="1">
                                    男
                                </a-radio>
                                <a-radio :value="2">
                                    女
                                </a-radio>
                                <a-radio :value="3">
                                    未知
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </div>
                </li>
                <li class="setting-item">
                    <div class="setting-input-title">
                        介绍
                    </div>
                    <div class="setting-input">
                        <a-form-model-item ref="description">
                            <a-textarea v-model="baseForm.description" :rows="4" placeholder="一句话介绍自己"/>
                        </a-form-model-item>
                    </div>
                </li>
            </ul>   
        </a-form-model>
        <div class="setting-save">
            <a-button @click="onSubmit"  type="primary">
            保存
            </a-button>
        </div>
    </div>
</template>

<script>
import { mapMutations,mapState } from "vuex"
import api from "@/api/index"
export default {
    middleware: 'auth',
    data(){
        return {
            baseForm:{
                avatar:null,
                cover:null,
                nickName:null,
                sex:null,
                description:null,
                rules:{
                    nickName:[
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                    ],
                    sex:[
                        { required: true, message: '请设置性别', trigger: 'blur' },
                    ],
                },
            }
        }
    },
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
    mounted(){
        this.getData()
    },
    methods:{
        ...mapMutations("user",["M_UPDATE_NICKNAME","M_UPDATE_AVATAR"]),
        async getData(){
            try {
                const res = await this.$axios.get(api.getAccountInfo)
                this.baseForm = Object.assign(this.baseForm,res.data.info)

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
        uploadAvatar(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.baseForm.avatar = res
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        uploadCover(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.baseForm.cover = res
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        onSubmit(){
            this.$confirm({
                title: '是否修改',
                content: '请注意，您现在正在修改用户信息',
                okText:"确定",
                cancelText:"取消",
                onOk:() => {
                    this.$refs.baseForm.validate(valid => {
                        if (valid) {
                            const formData = {
                                avatar:this.baseForm.avatar,
                                cover:this.baseForm.cover,
                                nickName:this.baseForm.nickName,
                                sex:this.baseForm.sex,
                                description:this.baseForm.description,
                            }
                            this.postInfo(formData)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postInfo(formData){
            try {
                const res = await this.$axios.post(api.postAccountEdit,formData)
                this.M_UPDATE_NICKNAME(this.baseForm.nickName)
                this.M_UPDATE_AVATAR(this.baseForm.avatar)
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
.base-setting{
    background-color: #fff;
    padding: 20px;
    h2{
        color: #bcbcbc;
        font-size: 18px;
    }
    .setting-contet{
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
    }
    .setting-save{
        padding-left: 20px;
    }
}
</style>
