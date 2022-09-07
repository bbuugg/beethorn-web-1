<template>
    <div class="container">
        <div class="warper" :style="{ width: design.width + 'px' }">
            <div class="swipe-box">
                <a-row :gutter="20">
                    <a-col class="left" :span="18">
                        <swiper  class="swiper-container" 
                        :style="{ height:  `300px` }" ref="widgetCarouselOne" 
                        :options="swiperOption"   >
                            <swiper-slide class="swiper-item">
                                <img class="swiper-cover" :src="info.cover">
                                <div class="swiper-info">
                                    <div class="title">
                                        <h2>
                                        音频标题 
                                        </h2>
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
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </a-col>
                    <a-col class="right" :span="6">
                        <div class="right-info">
                            <img class="cover" :src="info.cover">
                            <div class="info">
                                <div class="title">
                                    <h2>
                                    音频标题 
                                    </h2>
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
                        <div class="sizedbox"></div>
                        <div class="right-info">
                            <img class="cover" :src="info.cover">
                            <div class="info">
                                <div class="title">
                                    <h2>
                                    音频标题 
                                    </h2>
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
                    </a-col>
                </a-row>
                <div class="lanmu">
                    <div class="lm-top">
                        <div class="item">
                            <div class="icon">
                                <img src="/svg/edu/lm1.svg">
                            </div>
                            <div class="text-box">
                                <div class="title-box">
                                    <span class="title">教培圈子</span>
                                    <span class="go" style="background-color: #ff6000;">go</span>
                                </div>
                                <div class="desc">
                                    音乐老师交流圈
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <img src="/svg/edu/lm2.svg">
                            </div>
                            <div class="text-box">
                                <div class="title-box">
                                    <span class="title">教培圈子</span>
                                    <span class="go" style="background-color: #ff6000;">go</span>
                                </div>
                                <div class="desc">
                                    音乐老师交流圈
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <img src="/svg/edu/lm3.svg">
                            </div>
                            <div class="text-box">
                                <div class="title-box">
                                    <span class="title">教培圈子</span>
                                    <span class="go" style="background-color: #ff6000;">go</span>
                                </div>
                                <div class="desc">
                                    音乐老师交流圈
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <img src="/svg/edu/lm4.svg">
                            </div>
                            <div class="text-box">
                                <div class="title-box">
                                    <span class="title">教培圈子</span>
                                    <span class="go" style="background-color: #ff6000;">go</span>
                                </div>
                                <div class="desc">
                                    音乐老师交流圈
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon">
                                <img src="/svg/edu/lm5.svg">
                            </div>
                            <div class="text-box">
                                <div class="title-box">
                                    <span class="title">教培圈子</span>
                                    <span class="go" style="background-color: #ff6000;">go</span>
                                </div>
                                <div class="desc">
                                    音乐老师交流圈
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lm-block">
                        <a-row :gutter="16"> 
                            <a-col :span="4">
                                <div class="item">
                                    <div class="tag">
                                        推荐
                                    </div>
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="item">
                                    <div class="tag">
                                        推荐
                                    </div>
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="item">
                                    <div class="tag">
                                        推荐
                                    </div>
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="item">
                                    <div class="tag">
                                        推荐
                                    </div>
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="item">
                                    <div class="tag">
                                        推荐
                                    </div>
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="item">
                                    <div class="tag">
                                        推荐
                                    </div>
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
var vm  =null
export default {
    components:{
        Swiper,
        SwiperSlide,
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
            swiperOption: {
                
                //循环
                loop:true,
                //每张播放时长3秒，自动播放
                autoplay:true,
                //滑动速度
                speed:1000,
                // grabCursor:true,
                preventClicksPropagation : false,
                // delay:1000
                // slidesPerView :2,
                spaceBetween : 20,
                on: {
                    click: function () {
                        // vm.goLink(this.realIndex)
                    },
                    slideChange: function () {
                        // vm.activeIndex = this.realIndex
                    }
                },
                pagination: {
                    // type: 'progressbar',
                    el: '.swiper-pagination',
                    dynamicBullets: false
                },
            },
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
        vm = this
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
   
    .swipe-box{
        .left{
            .swiper-container{
                border-radius: 10px;
                .swiper-item{
                    cursor: pointer;
                    height: 100%;
                    width: 100%;
                    position: relative;
                    border-radius: 10px;
                    img{
                        border-radius: 10px;
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }
                    .swiper-info{
                        border-radius: 10px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        padding: 25px;
                        .title{
                            h2{
                                font-weight: 100;
                                margin: 0;
                                color: white;
                                font-size: 33px;
                            }
                            .user{
                                display: flex;
                                align-items: center;
                                margin-top: 20px;
                                .nickName{
                                    color: white;
                                }
                            }
                        }
                    }
                }
                --swiper-pagination-color:  white;/* 两种都可以 */
            }
        }
        .right{
            .right-info{
                height: 140px;
                width: 100%;
                position: relative;
                img{
                    border-radius: 10px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
                .info{
                    border-radius: 10px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    padding: 25px;
                    .title{
                        h2{
                            font-weight: 100;
                            margin: 0;
                            color: white;
                            font-size: 18px;
                        }
                        .user{
                            display: flex;
                            align-items: center;
                            margin-top: 10px;
                            .nickName{
                                color: white;
                            }
                        }
                    }
                }
            }
            .sizedbox{
                height: 20px;
            }
        }
        .lanmu{
            margin-top: 10px;
            .lm-top{
                display: flex;
                justify-content: space-between;
                .item{
                    display: flex;
                    align-items: center;
                    .icon{
                        width: 62px;
                        height: 62px;
                        margin-right: 12px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .text-box{
                        .title-box{
                            .title{
                                font-size: 18px;
                                font-weight: 600;
                                font-family: "beethorn-zc";
                            }
                            .go{
                                border-radius: 4px;
                                color: #ffffff;
                                font-size: 13px;
                                font-weight: normal;
                                padding: 2px 5px;
                                position: absolute;
                                line-height: 15px;
                                margin-left: 5px;
                                cursor: pointer;
                                text-transform: uppercase;
                                vertical-align: middle;
                            }
                        }
                        .desc{
                            margin-top: 5px;
                            font-size: 14px;
                            color: #8e8e8e;
                        }
                    } 
                }
            }
            .lm-block{
                margin-top: 20px;
                .item{
                    position: relative;
                  
                    cursor: pointer;
                    border-radius: 4px;
                    overflow: hidden;
                    .cover{
                        border-radius: 4px;
                        overflow: hidden;
                        img{
                            object-fit: cover;
                            border-radius: 4px;
                            width: 100%;
                            height: 120px;
                            transition: transform 0.2s ease-out;
                        }
                    }
                    .title{
                        width: 185px;
                        font-size: 14px;
                        color: #555555;
                        line-height: 20px;
                        letter-spacing: 0.5px;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-top: 10px;
                    }
                    .tag{
                        background-color: #ff2a8e;
                        position: absolute;          
                        top: 5px;
                        right: -60px;
                        z-index: 1;
                        width: 150px;
                        height: 22px;
                        color: #fff;
                        line-height: 25px;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                        text-align: center;
                        font-size: 12px;
                    }
                }
                .item:hover{
                    .cover{
                        img{
                            transform: scale(1.2);
                        }
                    }
                    .title{
                        color: #E98469;
                    }
                }
            }
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
</style>
