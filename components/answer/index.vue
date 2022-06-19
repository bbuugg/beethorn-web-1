<template>
    <div>
        <div class="answer-info">
            <div class="answer-info-box">
                <div class="answer-create-box">
                    <a-textarea 
                        v-model="createForm.content"
                        id="answerInput" 
                        placeholder="请输入答案" 
                        auto-size :allowClear="true"/>
                    <div class="answer-tools">
                        <div class="tools">
                            <ul class="answer-create-footer-l">
                                <li class="answer-create-footer-l-item">
                                    <a-popover trigger="click"  placement="bottom">
                                        <template slot="content">
                                            <div class="emoji-box">
                                                <button v-for="(item,index) in emoji" @click="selectEmoji(item)"  :key="index">
                                                    {{item}}
                                                </button>
                                            </div>
                                        </template>
                                        <a-icon type="smile"/>
                                        <span>表情</span>
                                    </a-popover>
                                </li>
                                <!-- <li class="answer-create-footer-l-item">
                                    <a-icon type="code" />
                                    <span>文件</span>
                                </li>
                                <li class="answer-create-footer-l-item">
                                    <a-icon type="money-collect" />
                                    <span>费用</span>
                                </li> -->
                            </ul>
                            <div class="answer-create-meta-box">
                                <div v-if="answerMetaOptions.imgVisible" class="feed-create-meta img">
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
                            </div>
                        </div>
                        <div class="create-post">
                            <a-button @click="postCreate" type="primary">
                                发布
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul v-if="!loading" class="answer-list">
            <li class="answer-li" v-for="(item,index) in list" :key="index">
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
                        <span v-if="item.isAdoption" class="adoption">已采纳</span>
                        <!-- <span v-if="!item.isAdoption" class="adoption">未采纳</span> -->
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
                            <div v-if="!item.isAdoption && authorId == userInfo.userId" @click="adoption(item.id,index)" class="reply">
                                <a-icon class="icon" type="check" />
                                <span class="count">
                                    采纳
                                </span>
                            </div>
                            <div @click="postLike(item)" class="like">
                                <a-icon :theme="item.isLike ? 'filled' : 'outlined'" type="like" />
                                <span class="count">
                                    {{item.isLike ? '已赞' : '赞'}} {{item.likes == 0 ? "" : item.likes}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!-- <li @click="viewInfo" v-if="list.length > 4" class="more">
                查看更多答案
            </li> -->
            <div v-if="list.length > 0" class="answer-list-nomore">
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
                <span slot="description"> 还没人回答问题呢，你要不要来说一句 </span>
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
        topicId: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        },
        authorId: {
            type: Number, //指定传入的类型
            default: 0 //这样可以指定默认的值
        }
    },
    components:{
        Avatar,
    },
    computed:{
        ...mapState("user",["token","userInfo"]),
    },
    data(){
        return{
            locale: zhCN,
            
            createForm:{
                content: "",
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
            answerMetaOptions:{
                imgVisible:false,
                videoVisible:false,
            },

            queryParam: {
                page: 1,
                limit: 5,
                topicId:null,
            },
            loading:false,
            total:0,
            list:[],
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            this.loading = true
            this.queryParam.topicId = this.topicId   
            const res = await this.$axios.get(api.getAnswerList,{params: this.queryParam})
           
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.total = res.data.total
            this.list = res.data.list != null ? res.data.list : []
            this.loading = false
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        openDoc(){

        },
        selectEmoji(e){
            var elInput =document.getElementById("answerInput");
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
        async postCreate(){
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
                // files:"",
                topicId:this.topicId,
            }
            try {
                const res = await this.$axios.post(api.postAnswerCreate,formData)
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
                this.list = [res.data.info,...this.list]
                this.createForm.content = ""
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
        async postLike(id){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            this.info.isLike = !this.info.isLike
            if (this.info.isLike) {
                this.info.likes =  this.info.likes + 1
            } else {
                this.info.likes =  this.info.likes - 1
            }
            const query = {
                id:id
            }
            const res = await this.$axios.post(api.postAnswerLike,query)
            if (res.code != 1) {
                 this.$message.error(
                    res.message,
                    3
                )
                if (this.info.id == id) {
                    this.info.isLike = !this.info.isLike
                    if (this.info.isLike) {
                        this.info.likes =  this.info.likes + 1
                    } else {
                        this.info.likes =  this.info.likes - 1
                    }
                }
                return
            }
        },
        async adoption(e,index){
            if (this.token == null) {
                this.$Auth("login","登录","快速登录")
                return
            }
            
            if (this.list[index].isAdoption) {
                this.$message.error(
                    "回答已采纳了",
                    3
                )
                return
            }
            this.list[index].isAdoption = !this.list[index].isAdoption

            const query = {
                answerId:e,
                topicId:this.topicId,
            }
            const res = await this.$axios.post(api.postAnswerAdoption,query)
            if (res.code != 1) {
                this.list[index].isAdoption = !this.list[index].isAdoption
                return
            }
        },
        viewInfo(){
            this.$router.push(`/feed/${this.topicId}`)
        },
        // ---------- 删除
        report(e){
            this.$Report(e.id,"answer")
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
                const res = await this.$axios.post(api.postAnswerRemove,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                // this.getData()
                this.list = this.list.filter((i)=>{
                    return i.id != formData.id
                })
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
.answer-info{
    background: white;
    h2{
        font-size: 14px;
    }

}

.answer-info-box{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .answer-create-box{
        flex: 1;
        padding: 10px;
        border-radius: 4px;
        
        /deep/ .ant-input{
            border: 0;
            box-shadow: none;
            background: #f0f0f0;
        }
        .answer-tools{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tools{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .answer-create-footer-l{
                    display: flex;
                    align-items: center;
                    .answer-create-footer-l-item{
                        display: flex;
                        align-items: center;
                        font-size: 20px;
                        font-weight: 600;
                        margin-right: 20px;
                        cursor: pointer;
                        user-select: none;
                        span{
                            margin-left: 5px;
                            font-size: 16px;
                        }
                    }
                }
                .answer-create-meta-box{
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

.answer-list{
    background: white;
    .answer-li{
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
                .adoption{
                    margin-left: 5px;
                    border-top-left-radius: 13px;
                    border-bottom-right-radius: 13px;
                    color: white;
                    font-size: 12px;
                    padding: 3px 8px;
                    background: linear-gradient(140deg, #039ab3 10%, #58dbcf 90%);
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
                .report{
                    margin-right: 10px;
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
    
    .more{
        cursor: pointer;
        user-select: none;
        margin-top: 10px;
        font-size: 13px;
        color: #1e80ff;
    }
    .answer-list-nomore{
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