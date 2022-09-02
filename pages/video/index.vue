<template>
    <div class="container">
        <div class="warper" :style="{ width: design.width + 'px' }">
            <div class="top">
                <div class="top-l">
                    <div class="categroy-list">
                        <a-row :gutter="[15,20]">
                            <a-col :span="6">
                                <div class="item">
                                    <h2>分类标题</h2>
                                    <p>分类描述</p>
                                    <div class="bt">
                                        AI
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="item">
                                    <h2>分类标题</h2>
                                    <p>分类描述</p>
                                    <div class="bt">
                                        AI
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="item">
                                    <h2>分类标题</h2>
                                    <p>分类描述</p>
                                    <div class="bt">
                                        AI
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="item">
                                    <h2>分类标题</h2>
                                    <p>分类描述</p>
                                    <div class="bt">
                                        AI
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                    <div class="hot">
                        <img src="/img/xxxx1.jpg" alt="" srcset="">
                        <div class="info">
                            <div class="title">
                                视频名称视频名称视频名称视频名称视频名称视频名称视频名称视频名称视频名称视频名称视频名称视频名称
                            </div>
                            <div class="view-btn">
                                <span>
                                    观看视频
                                </span>
                            </div>
                            <div class="user">
                                <Avatar 
                                    class="user-avatar"
                                    :margin="5"
                                    :verifyBottom="4"
                                    :verifySize="10"
                                    :isVerify="false"
                                    shape="circle" 
                                    src="/img/xxxx1.jpg" 
                                    :size="28"
                                /> 
                                <div class="nickName">
                                    用户名称
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-r">
                    
                </div>
            </div>
            <div class="recommend-box">
                <a-row :gutter="[15,20]">
                    <a-col :span="4">
                        <div class="item">
                            <div class="recommend-text">
                                热门推荐
                            </div>
                            <p class="recommend-desc">
                                高温预警，听音避暑
                            </p>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                </a-row>
            </div>

            <div class="cate-list-box">
                <div class="text-box">
                    <div class="text">
                        电子竞技
                    </div>
                    <div class="cate-list">
                        <div class="item">
                            Apex
                        </div>
                        <div class="item">
                            英雄联盟
                        </div>
                        <div class="item">
                            守望先锋
                        </div>
                        <div class="item">
                            全部
                        </div>
                    </div>
                </div>
                <a-row :gutter="[15,20]">
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                </a-row>
                <div class="more-box">
                    <div class="more-btn">
                        加载更多
                    </div>
                </div>
            </div>

            <div class="cate-list-box">
                <div class="text-box">
                    <div class="text">
                        电子竞技
                    </div>
                    <div class="cate-list">
                        <div class="item">
                            Apex
                        </div>
                        <div class="item">
                            英雄联盟
                        </div>
                        <div class="item">
                            守望先锋
                        </div>
                        <div class="item">
                            全部
                        </div>
                    </div>
                </div>
                <a-row :gutter="[15,20]">
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                </a-row>
                <div class="more-box">
                    <div class="more-btn">
                        加载更多
                    </div>
                </div>
            </div>


            <div class="cate-list-box">
                <div class="text-box">
                    <div class="text">
                        电子竞技
                    </div>
                    <div class="cate-list">
                        <div class="item">
                            Apex
                        </div>
                        <div class="item">
                            英雄联盟
                        </div>
                        <div class="item">
                            守望先锋
                        </div>
                        <div class="item">
                            全部
                        </div>
                    </div>
                </div>
                <a-row :gutter="[15,20]">
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                </a-row>
                <div class="more-box">
                    <div class="more-btn">
                        加载更多
                    </div>
                </div>
            </div>


            <div class="cate-list-box">
                <div class="text-box">
                    <div class="text">
                        电子竞技
                    </div>
                    <div class="cate-list">
                        <div class="item">
                            Apex
                        </div>
                        <div class="item">
                            英雄联盟
                        </div>
                        <div class="item">
                            守望先锋
                        </div>
                        <div class="item">
                            全部
                        </div>
                    </div>
                </div>
                <a-row :gutter="[15,20]">
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <div class="item">
                            <listTwo :info="info"/>
                        </div>
                    </a-col>
                </a-row>
                <div class="more-box">
                    <div class="more-btn">
                        加载更多
                    </div>
                </div>
            </div>

    

         </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"
