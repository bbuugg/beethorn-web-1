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
                        <a-textarea  v-model="createForm.description" placeholder="描述" :rows="4" :maxLength="140"/>
                    </a-form-model-item>
                
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

                    <a-form-model-item ref="content" prop="content">
                        <tinymceEditor 
                        @writeContent="writeContent"   v-model="createForm.content"/>
                    </a-form-model-item>

                    <a-form-model-item v-if="resourceList.length > 0" ref="resource" prop="resource">
                        <a-table 
                        :pagination="false"
                        :columns="columns" :data-source="resourceList">
                            <span slot="action" slot-scope="record">
                                <a @click="removeResource(record)">删除</a>
                            </span>
                        </a-table>
                    </a-form-model-item>
                   
                </a-form-model>
            </a-col>
            <a-col :span="6">
                <div class="create-submit">
                    <a-button size="large" type="primary" block @click="addResource">添加资源</a-button>
                </div>
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
    name:"CreateArticle",
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
        ...mapState(["base"])
    },
    data(){
        return{
            tagList:[],
            cateList:[],
            // groupList:[],
            columns:[
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    width: "100px",
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            resourceList:[],
            createForm:{
                title:undefined,
                cover:undefined,
                content:null,
                tags:[],
                // groupId:[],
                cateId:undefined,
                description:undefined,
               
                rules:{
                    title:[
                        { required: true, message: '请输入标题', trigger: 'change' },
                    ],
                    groupId:[
                        { required: true, message: '请设置圈子', trigger: 'change' },
                    ],
                    cateId:[
                        { required: true, message: '请设置分类', trigger: 'change' },
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
                const res = await this.$axios.get(api.getArticleMeta)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
               
                // this.groupList = res.data.groupList || []
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
        writeContent(e){
            this.createForm.content = e
        },
        addResource(){
             this.$Resource().then((res)=>{
                if (res != false) {
                    this.resourceList.push(res)
                }
            })
        },
        removeResource(e){
            const resourceList = [...this.resourceList];
            this.resourceList = resourceList.filter(item => item.key !== e.key);
        },
        uploadCover(){
            this.$Upload().then((res)=>{
                if (res != false) {
                    this.createForm.cover = res
                }
            }).catch((err)=>{
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


                            // if (this.createForm.groupId.length > 5) {
                            //     this.$message.error(
                            //         "最多只能设置5个圈子",
                            //         3
                            //     )
                            //     return
                            // }

                            if (this.createForm.tags.length > 5) {
                                this.$message.error(
                                    "标签超出范围，最多只能设置5个",
                                    3
                                )
                                return
                            }

                            let formData = {
                                resources: null
                            }
                            formData.resources = this.resourceList.map((item)=>{
                                return item.id
                            })

                            formData = Object.assign(formData,this.createForm)
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
                const res = await this.$axios.post(api.postArticleCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.$router.push({ name: "member-article-list"})
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
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>