<template>
    <div class="create-box">
        <a-row :gutter="[40,0]">
            <a-col :span="18">
                <a-form-model ref="createForm" :model="createForm" :rules="createForm.rules">
                    <a-steps direction="vertical" >
                        <a-step>
                            <span slot="title">圈子所属类别</span>
                        
                            <div slot="description" class="step-box">
                                <a-form-model-item :style="{width: '200px'}" class="article-cates-group" ref="cateId" prop="cateId">
                                    <a-tree-select 
                                        v-model="createForm.cateId"
                                        :tree-data="cateList"
                                        size="large" 
                                        placeholder="请选择分类"
                                        tree-default-expand-all
                                    />
                                </a-form-model-item>
                            </div>
                        </a-step>
                        <a-step>
                            <span slot="title">圈子类型</span>
                        
                            <div slot="description" class="step-box">
                                <a-form-model-item ref="mode" prop="mode">
                                    <a-radio-group v-model="createForm.joinMode" size="large">
                                        <a-radio-button :value="1">
                                            公共圈子
                                        </a-radio-button>
                                        <a-radio-button :value="2">
                                            付费圈子
                                        </a-radio-button>
                                        <a-radio-button :value="3">
                                            专属圈子
                                        </a-radio-button>
                                    </a-radio-group>
                                </a-form-model-item>
                            </div>
                        </a-step>

                        <!-- 付费加入 -->
                        <a-step v-if="createForm.joinMode == 2">
                            <span slot="title">入圈规则</span>
                        
                            <div slot="description" class="step-box">
                                <!-- <a-input prefix="￥" suffix="RMB" size="large" /> -->
                                <a-form-model-item :ref="createForm.joinMode == 2 ? 'price':''" :prop="createForm.joinMode == 2 ? 'price':''">
                                <a-input-number
                                    v-model="createForm.price"
                                    :style="{ width: '200px' }"
                                    size="large"
                                    :precision="2"
                                    :min="0"
                                     placeholder="请输入价格"
                                />
                                </a-form-model-item>
                            </div>
                        </a-step>

                        <!--专属加入 -->
                        <a-step v-if="createForm.joinMode == 3">
                            <span slot="title">入圈规则</span>
                            <div slot="description" class="step-box">
                                <a-form-model-item :ref="createForm.joinMode == 3 ? 'secretKey':''" :prop="createForm.joinMode == 3 ? 'secretKey':''">
                                    <a-input 
                                    :style="{width: '200px'}"
                                    v-model="createForm.secretKey" 
                                    class="step-box-from-input" 
                                    size="large" 
                                    placeholder="请输入密钥" />
                                </a-form-model-item>
                            </div>
                        </a-step>

                        <a-step>
                            <span slot="title">圈子资料</span>
                        
                            <div slot="description" class="step-box">
                                <div class="step-box-from">
                                    <div class="step-box-from-uplo">
                                        <div class="frist upload" @click="uploadIcon">
                                            <img v-if="createForm.icon!= undefined" class="frist-img" :src="createForm.icon">
                                            <div  v-if="createForm.icon == undefined" class="frist-upload-box">
                                                <a-icon type="upload" />
                                                <p>上传圈子图标</p>
                                            </div>
                                        </div>   
                                        <div class="second upload" @click="uploadCover">
                                            <img v-if="createForm.cover != undefined" class="frist-img" :src="createForm.cover">
                                            <div v-if="createForm.cover == undefined" class="frist-upload-box">
                                                <a-icon type="upload" />
                                                <p>上传圈子封面</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-box-from">
                                    <a-form-model-item ref="title" prop="title">
                                        <a-input v-model="createForm.title" class="step-box-from-input" size="large" placeholder="请输入圈子标题" />
                                        <p>介于2-10个字之间</p>
                                    </a-form-model-item>
                                </div>
                                <!-- <div class="step-box-from">
                                    <a-form-model-item ref="slug" prop="slug">
                                            <a-input v-model="createForm.slug" class="step-box-from-input" size="large" placeholder="请输入圈子别名" />
                                        <p>会在圈子网址中显示，一般为圈子的英文名称或拼音，只要是字母即可</p>
                                    </a-form-model-item>
                                    
                                </div> -->
                                <div class="step-box-from">
                                    <a-form-model-item ref="description" prop="description">
                                        <a-textarea v-model="createForm.description" class="step-box-from-input" :rows="4"  placeholder="圈子的简单介绍"/>
                                        <p>介于10-100个字之间</p>
                                    </a-form-model-item>
                                </div>
                            </div>
                        </a-step>
                    </a-steps>
                </a-form-model>
            </a-col>
            <a-col :span="6">
                <div class="create-submit">
                    <a-button size="large" type="primary" block @click="onSubmit(1)">立即发布</a-button>
                </div>
                <ul class="create-hits">
                    <li>
                        <p>
                            <b>尊重原创</b>
                        </p>
                        <p>
                            请不要发布任何盗版下载链接，包括软件、音乐、视频等等。我们尊重原创。
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>处罚</b>
                        </p>
                        <p>
                            禁止发布垃圾广告,发现垃圾广告，本站会立刻封停您的账户
                        </p>
                    </li>
                </ul>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    middleware: ['auth'],
    name:"CreateGroup",
    components:{
    },
    head(){
        return this.$seo(`创作中心-${this.base.title}`,`创作中心`,[{
            hid:"beethorn",
            name:"description",
            content:`创作中心`
        }])
    },
    computed:{
        ...mapState(["design","base"])
    },
    data(){
        return{
            cateList:[],
            createForm:{
                cateId:undefined,
                title:undefined,
                cover:undefined,
                price:undefined,
                secretKey:undefined,
                joinMode: 1,
                icon:undefined,
                description:undefined,
                rules:{
                    cateId:[
                        { required: true, message: '请设置圈子分类', trigger: 'change' },
                    ],
                    joinMode:[
                        { required: true, message: '请设置圈子类型', trigger: 'change' },
                    ],
                    title:[
                        { required: true, message: '请输入圈子标题', trigger: 'change' },
                    ],
                    price:[
                        { required: true, message: '请输入加入金额', trigger: 'change' },
                    ],
                },
            },
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            try {
                const res = await this.$axios.get(api.getGroupMeta)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return false
                }
                const catelits =  this.$handertree(res.data.cateList || [],"cateId","parentId")
                this.cateList = this.$loopCate(catelits)
            } catch (error) {
          
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        
        onSubmit(){
            this.$confirm({
                cancelText:"取消",
                okText:"确定",
                title: '是否修改',
                content: '请认真检查填写的信息',
                onOk:() => {
                    this.$refs.createForm.validate(valid => {
                        if (valid) {
                           
                            if (this.createForm.cover == undefined || this.createForm.cover == null || this.createForm.cover == "") {
                               this.$message.error(
                                    "请上传圈子封面",
                                    3
                                )
                                return false
                            }

                            if (this.createForm.icon == undefined || this.createForm.icon == null || this.createForm.icon == "") {
                               this.$message.error(
                                    "请上传圈子图标",
                                    3
                                )
                                return false
                            }

                            if (this.createForm.joinMode == 2) {
                               if (this.createForm.price == 0 || this.createForm.price == undefined || this.createForm.price == null) {
                                   this.$message.error(
                                        "请设置加入费用",
                                        3
                                    )
                                    return false
                               }
                            }

                            if (this.createForm.joinMode == 3) {
                               if (this.createForm.secretKey == undefined || this.createForm.secretKey == null || this.createForm.secretKey == "") {
                                   this.$message.error(
                                        "请设置加入密钥",
                                        3
                                    )
                                    return false
                               }
                            }
                            this.postCreate(this.createForm)
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
                
                const res = await this.$axios.post(api.PostGroupCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
               this.$router.push({ name: "member-group-list"})

            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        uploadIcon(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.createForm.icon = res
                }
            }).catch((err)=>{
                this.createForm.icon = undefined
            })
        },
        uploadCover(file){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.createForm.cover = res
                }
            }).catch((err)=>{
                this.createForm.cover = undefined
            })
        },
    }

}
</script>


<style lang="less" scoped>
.create-box{
    min-height: 100vh;
    border: 1px solid #e5e9ef;
    background: white;
    border-radius: 4px;
    padding:20px;
    .step-box{
        .step-box-from{
            margin-bottom: 20px;
            width: 320px;
            .step-box-from-uplo{
                display: flex;
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
    .create-group-b{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .create-status{
        margin-bottom: 10px;
    }
    .cover-box{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 180px;
        border: 2px dashed rgb(221, 221, 221);
        cursor: pointer;
        margin: 20px 0;
        .upload-box{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 39px;
            p{
                margin-top: 10px;
                font-size: 14px;
                font-weight: bold;
            }
        }
        .create-cover{
            padding: 10px;
            height:  100%;
            width: 100%;
            img{
                height: 100%;
                width: 100%;
            }
        }
    }

    .create-hits{
        margin-top: 20px;
        li{
            font-size: 14px;
            flex-flow: column;
            border-bottom: 1px solid #f3f3f3;
            box-sizing: border-box;
            margin-bottom: 10px;
            p{
                font-size: 13px;
                margin-bottom: 5px;
            }
        }
    }
    .create-submit{
        display: flex;
        justify-content: flex-end;
    }
}

// 响应式处理
@media only screen and (max-width: 768px) {
  .container{
    .warper {
        width: 100% !important;
    }
  }
}
</style>