import {MODULE} from "@/shared/module"
import listTwo from "@/components/list/listTwo"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
    components:{
       listTwo
    },
    head(){
        return this.$seo(`筛选-${this.base.title}`,`筛选`,[{
            hid:"beethorn",
            name:"description",
            content:`筛选`
        }])
    },
    computed:{
        ...mapState(["design"]),
        ...mapState("user",["token"]),
    },
    async asyncData({query,$axios,store}){
   
        const queryParam = {
            page:1,
            limit: 12,
        
            cateId: 0,
            tagId: 0,
   
            isDown: 0,
        }
        
        // const res = await $axios.get(api.getSystemFilter,{params:queryParam})
        
        // const cateList = await $axios.get(api.getSystemCate,{params:{module:queryParam.module}})
      
        // const tagRes = await $axios.get(api.getSystemHotTag)
 
        return {
            base:store.state.base,
            queryParam,
            // tagList:tagRes.data.list != null ? tagRes.data.list : [],
            // cateList:cateList.data.list != null ?cateList.data.list : [],
            // list: res.data.list != null ?res.data.list : [],
            // total:res.data.total != 0 ?res.data.total : 0,
        }
    },
    data(){
        return{
            info:{
                "cateInfo": {
                    "cateId": 12,
                    "parentId": 0,
                    "title": "系统教程"
                },
                "cover": "https://zaaap-1254235226.cos.ap-guangzhou.myqcloud.com/images/2022/08/04/b2a12a7557e27ac96292bd8ff2d0a168.jpg?imageMogr2/thumbnail/!50p",
                "createTime": "2022-05-19 19:15:54",
                "description": "测试有",
                "favorites": 3124,
                "hots": 12312,
                "id": 7,
                "likes": 1231,
                "module": "video",
                "status": 2,
                "title": "基于宝塔安装教程环境安装",
                "userInfo": {
                    "id": 1,
                    "nickName": "EForinaj",
                    "follows": 2,
                    "fans": 2,
                    "posts": 7,
                    "likes": 18,
                    "cover": "https://zaaap-1254235226.cos.ap-guangzhou.myqcloud.com/short_pic/2022/08/06/20211111_170454.jpg?imageMogr2/thumbnail/!50p",
                    "integral": 1250,
                    "avatar": "https://zaaap-1254235226.cos.ap-guangzhou.myqcloud.com/images/2022/08/05/f7866ac1d2a5b9603d678a1a6792efbe.jpg?imageMogr2/thumbnail/!50p",
                    "description": "干撒大发噶丹是asd123asd",
                    "sex": 1,
                    "isFollow": false,
                    "isVerify": true,
                    "grade": {
                        "title": "等级一",
                        "icon": "http://localhost:8199/public/uploads/2022-07-09/clb1f10c1a1krsnlgs.png"
                    },
                    "vip": null
                },
                "views": 23289
            },
            locale: zhCN,
        }
    },
    mounted(){
        // console.log(this.cateList)
        // console.log(this.list)
    },
    methods:{
        async getCate(){
            const res = await this.$axios.get(api.getSystemCate,{params:{module:this.queryParam.module}})
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.cateList = res.data.list != null ? res.data.list : []
        },
        async getData(){
            const res = await this.$axios.get(api.getSystemFilter,{params:this.queryParam})
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.list = res.data.list != null ? res.data.list : []
            this.total = res.data.total != 0 ? res.data.total : 0
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        changeCate(e){
            this.queryParam.cateId = e
            this.getData()
        },
        changeModule(e){
            this.queryParam.module = e
            this.queryParam.cateId = 0
            this.getCate()
            this.getData()
        },
        changeTag(e){
            this.queryParam.tagId = e
            this.getData()
        },
        changeMode(e){
            this.queryParam.mode = e
            this.getData()
        },
        changeIsDown(e){
            this.queryParam.isDown = e
            this.getData()
        }
    }
}
</script>


