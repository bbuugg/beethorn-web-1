<template>
  <div class="sidear-box">
        <h2>最新评论</h2>
        <div class="list">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="comment-user">
                        <a-space>
                            <nuxt-link :to="`/profile/${item.userInfo.id}`">
                                <Avatar 
                                    :margin="-5"
                                    :verifyRight="-2"
                                    :verifyBottom="2"
                                    :verifySize="10"
                                    :isVerify="true"
                                    shape="circle" 
                                    :src="item.userInfo.avatar+'@w60_h60'" 
                                    :size="28"
                                />
                            </nuxt-link>
                            <nuxt-link :to="`/profile/${item.userInfo.id}`">
                                <span class="nickName">{{item.userInfo.nickName}}</span>
                            </nuxt-link>
                        </a-space>
                        <span class="date">{{item.createTime |resetData}}</span>
                    </div>
                    <div class="comment-info">
                        <p>{{item.content}}</p>
                    </div>
                    <div class="commnet-related">
                        <span class="ly">来自: </span>
                        <nuxt-link class="title" :to="`/${item.module == 'edu' ? 'course' : item.module}/${item.relatedId}`">
                            {{item.relatedTitle}}
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import Avatar from "@/components/avatar/avatar"
export default {
    props:{ 
        module: {
            type: String, //指定传入的类型
            default: "" //这样可以指定默认的值
        },
    },
    components:{
        Avatar,
    },
    data(){
        return{
            queryParam:{
                page:1,
                limit: 5,
                module:this.module,
                isNoChildren:true,
            },
            list:[],
        }
    },
    watch:{
        module:function(newValue){
            this.queryParam.module=newValue	
            this.getData()
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
        async getData(){
            const res = await this.$axios.get(api.getCommentList,{params:this.queryParam})
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list != null ? res.data.list : []
        },
        // goArticle(e){
        //    this.$router.push({ path: `/article/${e}`})
        // }
    }
}
</script>

<style lang="less" scoped>
.sidear-box{
    background: white;
    margin-bottom: 10px;
    h2{
        font-size: 16px;
        padding: 10px 16px 8px;
        font-weight: 600;
        line-height: 1;
    }
    .list{
        padding: 5px 16px 8px;
        .comment-user{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .nickName{
                font-size: 12px;
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 111px;
                color: #99a2aa;
            }
            .date{
                color: #bcbcbc;
                font-size: 12px;
            }
        }
        .comment-info{
            padding: 10px;
            position: relative;
            margin: 10px 0;
            background-color: #f8f8f8;
            p{
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }
        .commnet-related{
            color: #bcbcbc;
            font-size: 13px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .ly{
                color: #bcbcbc;
                margin-right: 5px;
            }
            .title{
                flex: 1;
                color: #bcbcbc;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden; 
            }
        }
    }
}
</style>