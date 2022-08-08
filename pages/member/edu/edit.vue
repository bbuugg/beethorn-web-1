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
                    <a-row :gutter="[40,0]">
                        <a-col :span="12">
                            <a-form-model-item ref="type" prop="type">
                                <a-select v-model="createForm.type" 
                                    style="width: 100%;" size="large"
                                    placeholder="设置类型" 
                                    disabled
                                >
                                    <a-select-option  :value="1">
                                        线下
                                    </a-select-option>
                                    <a-select-option  :value="2">
                                        线上
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>

                    <a-form-model-item v-if="createForm.type == 1" ref="max" prop="max">
                        <a-input-number
                                    size="large" 
                                    v-model="createForm.max"
                                    placeholder="最大报名数"
                                    :style="{ width: '100%' }"
                                    :precision="0"
                                    :min="1"
                                />
                    </a-form-model-item>
                    
                    <a-row :gutter="[40,0]">
                        <a-col :span="12">
                            <a-form-model-item class="article-cates-group" ref="isPay" prop="isPay">
                                <a-radio-group disabled size="large"  v-model="createForm.joinMode" button-style="solid">
                                    <a-radio-button :value="0">
                                        免费报名
                                    </a-radio-button>
                                    <a-radio-button :value="1">
                                        付费报名
                                    </a-radio-button>
                                </a-radio-group>
                            </a-form-model-item>
                        </a-col>
                        <a-col v-if="createForm.joinMode == 1" :span="12">
                            <a-form-model-item class="article-cates-group" ref="videoPrice" prop="videoPrice">
                                <a-input-number
                                size="large" 
                                v-model="createForm.price"
                                    placeholder="请设置付费金额"
                                    :style="{ width: '100%' }"
                                    :precision="2"
                                    :min="0"
                                />
                            </a-form-model-item>
                        </a-col>
                    </a-row>

                    <!-- 课时 -->
                    <a-form-model-item ref="section" prop="section">
                        <a-button @click="addSection" size="large">
                            添加章节
                        </a-button>
                        <ul class="section-box">
                            <li v-for="(item,index) in createForm.section" :key="index">
                                <div class="section-item">
                                    <div class="section-ac">
                                        <a-input v-if="item.isEdit" :maxLength="40" class="section-title"  v-model="item.title" placeholder="请输入标题" />
                                        <span v-if="!item.isEdit" class="section-title span-title">{{item.title}}</span>
                                        <a-icon class="section-title" :type="item.isEdit ? 'check':'edit'" @click="editSection(index)"/>
                                        <a-icon :type="item.isShow ? 'up':'down'" @click="editSectionShowClass(index)"/>
                                    </div>
                                    <div>
                                        <a-button @click="addClass(index)" type="link">
                                            添加课时
                                        </a-button>
                                        <a-button @click="removeSection(index)" type="danger">
                                            删除章节
                                        </a-button>
                                    </div>
                                    
                                </div>
                                <ul v-if="item.isShow && item.children.length > 0" class="class-box">
                                    <li v-for="(jitem,jindex) in item.children" :key="jindex">
                                        <div class="class-item">
                                            <div class="class-ac">
                                                <a-input v-if="jitem.isEdit" :maxLength="40" class="class-title"  v-model="jitem.title" placeholder="请输入标题" />
                                                <span v-if="!jitem.isEdit" class="class-title span-title">{{jitem.title}}</span>
                                                <a-icon class="class-title" :type="jitem.isEdit ? 'check':'edit'" @click="editClass(index,jindex)"/>
                                                <a-tag v-if="jitem.link != null && createForm.type == 2" color="#87d068">
                                                    已上传视频
                                                </a-tag>
                                                <a-tag v-if="jitem.isWatch && createForm.type == 2" color="#f50">
                                                    已经设置为试看
                                                </a-tag>
                                            </div>
                                            <div>
                                                <a-button v-if="createForm.type == 2" @click="setIsWatch(index,jindex)" type="link">
                                                    设置试听
                                                </a-button>
                                                <a-button v-if="createForm.type == 2" @click="upload(index,jindex)" type="link">
                                                    上传视频
                                                </a-button>
                                                <a-button @click="removeClass(index,jindex)" type="danger">
                                                    删除课时
                                                </a-button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </a-form-model-item>

                    <a-form-model-item ref="content" prop="content">
                        <tinymceEditor @writeContent="writeContent"   :valueContont="createForm.content"/>
                    </a-form-model-item>
                </a-form-model>
            </a-col>
            <a-col :span="6">
                <div class="create-submit">
                    <a-button size="large" type="primary" block @click="onSubmit(1)">
                        立即修改
                    </a-button>
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
                            如果您开启下载模块，后期修改内容将无法修改下载权限，
                            以及属性内容，请认真仔细填写内容。
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
import tinymceEditor from "@/components/editor/tinymceEditor"
export default {
    name:"EditEdu",
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
                content:null,
                cover:undefined,
                type:undefined,
                tags:[],
                section:[],
                cateId:undefined,
                description:undefined,
                price:0,
                joinMode:undefined,
                max:0,
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
                    type:[
                        { required: true, message: '请设置类型', trigger: 'change' },
                    ],
                    joinMode:[
                        { required: true, message: '请设置报名方式', trigger: 'change' },
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
                const res = await this.$axios.get(api.getEduMeta)
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
                

                const params = {id:this.id}
                const editInfo = await this.$axios.get(api.getEduEditInfo,{params: params})

                if (editInfo.code != 1) {
                    this.$message.error(
                        editInfo.message,
                        3
                    )
                    this.$router.push({ path: '/404' })
                    return
                }

                this.createForm = Object.assign(this.createForm,editInfo.data.info)
               

                this.createForm.tags = editInfo.data.info.tagList == null ? [] :  editInfo.data.info.tagList.map((itme)=>{
                    return itme.title
                })

                if (editInfo.data.info.section != "") {
                    this.createForm.section = JSON.parse(editInfo.data.info.section)
                    this.createForm.section = this.createForm.section.map((item)=>{
                        const tmp = {
                            isShow:false,
                            isEdit:false,
                            title:item.title,
                            children:[]
                        }
                        tmp.children = item.children.map((jitem)=>{
                            const jtmp = {
                                isWatch:jitem.isWatch,
                                isEdit:false,
                                title:jitem.title,
                                link:jitem.link
                            }
                            return jtmp
                        })
                        return tmp
                    })
                }
                

                this.status = editInfo.data.info.status
                this.remark = editInfo.data.info.remark
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        
        editSectionShowClass(e){
            this.createForm.section[e].isShow = !this.createForm.section[e].isShow
        },
        editSection(e){
            this.createForm.section[e].isEdit = !this.createForm.section[e].isEdit
        },
        setIsWatch(e,ce){
             this.createForm.section[e].children[ce].isWatch = !this.createForm.section[e].children[ce].isWatch
        },
        editClass(e,ce){
            this.createForm.section[e].children[ce].isEdit = !this.createForm.section[e].children[ce].isEdit
        },
        addClass(e){
            this.createForm.section[e].isShow = true
            const form = {
                isEdit:false,
                isWatch:false,
                link:null,
                title:`第${this.createForm.section[e].children.length + 1}节课`,
                isVideo:false,
            }
            if (this.createForm.section[e].children.length > 0) {
               this.createForm.section[e].children.unshift(form)
            } else {
                this.createForm.section[e].children.push(form)
            }
        },
        removeClass(e,ce){
           this.createForm.section[e].children.splice(ce,1)
        },
        addSection(){

            const form = {
                isShow:false,
                isEdit:false,
                title:`第${this.createForm.section.length + 1}章节`,
                children:[]
            }
            if (this.createForm.section.length > 0) {
                this.createForm.section.unshift(form)
            } else {
                this.createForm.section.push(form)
            }
        },
        removeSection(i){
           this.createForm.section.splice(i,1)
        },
        upload(e,ce){
            this.$Upload("Video").then((res)=>{
                if (res != false) {
                    this.createForm.section[e].children[ce].link = res
                }
            }).catch((err)=>{
                this.createForm.section[e].children[ce].link = null
            })
        },
        writeContent(e){
            this.createForm.content = e
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
        onSubmit(e){
            this.$confirm({
                okText:"确定",
                cancelText:"取消",
                title: '修改中',
                content: '请注意，您填写的信息是否正确',
                onOk:() => {
                    this.$refs.createForm.validate(valid => {
                        if (valid) {

                            if (this.createForm.joinMode == 1 && this.createForm.price == 0) {
                                 this.$message.error(
                                    "请设置观看价格",
                                    3
                                )
                                return
                            }


                            if (this.createForm.cover == undefined || this.createForm.cover == null) {
                                this.$message.error(
                                    "请上传封面",
                                    3
                                )
                                return
                            }

                            if (this.createForm.section.length < 1) {
                                this.$message.error(
                                    "请上传视频地址",
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

                            if (this.createForm.joinMode != 1) {
                                this.createForm.price = 0
                            }

                            this.createForm.section = this.createForm.section.map((item)=>{
                                const tmp = {
                                    title:item.title,
                                    children:[]
                                }
                                tmp.children = item.children.map((jitem)=>{
                                    const jtmp = {
                                        isWatch:jitem.isWatch,
                                        title:jitem.title,
                                        link:jitem.link
                                    }
                                    return jtmp
                                })
                                return tmp
                            })

                            this.createForm.eduId = this.id
                            console.log(this.createForm)
                            this.postEdit(this.createForm)
                        } else {
                            return false;
                        }
                    });
                },
                onCancel() {},
            });
        },
        async postEdit(formData){
            try {
                const res = await this.$axios.post(api.postEduEdit,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.$router.push({ name: "member-edu-list"})
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

    .section-box{
        margin-top: 20px;
        li{
            width: 100%;
            margin-bottom: 10px;
            .section-item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .section-ac{
                    display: flex;
                    align-items: center;
                    .section-title{
                        margin-right: 10px;
                    }
                    .span-title{
                        font-size: 22px;
                        font-weight: bold;
                    }
                }
            }
            .class-box{
                margin-left: 40px;
                background: #f2f4f5;
               
                .class-item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    .class-ac{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        .class-title{
                            margin-right: 10px;
                        }
                        .span-title{
                            font-size: 17px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
    .create-submit{
        display: flex;
        justify-content: flex-end;
    }
}
</style>