<style lang="less" scoped>
.container{
    margin: 80px 0;
    min-height: 550px;
    display: flex;
    justify-content: center;
    .warper{
        .top{
            display: flex;
            .top-l{
                flex: 1;
                margin-right: 20px;
                .categroy-list{
                    .item{
                        position: relative;
                        background-color: #676767;
                        padding: 20px;
                        border-radius: 3px;
                        color: white;
                        h2{
                            font-weight: 700;
                            font-size: 18px;
                            margin-bottom: 8px;
                            color: white;
                        }
                        p{
                            color: rgb(217, 217, 217);
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            font-size: 12px;
                        }
                        .bt{
                            position: absolute;
                            right: 40px;
                            top: 0;
                            padding: 15px 4px 15px 4px;
                            color: white;
                            // width: 80px;
                            background-color: #d5d5d5;
                        -webkit-clip-path: polygon(50% 0%,100% 0%,100% 100%,50% 80%,0% 100%,0% 0%);
                            clip-path: polygon(50% 0%,100% 0%,100% 100%,50% 80%,0% 100%,0% 0%);
                        }
                    }  
                }
                .hot{
                    margin-top: 10px;
                    height: 400px;
                    position: relative;
                    border-radius: 2px;
                    img{
                        border-radius: 2px;
                        width: 100%;
                        height: 100%;
                    }
                    .info{
                        border-radius: 2px;
                        z-index: 2;
                        position: absolute;
                        top:  0;
                        right: 0;
                        background-color: rgba(0, 0, 0, 0.768);
                        width: 260px;
                        height: 100%;
                        .title{
                            margin: 40px 20px;
                            font-size: 20px;
                            font-weight: 600;
                            color: white;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            line-height: 30px;
                        }
                        .view-btn{
                            span{
                                border-radius: 4px;
                                color: white;
                                font-size: 14px;
                                font-weight: 600;
                                margin: 20px;
                                padding: 10px 20px;
                                background-color: #004cf7;
                            }
                            
                        }
                        .user{
                            position: absolute;
                            bottom:  20px;
                            left: 20px;
                            display: flex;
                            align-items: center;
                            .nickName{
                                margin-right: 20px;
                                color: white;
                                font-size: 12px;
                                font-weight: 600;
                            }
                        }
                    }
                }
            }
            .top-r{
                width: 230px;
                background-color: #d8d8d8;
            }
        }
        .recommend-box{
            margin-top: 30px;
            .recommend-text{
                font-size: 24px;
                font-weight: 600;
                font-family: "beethorn-zc";
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .recommend-desc{
                margin-top: 10px;
                font-size: 18px;
                font-weight: 600;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-family: "beethorn-zc";
            }
        }
        .cate-list-box{
            margin-top: 30px;
            .text-box{
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .text{
                    font-size: 24px;
                    font-weight: 600;
                    font-family: "beethorn-zc";
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .cate-list{
                    display: flex;
                    .item{
                        user-select: none;
                        cursor: pointer;
                        display: inline-block;
                        padding: 10px 20px;
                        margin-left: 20px;
                        color: #8590A6;
                        font-weight: 600;
                        border-radius: 8px;
                        background-color: #f5f6f7;
                    }
                    .item:hover{
                        color: white;
                        background-color: #f89c40;
                    }
                }
                
            }
            .more-box{
                margin-top: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                .more-btn{
                    user-select: none;
                    cursor: pointer;
                    display: inline-block;
                    padding: 10px 20px;
                    margin-left: 20px;
                    color: #8590A6;
                    font-weight: 600;
                    border-radius: 8px;
                    background-color: #f5f6f7;
                }
            }
        }
        
    }
}
</style>
