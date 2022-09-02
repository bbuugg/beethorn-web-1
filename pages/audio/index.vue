<template>
    <div class="container">
        <div class="warper" :style="{ width: design.width + 'px' }">
            <div class="swipe">
                <swiper  class="swiper-container" 
                :style="{ height:  `180px` }" ref="widgetCarouselOne" 
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
                            <div class="info-cover">
                                <img :src="info.cover">
                            </div>
                        </div>
                    </swiper-slide>
                    
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
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
                            <div class="audio-info">
                                <div class="cover" :style="{backgroundImage:`url(${info.cover})`}">
                                    <div class="play">
                                        <a-icon type="play-circle" />
                                    </div>
                                </div>
                                <div class="info">
                                    <h2>音频标题</h2>
                                    <p>作者名称</p>
                                </div>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>

            <div class="cate-list-box">
                <div class="text-box">
                    <div class="text">
                        电子音乐
                    </div>
                    <div class="cate-list">
                        <div class="item">
                            Trap
                        </div>
                        <div class="item">
                            BigRoom
                        </div>
                        <div class="item">
                            Dubstep
                        </div>
                        <div class="item">
                            house
                        </div>
                    </div>
                </div>
                
                 <a-row :gutter="[15,20]">
                    <a-col :span="12">
                        <div class="list">
                            <div class="item">
                                <div class="frist">
                                    1
                                </div>
                                <div class="second">
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        Corazón Serrano - Hasta La Raíz
                                    </div>
                                </div>
                                <div class="third">asd</div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="list">
                            <div class="item">
                                <div class="frist">
                                    1
                                </div>
                                <div class="second">
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        Corazón Serrano - Hasta La Raíz
                                    </div>
                                </div>
                                <div class="third">asd</div>
                            </div>
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
                slidesPerView :2,
                spaceBetween : 20,
                on: {
                    click: function () {
                        // vm.goLink(this.realIndex)
                    },
                    slideChange: function () {
                        // vm.activeIndex = this.realIndex
                    }
                },
                pagination:false,
                // pagination: {
                //     // type: 'progressbar',
                //     el: '.swiper-pagination',
                //     dynamicBullets: false
                // },
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
    .warper{
        .swipe{
            .swiper-container{
                border-radius: 10px;
                // position: relative;
                width: 100%;
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
                        background-color: rgba(0, 0, 0, 0.6);
                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        backdrop-filter: blur(15px);
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
                       .info-cover{
                            width: 120px;
                            min-width: 120px;
                            height: 120px;
                            margin-left: 25px;
                            img{
                                width: 100%;
                                height: 100%;
                                box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
                                border-radius: 5px;
                            }
                       }
                    }
                }
                --swiper-pagination-color:  white;/* 两种都可以 */
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
            .audio-info{
                .cover{
                    overflow: visible;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-color: rgba(255, 255, 255, 0.07);
                    display: block;
                    position: relative;
                    overflow: hidden;
                    border-radius: 4px;
                    padding-top: 60%;
                    .play{
                        border-radius: 4px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.6);
                        color: #fff;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.2s ease;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 40px;
                        cursor: pointer;
                    }
                }   
                .cover:hover{
                    .play{
                        opacity: 1;
                        visibility: visible;
                    }
                }
                .cover::after{
                    content: '';
                    filter: blur(20px);
                    opacity: 0.9;
                    position: absolute;
                    height: 100%;
                    background-image: inherit;
                    background-size: cover;
                    z-index: -1;
                    transform: scale(0.75) translateY(38px) translateZ(-30px);
                    right: 15px;
                    left: 15px;
                    bottom: 33px;
                    top: -10px;
                }

                .info{
                    padding: 13px 0px;
                    h2{
                        font-size: 18px;
                        font-weight: 600;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p{
                        margin-top: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
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
            .list{
                margin-top: 30px;
                .item{
                    display: flex;
                    align-items: center;
                    .frist{
                        font-size: 26px;
                        font-weight: 600;
                        font-family: "beethorn-zc";
                        width: 68px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 20px;
                    }
                    .second{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        .cover{
                            width: 50px;
                            height: 50px;
                            border-radius: 8px;
                            img{
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 8px;
                            }
                        }
                        .title{
                            margin-left: 20px;
                            font-size:18px;
                            font-weight: 600;
                        }
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
