<template>
    <div class="create-box">
        <a-row :gutter="[40,0]">
            <a-col :span="18">
                <a-form-model ref="createForm" :model="createForm" :rules="createForm.rules">
                    <a-form-model-item ref="title" prop="title">
                        <a-input :maxLength="40" class="create-title" size="large" v-model="createForm.title" placeholder="请输入标题">
                        </a-input>
                    </a-form-model-item>
                    <!-- 描述 -->
                    <a-form-model-item ref="description" prop="description">
                        <a-textarea  v-model="createForm.description" placeholder="描述" :rows="4" :maxLength="120"/>
                    </a-form-model-item>
                     <!-- 圈子 -->
                    <a-row :gutter="[40,0]">
                        <a-col :span="12">
                            <a-form-model-item ref="tags" prop="tags">
                                <a-select v-model="createForm.tags" :maxTagCount="5" style="width: 100%;" size="large" placeholder="设置标签" mode="tags" :token-separators="[',']">
                                    <a-select-option v-for="(item,index) in tagList" :key="index" :value="`${item.title}`">
                                        {{item.title}}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-model-item class="article-cates-group" ref="cateId" prop="cateId">
                                <a-tree-select 
                                    v-model="createForm.cateId"
                                    :tree-data="cateList"
                                    size="large" 
                                    placeholder="请选择分类"
                                    tree-default-expand-all
                                />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[40,0]">
                        <a-col :span="12">
                            <a-form-model-item class="article-cates-group" ref="hasDown" prop="hasDown">
                                <a-select
                                v-model="createForm.hasDown" 
                                size="large" 
                                placeholder="是否开启下载">
                                    <a-select-option :value="1">
                                        否
                                    </a-select-option>
                                    <a-select-option :value="2">
                                        是
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    
                    
                    <!-- 下载权限 -->
                    <a-form-model-item v-if="createForm.hasDown == 2" class="perms-radio" ref="perms" prop="perms">
                         <a-radio-group size="large"  v-model="createForm.downMode" button-style="solid">
                            <a-radio-button :value="0">
                                公开
                            </a-radio-button>
                            <a-radio-button :value="1">
                                付费
                            </a-radio-button>
                            <a-radio-button :value="2">
                                评论
                            </a-radio-button>
                            <a-radio-button :value="3">
                                登录
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item v-if="createForm.downMode == 1" class="price" ref="price" prop="price">
                        <a-input-number
                        size="large" 
                        v-model="createForm.price"
                            placeholder="如果权限设置为付费下载，请设置付费金额"
                            :style="{ width: '30%' }"
                            :precision="2"
                            :min="0"
                        />
                    </a-form-model-item>

                    <a-form-model-item v-if="createForm.hasDown == 2" ref="downUrl" prop="downUrl">
                        <a-row v-for="(item,index) in createForm.downUrl" :key="index" :gutter="[40,0]" class="create-purpose">
                            <a-col :span="7">
                                <a-input v-model="item.title" :maxLength="40" size="large"  placeholder="平台名称如（百度网盘）" />
                            </a-col>
                            <a-col :span="7">
                                <a-input v-model="item.key" :maxLength="40" size="large"  placeholder="请输入下载地址" />
                            </a-col>
                            <a-col :span="7">
                                <a-input v-model="item.val" :maxLength="40" size="large"  placeholder="请输入提取码" />
                            </a-col>
                            <a-col :span="3" class="create-purpose-ac">
                                <a-button @click="removeDownUrl(index)" size="large" type="danger">
                                    删除
                                </a-button>
                            </a-col>
                        </a-row>
                        <a-button @click="addDownUrl" size="large" type="primary" block>
                            添加下载地址
                        </a-button>
                    </a-form-model-item>
  
                    <a-form-model-item v-if="createForm.hasDown == 2" ref="purpose" prop="purpose">
                        <a-row v-for="(item,index) in createForm.purpose" :key="index" :gutter="[40,0]" class="create-purpose">
                            <a-col :span="10">
                                <a-input v-model="item.key" :maxLength="40" size="large"  placeholder="请输入用途标题" />
                            </a-col>
                            <a-col :span="10">
                                <a-input v-model="item.val" :maxLength="40" size="large"  placeholder="请输入用途" />
                            </a-col>
                            <a-col :span="4" class="create-purpose-ac">
                                <a-button @click="removePurpose(index)" size="large" type="danger">
                                    删除
                                </a-button>
                            </a-col>
                        </a-row>
                        <a-button @click="addPurpose" size="large" type="primary" block>
                            添加用途
                        </a-button>
                    </a-form-model-item>

                    <a-form-model-item v-if="createForm.hasDown == 2" ref="attribute" prop="attribute">
                        <a-row v-for="(item,index) in createForm.attribute" :key="index" :gutter="[40,0]" class="create-purpose">
                            <a-col :span="10">
                                <a-input v-model="item.key" :maxLength="40" size="large"  placeholder="请输入用途标题" />
                            </a-col>
                            <a-col :span="10">
                                <a-input v-model="item.val" :maxLength="40" size="large"  placeholder="请输入用途" />
                            </a-col>
                            <a-col :span="4" class="create-purpose-ac">
                                <a-button @click="removeAttribute(index)" size="large" type="danger">
                                    删除
                                </a-button>
                            </a-col>
                        </a-row>
                        <a-button @click="addAttribute" size="large" type="primary" block>
                            添加属性
                        </a-button>
                    </a-form-model-item>

                    <a-form-model-item ref="content" prop="content">
                        <tinymceEditor @writeContent="writeContent"   v-model="createForm.content"/>
                    </a-form-model-item>
                   
                </a-form-model>
            </a-col>
            <a-col :span="6">
                <div class="create-submit">
                    <a-button size="large" type="primary" block @click="onSubmit(1)">立即发布</a-button>
                </div>
               <!-- 上传图片  -->
                <div class="cover-box" @click="uploadCover">
                    <div v-if="createForm.cover == undefined" class="upload-box">
                        <a-icon type="upload" />
                        <p>上传封面</p>
                    </div>
                    <div v-if="createForm.cover != undefined" class="create-cover">
                        <img :src="createForm.cover"/>
                    </div>
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
                    <li>
                        <p>
                            <b>注意</b>
                        </p>
                        <p>
                            如果您开启下载模块，后期修改内容将无法修改下载权限，以及属性内容，请认真仔细填写内容
                        </p>
                    </li>
                </ul>
            </a-col>
        </a-row>
    </div>
