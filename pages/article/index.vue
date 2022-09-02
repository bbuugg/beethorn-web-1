<template>
    <div class="page">
        <div class="warper" :style="{ width: design.width + 'px' }">
            <a-row :gutter="20">
                <a-col class="left" :span="18">
                    <div class="swipe">
                        <swiper  class="swiper-container" 
                        :style="{ height:  `260px` }" ref="widgetCarouselOne" 
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
                    </div>
                    <div class="vk">
                        <a-row :gutter="16"> 
                            <a-col class="gutter-row" :span="6">
                                <div class="vk-box">
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col class="gutter-row" :span="6">
                                <div class="vk-box">
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col class="gutter-row" :span="6">
                                <div class="vk-box">
                                    <div class="cover">
                                        <img :src="info.cover" alt="">
                                    </div>
                                    <div class="title">
                                        文章标题手动阀手动阀手动阀撒旦飞洒地方
                                    </div>
                                </div>
                            </a-col>
                            <a-col class="gutter-row" :span="6">
                                <div class="vk-box">
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
                    <div class="hot-box">
                        <div class="text-select">
                            <div class="text">
                                热门推荐
                            </div>
                            <div class="more">
                                查看更多
                            </div>
                        </div>
                    </div>
                    <ul class="list">
                        <li>
                            <ListOne  :info="info"/>
                        </li>
                    </ul>
                </a-col>
                <a-col class="right" :span="6">
                    <div class="r-top">
                        <div class="text">
                            <i></i>
                            <p>热门文章</p>
                        </div>
                        <ul class="hot-list">
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                            <li class="item">
                                <i></i>
                                <span class="title">RTX 4060、4060 Ti性能首曝</span>
                                <span class="date">08.30</span>
                            </li>
                        </ul>
                    </div>
                    <SidbarAdv />
                    <SidebarComment module="article"/>
                </a-col>
            </a-row>
        </div>
    </div>
</template>



<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapState } from "vuex"
import api from "@/api/index"
import {MODE} from "@/shared/mode"
import {MODULE} from "@/shared/module"
import SidebarComment from "@/components/sidebar/sidebarComment"
import ListOne from "@/components/list/listOne"
import SidbarAdv from "@/components/sidebar/sidbarAdv"

