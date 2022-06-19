<template>
    <div>
        <div class="comment-info">
            <div class="comment-info-box">
                <div class="comment-avatar" v-if="userInfo != null && module != 'topic'">
                    <Avatar 
                        class="user-avatar"
                        :verifyRight="-5"
                        :verifyBottom="5"
                        :isVerify="userInfo.isVerify"
                        shape="square" 
                        :src="userInfo.avatar+'@w60_h60'" 
                        :size="50"
                    />
                </div>
                <div class="comment-create-box">
                    <a-textarea 
                        v-model="createForm.content"
                        id="commentInput" 
                        placeholder="请输入评论" 
                        auto-size :allowClear="true"/>
                    <div class="comment-tools">
                        <div class="tools">
                            <ul class="cooment-create-footer-l">
                                <li class="cooment-create-footer-l-item">
                                    <a-popover trigger="click"  placement="bottom">
                                        <template slot="content">
                                            <div class="emoji-box">
                                                <button v-for="(item,index) in emoji" @click="selectEmoji(item)"  :key="index">
                                                    {{item}}
                                                </button>
                                            </div>
                                        </template>
                                        <a-icon type="smile"/>
                                    </a-popover>
                                </li>
                                <!-- <li class="cooment-create-footer-l-item">
                                    <a-icon type="camera" @click="selectImg"/>
                                </li> -->
                                <!-- <li class="cooment-create-footer-l-item">
                                    <a-icon type="video-camera" @click="selectVideo"/>
                                </li> -->
                                <!-- <li class="cooment-create-footer-l-item"  >
                                    <my-font type="iconat" />
                                </li> -->
                            </ul>
                            <div class="cooment-create-meta-box">
                                <div v-if="commentMetaOptions.imgVisible" class="feed-create-meta img">
                                    <p>最多上传5张图片</p>
                                    <ul>
                                        <li v-for="(item,index) in createForm.fileList" :key="index">
                                            <div>
                                                <img :src="item" alt="xxx">
                                                <b @click="removeImg(index)" class="group-img-close"><a-icon type="close" /></b>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!-- <div v-if="commentMetaOptions.videoVisible" class="feed-create-meta video">
                                    <p>只能上传一个视频</p>
                                    <ul>
                                        <li>
                                            <div>
                                                <video preload="auto" :src="createForm.video"></video>
                                                <b @click="removeVideo" class="group-img-close"><a-icon type="close" /></b>
                                            </div>
                                        </li>
                                    </ul>
                                </div> -->
                            </div>
                        </div>
                        <div class="create-post">
                            <a-button @click="postCreate(0)" type="primary">
                                发布
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul v-if="!loading" class="comment-list">
            <li class="comment-li" v-for="item of list" :key="item.id">
                <div class="item-left">
                    <nuxt-link v-if=" item.userInfo != null" :to="{path:'/profile/' + item.userInfo.id }" class="item-link">   
                        <Avatar 
                            class="user-avatar"
                            :verifyRight="-5"
                            :verifyBottom="5"
                            :isVerify="item.userInfo.isVerify"
                            shape="square" 
                            :src="item.userInfo.avatar+'@w60_h60'" 
                            :size="40"
                        />
                    </nuxt-link>
                </div>

                <div class="item-right">
                    <div class="nick-name-lv">
                        <nuxt-link class="nick-name" v-if=" item.userInfo != null" :to="{path:'/profile/' + item.userInfo.id }" >   
                                <h2>{{item.userInfo.nickName}}</h2>
                        </nuxt-link>
                        <span class="lv">{{item.userInfo.grade.title}}</span>
                         <span class="date">{{item.createTime | resetData}}</span>
                    </div>
                    <p class="content">
                        {{item.content}}
                    </p>
                    <div class="tools">
                        <div class="reply-like">
                            <span @click="report(item)" class="report">举报</span>
                            <span  v-if="item.userInfo.id == userInfo.userId" @click="remove(item)" class="report">删除</span>
                        </div>
                        
                        <div class="reply-like">
                            
                            <div @click="repy(item,item.id)" class="reply">
                                <a-icon class="icon" type="message" />
                            </div>
                            <!-- <div @click="repy(item,item.id)" class="adoption">
                                <a-icon type="check" />
                                <span class="count">
                                    采纳
                                </span>
                            </div> -->
                            <div @click="postLike(item)" class="like">
                                <a-icon :theme="item.isLike ? 'filled' : 'outlined'" type="like" />
                                <span class="count">
                                    {{item.isLike ? '已赞' : '赞'}} {{item.likes == 0 ? "" : item.likes}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="comment-info-box" v-if="item.id == repyBoxTmp.id">
                        <div class="comment-avatar" v-if="userInfo != null && module != 'topic'">
                            <Avatar 
                                class="user-avatar"
                                :verifyRight="-5"
                                :verifyBottom="5"
                                :isVerify="userInfo.isVerify"
                                shape="square" 
                                :src="userInfo.avatar+'@w60_h60'" 
                                :size="50"
                            />
                        </div>
                        <div class="comment-create-box">
                            <a-textarea 
                                v-model="createForm.content"
                                id="commentInput" 
                                placeholder="请输入评论" 
                                auto-size :allowClear="true"/>
                            <div class="comment-tools">
                                <div class="tools">
                                    <ul class="cooment-create-footer-l">
                                        <li class="cooment-create-footer-l-item">
                                            <a-popover trigger="click"  placement="bottom">
                                                <template slot="content">
                                                    <div class="emoji-box">
                                                        <button v-for="(item,index) in emoji" @click="selectEmoji(item)"  :key="index">
                                                            {{item}}
                                                        </button>
                                                    </div>
                                                </template>
                                                <a-icon type="smile"/>
                                            </a-popover>
                                        </li>
                                        <!-- <li class="cooment-create-footer-l-item">
                                            <a-icon type="camera" @click="selectImg"/>
                                        </li> -->
                                        <!-- <li class="cooment-create-footer-l-item">
                                            <a-icon type="video-camera" @click="selectVideo"/>
                                        </li> -->
                                        <!-- <li class="cooment-create-footer-l-item"  >
                                            <my-font type="iconat" />
                                        </li> -->
                                    </ul>
                                    <div class="cooment-create-meta-box">
                                        <div v-if="commentMetaOptions.imgVisible" class="feed-create-meta img">
                                            <p>最多上传5张图片</p>
                                            <ul>
                                                <li v-for="(item,index) in createForm.fileList" :key="index">
                                                    <div>
                                                        <img :src="item" alt="xxx">
                                                        <b @click="removeImg(index)" class="group-img-close"><a-icon type="close" /></b>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- <div v-if="commentMetaOptions.videoVisible" class="feed-create-meta video">
                                            <p>只能上传一个视频</p>
                                            <ul>
                                                <li>
                                                    <div>
                                                        <video preload="auto" :src="createForm.video"></video>
                                                        <b @click="removeVideo" class="group-img-close"><a-icon type="close" /></b>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="create-post">
                                    <a-button class="remove-repy" @click="removeRepy" v-if="item.id == repyBoxTmp.id" type="dashed">
                                        取消回复
                                    </a-button>
                                    <a-button @click="postCreate(item.userInfo.id)" type="primary">
                                        发布
                                    </a-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul  v-if="item.children" class="reply-list">
                        <li v-for="citem of item.children" :key="citem.id" class="reply-item">
                            <div class="reply-top">
                               <nuxt-link  v-if=" citem.userInfo != null"  :to="{path:'/profile/' + citem.userInfo.id }" class="item-link">   
                                    <Avatar 
                                        class="user-avatar"
                                        :verifyRight="-5"
                                        :verifyBottom="5"
                                        :isVerify="citem.userInfo.isVerify"
                                        shape="square" 
                                        :src="citem.userInfo.avatar+'@w60_h60'" 
                                        :size="35"
                                    />
                                </nuxt-link>
                                <nuxt-link class="nick-name" :to="{path:'/profile/' + citem.userInfo.id }" >   
                                    <h2>{{citem.userInfo.nickName}}</h2>
                                </nuxt-link>
                                <a-icon class="icon" type="caret-right" />
                                <nuxt-link class="reply-name" :to="{path:'/profile/' + citem.repy.repyUserId }">   
                                    <h2>{{citem.repy.repyName}}</h2>
                                </nuxt-link>
                                <span class="date">{{citem.createTime | resetData}}</span>
                            </div>
                            <p class="reply-content">
                                {{citem.content}}
                            </p>
                            <div class="tools">
                                <div class="reply-like">
                                    <span @click="report(citem)" class="report">举报</span>
                                    <span  v-if="citem.userInfo.id == userInfo.userId" @click="remove(citem)" class="report">删除</span>
                                </div>
                                <div class="reply-like">
                                    <div  @click="repy(citem,item.id)" class="reply">
                                        <a-icon class="icon" type="message" />
                                    </div>
                                    <div @click="postLike(citem)" class="like">
                                        <a-icon :theme="citem.isLike ? 'filled' : 'outlined'" type="like" />
                                        <span class="count">
                                            {{citem.isLike ? '已赞' : '赞'}} {{citem.likes == 0 ? "" : citem.likes}}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="comment-info-box" v-if="citem.id == repyBoxTmp.id">
                                <div class="comment-avatar" v-if="userInfo != null && module != 'topic'">
                                    <Avatar 
                                        class="user-avatar"
                                        :verifyRight="-5"
                                        :verifyBottom="5"
                                        :isVerify="userInfo.isVerify"
                                        shape="square" 
                                        :src="userInfo.avatar+'@w60_h60'" 
                                        :size="40"
                                    />
                                </div>
                                <div class="comment-create-box">
                                    <a-textarea 
                                        v-model="createForm.content"
                                        id="commentInput" 
                                        placeholder="请输入评论" 
                                        auto-size :allowClear="true"/>
                                    <div class="comment-tools">
                                        <div class="tools">
                                            <ul class="cooment-create-footer-l">
                                                <li class="cooment-create-footer-l-item">
                                                    <a-popover trigger="click"  placement="bottom">
                                                        <template slot="content">
                                                            <div class="emoji-box">
                                                                <button v-for="(item,index) in emoji" @click="selectEmoji(item)"  :key="index">
                                                                    {{item}}
                                                                </button>
                                                            </div>
                                                        </template>
                                                        <a-icon type="smile"/>
                                                    </a-popover>
                                                </li>
                                                <!-- <li class="cooment-create-footer-l-item">
                                                    <a-icon type="camera" @click="selectImg"/>
                                                </li> -->
                                                <!-- <li class="cooment-create-footer-l-item">
                                                    <a-icon type="video-camera" @click="selectVideo"/>
                                                </li> -->
                                                <!-- <li class="cooment-create-footer-l-item"  >
                                                    <my-font type="iconat" />
                                                </li> -->
                                            </ul>
                                            <div class="cooment-create-meta-box">
                                                <div v-if="commentMetaOptions.imgVisible" class="feed-create-meta img">
                                                    <p>最多上传5张图片</p>
                                                    <ul>
                                                        <li v-for="(item,index) in createForm.fileList" :key="index">
                                                            <div>
                                                                <img :src="item" alt="xxx">
                                                                <b @click="removeImg(index)" class="group-img-close"><a-icon type="close" /></b>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!-- <div v-if="commentMetaOptions.videoVisible" class="feed-create-meta video">
                                                    <p>只能上传一个视频</p>
                                                    <ul>
                                                        <li>
                                                            <div>
                                                                <video preload="auto" :src="createForm.video"></video>
                                                                <b @click="removeVideo" class="group-img-close"><a-icon type="close" /></b>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div> -->
                                            </div>
                                        </div>
                                        <div class="create-post">
                                            <a-button class="remove-repy" @click="removeRepy" v-if="citem.id == repyBoxTmp.id" type="dashed">
                                                取消回复
                                            </a-button>
                                            <a-button @click="postCreate(citem.userInfo.id)" type="primary">
                                                发布
                                            </a-button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <CommentCreate /> -->
                        </li>
                    </ul>

                    <!-- <div class="reply-more">
                        阅读更多回复
                    </div> -->
                </div>
            </li>
            <div v-if="list.length > 0" class="comment-list-nomore">
               <a-config-provider :locale="locale">
                    <a-pagination
                        @change="changePage"
                        v-model="queryParam.page"
                        :pageSize="queryParam.limit"
                        :total="total"
                        size="small"
                    >
                    </a-pagination>
                </a-config-provider>
            </div>
        </ul>
        <ul v-if="loading">
            <li >
                <a-skeleton :paragraph="{ rows: 4 }" />
            </li>
        </ul>
        <div v-if="(list == null || list.length == 0) && !loading" class="empty">
            <a-empty>
                <span slot="description"> 还没人评论呢，你要不要来说一句 </span>
            </a-empty>
        </div>
    </div>
</template>

<script>
import Avatar from "@/components/avatar/avatar"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapState } from "vuex"
import api from "@/api/index"
export default {
    props:{ 
        isView:{
            type: Boolean, //指定传入的类型
            default: false //这样可以指定默认的值
        },
        isViewVideo:{
            type: Boolean, //指定传入的类型
            default: false //这样可以指定默认的值
        },
        module:{
            type: String, //指定传入的类型
            default: "" //这样可以指定默认的值
        },
        relatedId: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        },
    },
    components:{
        Avatar,
    },
    computed:{
        ...mapState("user",["token","userInfo"]),
    },
    data(){
        return{
            loading:false,
            locale: zhCN,
            queryParam: {
                page: 1,
                limit: 3,
                id:null,
                relatedId:0,
                module:null
            },
            createForm:{
                fileList:[],
                content: "",
                video:null,
                topId:0
            },
            emoji:[
                '😁',
                '😊',
                '😎',
                '😤',
                '😥',
                '😂',
                '😍',
                '😏',
                '😙',
                '😟',
                '😖',
                '😜',
                '😱',
                '😲',
                '😭',
                '😚',
                '💀',
                '👻',
                '👍',
                '💪',
                '👊',
            ],
            commentMetaOptions:{
                imgVisible:false,
                videoVisible:false,
            },
            total:0,
            list:[],
            tmpList:[],
            repyBoxTmp:{
                id:null,
            },
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            this.loading = true
            this.queryParam.relatedId = this.relatedId
            this.queryParam.module = this.module
            
            const res = await this.$axios.get(api.getCommentList,{params: this.queryParam})
           
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.total = res.data.total
            
            this.tmpList = res.data.list || []
            console.log(this.tmpList)
            this.restList(res.data.list)
            this.loading = false
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        restList(arr){
            let list = this.$handertree(arr || [],"id","parentId")
           
            list = list.map(item=>{
                if (item.type == 1 && item.files != "") {
                    item.files = JSON.parse(item.files)
                }
                if (item.children != null && item.children.length > 0) {
                    let _select = []
                    const reduse = (arr,id,repyName,userId) => {
                        arr.forEach((citem) => {
                            if (citem.parentId == id) {
                                let tmp = {}
                                if (citem.type == 1 && citem.files != "") {
                                    citem.files = JSON.parse(citem.files)
                                }
                                tmp = Object.assign(citem,tmp)
                                tmp.repy = {
                                    repyName: repyName,
									repyUserId: userId,
                                    repyId: id
                                }
                                _select.push(tmp)
                            }
                            if (citem.children != null && citem.children.length > 0) {
                                reduse(citem.children,citem.id,citem.userInfo.nickName,citem.userInfo.id)
                            }
                        });
                    }
                    reduse(item.children,item.id,item.userInfo.nickName,item.userInfo.id)
                    
                    item.children = _select
                }
                return item
            })
            this.list = list
        },
        selectImg(){
            if (this.token) {
                this.$Upload().then((res)=>{
                    if (res != false) {
                        if (this.createForm.fileList.length <= 4) {
                            this.createForm.fileList.push(res)
                        }else{
                            this.$message.error(
                            "上传图片数量最多只能为5张",
                                3
                            )
                            return
                        }
                        
                        this.createForm.video = null
                        this.commentMetaOptions.imgVisible = true
                        this.commentMetaOptions.videoVisible = false 
                    }
                }).catch((err)=>{
                    this.createForm.fileList = []
                })
            }else{
                return
            }
            
        },
        selectVideo(){
             this.$Upload("Video").then((res)=>{
                if (res != false) {
                    this.createForm.fileList = []
                    this.createForm.video = res
                    this.commentMetaOptions.videoVisible = true
                    this.commentMetaOptions.imgVisible = false 
                }
            }).catch((err)=>{
                this.commentMetaOptions.videoVisible = false
              this.createForm.video = null
            })
        },
        selectEmoji(e){
            var elInput =document.getElementById("commentInput");
            var startPos = elInput.selectionStart;
            var endPos = elInput.selectionEnd;
            if(startPos ===undefined|| endPos ===undefined)return 
            var txt = this.createForm.content;
            var result = txt.substring(0, startPos) + e + txt.substring(endPos)    
            this.createForm.content = result;    
            elInput.focus();  
            this.$nextTick(() => {
                elInput.selectionStart = startPos + e.length;    
                elInput.selectionEnd = startPos + e.length;
            })
        },
        async postCreate(e){
            if (!this.token) {
                this.$message.error(
                    "请登录",
                    3
                )
                return
            }
            if (this.createForm.content.length < 7 ) {
                this.$message.error(
                    "请写点内容吧最少6个字",
                    3
                )
                return
            }
    
            let formData = {
                content:this.createForm.content,
                relatedId:this.relatedId,
                module: this.module,
                type:3,
                files:"",
                parentId:null,
                replyId:e,
                topId:this.createForm.topId,
            }
            if (this.createForm.fileList.length > 0 && this.createForm.video == null) {
                formData.files = JSON.stringify(this.createForm.fileList)
                formData.type = 1
            }
            if (this.repyBoxTmp.id) {
                formData.parentId = this.repyBoxTmp.id
            }
           
            try {
                const res = await this.$axios.post(api.postCommentCreate,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.$message.success(
                    res.message,
                    3
                )
                if (this.tmpList.length > 0) {
                    this.tmpList.unshift(res.data.info)
                }else{
                    this.tmpList.push(res.data.info)
                }
             
                this.restList(this.tmpList)
                this.repyBoxTmp.id = null
                this.createForm.fileList = []
                this.createForm.content = ""
                this.createForm.video = null
  
                this.commentMetaOptions.imgVisible =false
                this.commentMetaOptions.videoVisible =false
                if (!this.isView) {
                    this.$emit('upadteView')
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
        async postLike(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.tmpList = this.tmpList.map((i)=>{
                if (e.id == i.id) {
                    i.isLike = !i.isLike
                    if (i.isLike) {
                        i.likes =  i.likes + 1
                    } else {
                        i.likes =  i.likes - 1
                    }
                }
                return i
            })
            this.restList(this.tmpList)
            const query = {
                id:e.id
            }
            const res = await this.$axios.post(api.postCommentLike,query)
            if (res.code != 1) {
                 this.$message.error(
                    res.message,
                    3
                )
                this.tmpList = this.tmpList.map((i)=>{
                    if (e.id == i.id) {
                        i.isLike = !i.isLike
                        if (i.isLike) {
                            i.likes =  i.likes + 1
                        } else {
                            i.likes =  i.likes - 1
                        }
                    }
                    return i
                })
                this.restList(this.tmpList)
                return
            }
        },
        
        // ---------- 删除
        removeImg(i){
            this.createForm.fileList.splice(i,1)
            if (this.createForm.fileList.length == 0) {
                 this.commentMetaOptions.imgVisible = false
            }
        },
        removeVideo(){
            this.createForm.video = null
            this.commentMetaOptions.videoVisible = false 
        },
        repy(e,topId){
            if (!this.token) {
                this.$message.error(
                    "请登录",
                    3
                )
                return
            }
            this.createForm.topId = topId
            this.repyBoxTmp.id = e.id
        },
        removeRepy(){
            if (!this.token) {
                this.$message.error(
                    "请登录",
                    3
                )
                return
            }
            this.createForm.topId = 0
            this.repyBoxTmp.id = null
        },
        report(e){
            this.$Report(e.id,"comment")
        },
        remove(e){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.$confirm({
                okText:"确定",
                cancelText:"取消",
                title: '正在删除',
                content: '请注意，您现在正在删除',
                onOk:() => {
                    const formData = {
                        id:e.id,
                    }
                    this.postDelete(formData)
                    return false;
                },
                onCancel() {},
            });
        },
        async postDelete(formData){
            try {
                const res = await this.$axios.post(api.postCommentRemove,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                // this.getData()
                this.tmpList = this.tmpList.filter((i)=>{
                    return i.id != formData.id
                })
                this.restList(this.tmpList)
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
    },
}
</script>


<style lang="less" scoped>
.comment-info{
    background: white;
    h2{
        font-size: 14px;
    }

}

.comment-info-box{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .comment-create-box{
        flex: 1;
        padding: 10px;
        border-radius: 4px;
        background: #f0f0f0;
        /deep/ .ant-input{
            border: 0;
            box-shadow: none;
        }
        .comment-tools{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tools{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .cooment-create-footer-l{
                    display: flex;
                    align-items: center;
                    .cooment-create-footer-l-item{
                        font-size: 20px;
                        font-weight: 600;
                        margin-right: 20px;
                        cursor: pointer;
                        user-select: none;
                        .cooment-create-footer-l-item-at{
                            font-size: 22px;
                            text-align: center;
                        }
                    }
                }
                .cooment-create-meta-box{
                    .feed-create-meta{
                        border: 1px dashed #dfdfdf;
                        padding: 5px;
                        margin-bottom: 10px;
                        p{
                            font-size: 12px;
                            padding: 5px;
                            display: flex;
                            align-items: center;
                            line-height: 1;
                        }
                        
                    }
                    .img{
                    
                        ul{
                            display: flex;
                            flex-flow: wrap;
                            li{
                                width: 16.6666666%;
                                padding: 5px;
                                position: relative;
                                div{
                                    height: 0;
                                    padding-top: 100%;
                                    position: relative;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 12px;
                                    cursor: move;
                                    img{
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 100%;
                                        height: 100%;
                                        box-shadow: inset 0 0 1px rgb(137, 137, 137);
                                        border-radius: 2px;
                                    }
                                    .group-img-close{
                                        position: absolute;
                                        right: 0;
                                        top: 9px;
                                        width: 14px;
                                        display: block;
                                        background: rgba(255, 255, 255, 0.88);
                                        text-align: center;
                                        height: 14px;
                                        border-radius: 100%;
                                        cursor: pointer;
                                        line-height: 14px;
                                        text-align: center;
                                        margin-right: 10px;
                                        font-size: 12px;
                                    }
                                }
                                
                            }
                        }
                    }
                    .video{
                        padding: 5px;
                        ul{
                            display: flex;
                            flex-flow: wrap;
                            li{
                                width: 33.33333%;
                                padding: 5px;
                                position: relative;
                                div{
                                    height: 0;
                                    padding-top: 56%;
                                    position: relative;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 12px;
                                    cursor: move;
                                    video{
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 100%;
                                        height: 100%;
                                        box-shadow: inset 0 0 1px rgb(137, 137, 137);
                                        border-radius: 2px;
                                    }
                                    .group-img-close{
                                        position: absolute;
                                        right: 0;
                                        top: 9px;
                                        width: 14px;
                                        display: block;
                                        background: rgba(255, 255, 255, 0.88);
                                        text-align: center;
                                        height: 14px;
                                        border-radius: 100%;
                                        cursor: pointer;
                                        line-height: 14px;
                                        text-align: center;
                                        margin-right: 10px;
                                        font-size: 12px;
                                    }
                                }
                                
                            }
                        }
                    }
                }
                // opacity: 0.5;
                // font-size: 22px;
            }
            .create-post{
                display: flex;
                .remove-repy{
                    margin-right: 10px;
                }
            }
        }
    }
}

.comment-list{
    background: white;
    .comment-li{
        border-bottom: 1px solid #f5f6f7;
        display: flex;
        padding: 10px 0;
        .item-right{
            margin-left: 10px;
            flex: 1;
            .nick-name-lv{
                display: flex;
                align-items: center;
                .nick-name{
                    h2{
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
                .lv{
                    text-transform: capitalize;
                    font-size: 12px;
                    text-shadow: 0 1px #b4b4b4;
                    padding: 0 4px;
                    color: #fff;
                    margin-left: 4px;
                    background: #e1e1e1;
                    border-radius: 2px;
                    margin: 0 5px;
                }
                .date{
                    color: #8590a6;
                    font-size: 12px;
                }
            }
            .content{
                line-height: 20px;
                margin: 10px 0;
                font-size: 16px;
                color: #0b0b37;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                word-break: break-all;
            }
            .tools{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .report{ margin-right: 10px;
                    cursor: pointer;
                    user-select: none;
                    color: #8590a6;
                    font-size: 12px;
                }
                .reply-like{
                    display: flex;
                    .reply{
                        padding: 4px 10px;
                        cursor: pointer;
                        user-select: none;
                    }
                    // .adoption{
                    //     padding: 4px 10px;
                    //     cursor: pointer;
                    //     user-select: none;
                    // }
                    .like{
                        padding: 4px 10px;
                        cursor: pointer;
                        user-select: none;
                    }
                    .icon{
                        font-size: 16px;
                    }
                    .count{
                        font-size: 12px;
                    }
                }
            }
            .reply-list{
                margin-top: 10px;
                padding: 10px;
                background: #f5f6f7;
                .reply-item{
                    .reply-top{
                        display: flex;
                        align-items: center;
                        .nick-name{
                            h2{
                                font-size: 13px;
                            }
                            
                        }
                        .reply-name{
                            h2{
                                color: #8590a6;
                                font-size: 13px;
                            }
                        }
                        .icon{
                            font-size: 12px;
                            color: #8590a6;
                            margin: 0 5px;
                        }
                        .date{
                            margin-left: 10px;
                            color: #8590a6;
                            font-size: 12px;
                        }
                    }
                    .reply-content{
                        line-height: 20px;
                        margin: 10px 0;
                        font-size: 16px;
                        color: #0b0b37;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                        word-break: break-all;
                    }
                }
            }
            .reply-more{
                user-select: none;
                margin-top: 10px;
                color: #3860f4!important;
                font-weight: 400;
                font-size: 13px;
                cursor: pointer;
            }
        }
    }
    .comment-list-nomore{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
    }
}
.empty{
    margin: 10px 0;
}
</style>

<style lang="less">
.ant-popover-inner-content{
    .emoji-box{
        display: flex;
        align-items: center;
        justify-items: center;
        z-index: 3;
        flex-flow: wrap;
        width: 230px;
        button{
            width: 14.2857%;
            height: 33px;
            background: #f5f5f5;
            border: 1px solid #fff;
            font-size: 19px;
            line-height: 33px;
            padding: 0;
            outline: none;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            font-family: font-regular,'Helvetica Neue',sans-serif;
            // border: 1px solid #ccc;
            box-sizing: border-box;
        }
    }
}
</style>