</template>
  
<script>
import tinymceEditor from "@/components/editor/tinymceEditor"
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    name:"createResource",
    middleware: ['auth'],
    components:{
        tinymceEditor
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
            tagList:[],
            cateList:[],
            createForm:{
                title:undefined,
                cover:undefined,
                content:null,
                tags:[],
                cateId:undefined,
                description:undefined,
                hasDown:undefined,
                price:0,
                downMode:0,
                downUrl:[],
                attribute:[],
                purpose:[],
                rules:{
                    title:[
                        { required: true, message: '请输入标题', trigger: 'change' },
                    ],
                    cateId:[
                        { required: true, message: '请设置分类', trigger: 'change' },
                    ],
                    hasDown:[
                        { required: true, message: '请设置是否开启下载模块', trigger: 'change' },
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
                const res = await this.$axios.get(api.getResourceMeta)
                 if (res == undefined || res == null) {
                    this.$message.error(
                        "网络错误",
                        3
                    )
                    return
                }
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
               
                this.tagList = res.data.tagList || []
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
        addDownUrl(){
            const form = {
                title:undefined,
                key:undefined,
                val:undefined
            }
            this.createForm.downUrl.push(form)
        },
        removeDownUrl(i){
           this.createForm.downUrl.splice(i,1)
        },
        addPurpose(){
            const form = {
                key:undefined,
                val:undefined
            }
            this.createForm.purpose.push(form)
        },
        removePurpose(i){
           this.createForm.purpose.splice(i,1)
        },
        addAttribute(){
            const form = {
                key:undefined,
                val:undefined
            }
            this.createForm.attribute.push(form)
        },
        removeAttribute(i){
            this.createForm.attribute.splice(i,1)
        },
        writeContent(e){
            this.createForm.content = e
        },

        uploadCover(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.createForm.cover = res
                }
            }).catch((err)=>{
                 console.log(err)
                this.createForm.cover = undefined
            })
        },
        onSubmit(e){
            this.$confirm({
                okText:"确定",
                cancelText:"取消",
                title: '发布',
                content: '请注意，您填写的信息是否正确',
                onOk:() => {
                    this.$refs.createForm.validate(valid => {
                        if (valid) {

                            if (this.createForm.hasDown == 2) {
                                if (this.createForm.downUrl.length == 0) {
                                    this.$message.error(
                                        "请设置下载地址",
                                        3
                                    )
                                    return
                                }

                                if (this.createForm.downMode == 1 && this.createForm.price == 0) {
                                    this.$message.error(
                                        "请设置价格",
                                        3
                                    )
                                    return
                                }
                                
                                
                            }


                            if (this.createForm.cover == undefined || this.createForm.cover == null) {
                                this.$message.error(
                                    "请上传封面",
                                    3
                                )
                                return
                            }

                            if (this.createForm.content == undefined || this.createForm.content == null) {
                                this.$message.error(
                                    "请先写点东西吧",
                                    3
                                )
                                return
                            }

  

                            if (this.createForm.tags.length > 5) {
                                this.$message.error(
                                    "标签超出范围，最多只能设置5个",
                                    3
                                )
                                return
                            }

                            if (this.createForm.downMode != 1) {
                                this.createForm.price = 0
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
                const res = await this.$axios.post(api.postResourceCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.$router.push({ name: "member-resource-list"})
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
.create-box{
    border: 1px solid #e5e9ef;
    background: white;
    border-radius: 4px;
    padding:20px;
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

    .create-purpose{
        margin-bottom: 10px;
        .create-purpose-ac{
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
    .create-hits{
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
</style>