export default {
    head(){
        return this.$seo(`文章列表-${this.base.title}`,`${this.base.childTitle}`,[{
            hid:"beethorn-desc",
            name:"description",
            content:`${this.base.description}`
        }])
    },
    components:{
        Swiper,
        SwiperSlide,
        ListOne,
        SidbarAdv,
        SidebarComment
    },
    computed:{
        ...mapState(["design"]),
        ...mapState(["emojiList"]),
        ...mapState("user",["token","userInfo"]),
    },
    async asyncData({store}){
        return{
            base:store.state.base,
     
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

        // this.loading = true
        // this.getList()
        // this.loading = false
       
        // window.addEventListener('scroll', this.scrollList)
    },
    destroyed () {
        // 离开页面取消监听
        window.removeEventListener('scroll', this.scrollList, false)
    },
    methods: {  
        scrollList(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

            //滚动条到底部的条件
            if (scrollTop+windowHeight > scrollHeight-50 && !this.noMore) {
                this.queryParam.page += 1
                this.getList()
                return
            }

        },
        async getList(){
         
            const res = await this.$axios.get(api.getSystemFilter,{params: this.queryParam}) 
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
        
            res.data.list = res.data.list == null ? [] :res.data.list.map((item)=>{
                if (this.queryParam.module == MODULE.TOPIC) {
                    if (item.type == 1 && item.images != "") {
                        item.images = JSON.parse(item.images)
                    }
                }

                // 重制表情标题内容
                let num = item.content.match(/:{.*?}/g)
                
                if (num != null) {
                    let emojiTmp = num.map((i)=>{
                        return this.emojiList.filter((v)=>{
                            return i == v.alias
                        })
                    })
                    
                    emojiTmp.forEach(element => {
                       
                        item.content = item.content.replace(element[0].alias,`<img class="emoji-p" src="${element[0].link}"/>`)
                        // console.log(element)
                    });
                }
                
                
                return item
            })
           
            this.noMore = res.data.list.length > 0 ? false : true
            this.list = [...this.list,...res.data.list]
            this.total = res.data.total != null ? res.data.total : 0
         
           
        },

        // 获取置顶列表
        async getTopList(){
            const res = await this.$axios.get(api.getTopicTop) 
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.topList = res.data.list != null ? res.data.list : []
        },

        // 获取我的圈子以及热门圈子
        async getGroup(){
            const hotQueryParam = {
                page:1,
                limit: 7,
                module: MODULE.GROUP,
                mode: MODE.HOT,
            }
            const hotGroupRes = await this.$axios.get(api.getSystemFilter,{params: hotQueryParam}) 
            if (hotGroupRes.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.hotGroupList = hotGroupRes.data.list != null ? hotGroupRes.data.list : []

            if (this.token != null) {
                const myGroupRes = await this.$axios.get(api.getAccountGroup) 
                if (myGroupRes.code != 1) {
                    this.$router.push(`/404`)
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
        
                this.myGroupList = myGroupRes.data.list != null ? myGroupRes.data.list : []
            }

        },

        // 投稿重新获取
        resetList(){
            this.loading = true
            this.list = []
            this.total = 0
            this.queryParam.page = 1
            this.getList()
            this.loading = false
        },

        // 修改菜单
        changeMenu(e){
            this.loading = true
            this.queryParam.groupId = 0
            this.queryParam.mode = e
            this.list = []
            this.total = 0
            this.queryParam.page = 1
            this.getList()
            this.loading = false
        },
        // 修改小组
        changeMyGroup(e){
            this.loading = true
            
            this.queryParam.mode = MODE.NEW
            this.list = []
            this.queryParam.isJoin = true
            this.queryParam.groupId = e
            this.total = 0
            this.queryParam.page = 1
    
            this.getList()
            this.loading = false
        },
        // 修改小组
        // changeHotGroup(e){
        //     this.queryParam.mode = MODE.NEW
     
        //     this.list = []
        //     this.queryParam.groupId = e
        //     this.total = 0
        //     this.queryParam.page = 1
        //     this.getList()
        // },
        
    },

}
</script>

<style lang="less" scoped>
.page{
    margin: 80px 0;
    min-height: 550px;
    display: flex;
    justify-content: center;
    .left{
        .swipe{
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
        .vk{
            margin-top: 20px;
            margin-bottom: 20px;
            .vk-box{
                cursor: pointer;
                border-radius: 4px;
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
            }
            .vk-box:hover{
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
        .hot-box{
            border-radius: 4px;
            margin-bottom: 20px;
            border-top: 1px solid #f3f3f3;
            .text-select{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .text{
                    padding: 10px;
                    font-size: 24px;
                    font-weight: 600;
                    font-family: "beethorn-zc";
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    border-top: 2px solid #8fb3ff;
                }
                .select{
                    user-select: none;
                    cursor: pointer;
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
    .right{
        .r-top{
            width: 100%;
            height: 260px;
            padding: 10px 10px 0 10px;
            background: #F8FBFF;
            border-radius: 12px;
            box-sizing: border-box;
            margin-bottom: 20px;
            .text{
                margin-bottom: 10px;
                p{
                    color: #555555;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 22px;
                    font-family: "beethorn-zc";
                }
            }
            .hot-list{
                .item{
                    line-height: 0;
                    margin-bottom: 14px;
                    display: flex;
                    align-items: center;
                    i{
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        vertical-align: middle;
                        background-color: #C5DBFF;
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                    .title{
                        display: inline-block;
                        width: 190px;
                        height: 17px;
                        font-size: 12px;
                        color: #555555;
                        text-align: left;
                        line-height: 17px;
                        overflow: hidden;
                    }
                    .date{
                        float: right;
                        width: 110px;
                        font-size: 12px;
                        color: #D6D6D6;
                        line-height: 17px;
                        text-align: right;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
        .r-bottom{
            width: 100%;
            height: 152px;
            padding: 10px 10px 0 10px;
            background: #F8FBFF;
            border-radius: 12px;
            box-sizing: border-box;
            .text{
                margin-bottom: 10px;
                p{
                    color: #555555;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 22px;
                    font-family: "beethorn-zc";
                }
            }
            .swipe{
                border-radius: 4px;
                .swiper-container{
                    border-radius: 4px;
                    .swiper-item{
                        cursor: pointer;
                        height: 100%;
                        width: 100%;
                        position: relative;
                        border-radius: 4px;
                        img{
                            border-radius: 4px;
                            object-fit: cover;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    --swiper-pagination-color:  white;/* 两种都可以 */
                }
            }
        }
    }

}

</style>
