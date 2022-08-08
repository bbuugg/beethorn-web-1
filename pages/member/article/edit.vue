<template>
    <div class="create-box">
        <a-alert
            v-if="status == 3"
                class="create-status"
                message="未通过审核"
                :description="remark"
                type="error"
                show-icon
        />
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

                    <a-form-model-item ref="content" prop="content">
                        <tinymceEditor @writeContent="writeContent"   :valueContont="createForm.content"/>
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
    name:"EditArticle",
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
            id: null,
            status: 0,
            remark:null,
        }
    },
    validate({ query }) {
        if (query.id != null && query.id != undefined && query.id != NaN) {
             return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    mounted(){
        this.id = this.$route.query.id
        this.getData()
    },
    methods:{
        async getData(){
            try {
                let res = await this.$axios.get(api.getArticleMeta)
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
               
                // this.groupList = res.data.groupList || []
                this.tagList = res.data.tagList || []
                const catelits =  this.$handertree(res.data.cateList || [],"cateId","parentId")
                this.cateList = this.$loopCate(catelits)
               
                //  获取文章内容
                const params = {id:this.id}
               
                res = await this.$axios.get(api.getArticleEditInfo,{params: params})
                if (res.code != 1) {
                    this.$message.error(
                        editInfo.message,
                        3
                    )
                    this.$router.push({ path: '/404' })
                    return
                }
                this.createForm = Object.assign(this.createForm,res.data.info)
               
                // this.createForm.groupId = res.data.info.groupList == null ? [] : res.data.info.groupList.map((itme)=>{
                //     return itme.groupId
                // })

                this.createForm.tags = res.data.info.tagList == null ? [] :  res.data.info.tagList.map((itme)=>{
                    return itme.title
                })

                this.resourceList = res.data.info.resourceList == null ? [] :  res.data.info.resourceList.map((item)=>{
                    return {
                        key:item.id,
                        id:item.id,
                        cover:item.cover,
                        title:item.title,
                        createTime:item.createTime,
                        status:item.status
                    }
                })
               
                this.status = res.data.info.status
                this.remark = res.data.info.remark
               

                // if (this.$createTimeOut(editInfo.data.info.create_time)) {
                //     this.$message.error(
                //         "已经超过可以修改编辑的时间了",
                //         3
                //     )
                //     this.isTimeOut = true
                //     return
                // }
                
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
                    console.log(res)
                    this.createForm.cover = res
                }
            }).catch((err)=>{
                 console.log(err)
                this.createForm.cover = undefined
            })
        },
        onSubmit(){
            
            this.$confirm({
                okText:"确定",
                cancelText:"取消",
                title: '编辑',
                content: '请注意，您现在正在编辑',
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
                                resources: null,
                                articleId:0
                            }
                            formData.articleId = this.id
                            
                            formData.resources = this.resourceList.map((item)=>{
                                return item.id
                            })
                            formData = Object.assign(formData,this.createForm)
                            this.postEdit(formData)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel:() => {},
            });
        },
        async postEdit(formData){
            try {
                
                const res = await this.$axios.post(api.postArticleEdit,formData)
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