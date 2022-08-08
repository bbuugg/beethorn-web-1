<template>
    <div class="content">
        <div class="vip-box">
            <div class="vip-top">
                <a-row :gutter="[{md:12},{md:12}]">
                    <a-col  v-for="(item,index) in vipList" :key="index" :span="8">
                        <div @click="changeRole(item,index)" :class="selectKey == index ? 'active': ''"  class="vip-role">   
                            <div class="vip-title">
                                <img :src="item.icon">
                                <span>{{item.title}}</span>
                            </div>
                            <div class="vip-price">
                                <div class="vip-money">
                                    ￥<span>{{item.price}}</span>/
                                </div>
                                <div v-if="item.day == 0" class="vip-time">
                                    永久
                                </div>
                                <div v-if="item.day != 0" class="vip-time">
                                    {{item.day}}天
                                </div>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="vip-user-role">
                <h2>会员中心</h2>
                <div class="user-role-box">
                    <div class="user-info">
                        <Avatar :src="userInfo.avatar+'@w60_h60'" shape="circle" :size="50"/>
                        <div class="user-info-name">
                            <div class="user-info-name-role">
                                <p>{{userInfo.nickName}}</p>
                                <div class="user-lv">
                                    <img :src="userInfo.grade.icon" :alt="userInfo.grade.title">
                                    <img v-if="userInfo.vip != null" :src="userInfo.vip.icon" :alt="userInfo.vip.title">
                                </div>
                            </div>
                            <p v-if="userInfo.vip != null">
                                <span>到期时间： {{userInfo.vip.finishTime | restDate}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="submit">
                        <a-button v-if="userInfo.vip != null" @click="buyVip" type="primary">
                            立即续费
                        </a-button>
                        <a-button v-if="userInfo.vip == null" @click="buyVip" type="primary">
                            立即开通
                        </a-button>
                    </div>
                </div>
            </div>
            <div class="vip-desc">
                <!--  :pagination="{
                        pageSize: queryParam.limit,
                        total:total,
                    }"
                    @change="changePage"    -->
                <a-table 
                    :pagination="false"
                    :columns="column" 
                    size="middle"  
                    :data-source="vipList" 
                    :rowKey="record=>record.id"
                    >
                    <span slot="discount" slot-scope="discount">
                        {{discount != 0 ? (discount * 100) + "%" : 0}}
                    </span>
                </a-table>
                <a-table 
                    :pagination="false"
                    :columns="gradeColumn" 
                    size="middle"  
                    :data-source="gradeList" 
                     :rowKey="record=>record.id + 'grade'"
                    >
                    <span slot="integral" slot-scope="integral">
                        {{integral |resetNum}} 积分
                    </span>
                    <span slot="createGroup" slot-scope="createGroup">
                        可创建  {{createGroup}} 个
                    </span>
                    <div slot="postsModule" slot-scope="postsModule">
                        <span v-for="(item) in postsModule" :key="item">
                            {{item | resetPosts}}
                        </span>
                    </div>
                    <div slot="commonAuth" slot-scope="commonAuth">
                        <span v-for="(item) in commonAuth" :key="item">
                            {{item | resetCommonAuth}}
                        </span>
                    </div>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index"
import { mapState } from "vuex"

import { format } from "date-fns"

import {ORDERTYPE} from "@/shared/order"
export default {
    middleware: 'auth',
    data(){
        return{
            column:[
                {
                    title: '会员名称',
                    dataIndex: 'title',
                    key: 'title',
                    scopedSlots: { customRender: 'title' },
                },
                {
                    title: '会员折扣',
                    key: 'discount',
                    dataIndex: 'discount',
                    scopedSlots: { customRender: 'discount' },
                },
                
            ],
            gradeColumn:[
                {
                    title: '等级',
                    dataIndex: 'title',
                    key: 'title',
                    scopedSlots: { customRender: 'title' },
                },
                {
                    title: '升级积分',
                    key: 'integral',
                    dataIndex: 'integral',
                    scopedSlots: { customRender: 'integral' },
                },
                {
                    title: '可创建圈子数',
                    key: 'createGroup',
                    dataIndex: 'createGroup',
                    scopedSlots: { customRender: 'createGroup' },
                },
                {
                    title: '投稿权限',
                    key: 'postsModule',
                    dataIndex: 'postsModule',
                    scopedSlots: { customRender: 'postsModule' },
                },
                {
                    title: '通用权限',
                    key: 'commonAuth',
                    dataIndex: 'commonAuth',
                    scopedSlots: { customRender: 'commonAuth' },
                },
            ],
            vipList:[],
            gradeList:[],
            vip:null,
            selectKey:null,
            isVip:false
        }
    },
    head(){
        return this.$seo(`用户中心-${this.base.title}`,`用户中心`,[{
            hid:"beethorn",
            name:"description",
            content:`用户中心`
        }])
    },
    computed:{
        ...mapState("user",["userInfo"]),
        ...mapState(["base"])
    },
    mounted(){
        this.getData()
    },
    filters:{
        resetPosts (e) {
            switch (e) {
                case "article":
                    return "文章"
                case "audio":
                    return "音频"
                case "video":
                    return "视频"
                case "resource":
                    return "资源"
                case "edu":
                    return "课程"
                case "group":
                    return "圈子"
                case "question":
                    return "问题"
                case "topic":
                    return "话题"
            }
        },
        resetCommonAuth (e) {
            switch (e) {
                case "comment":
                    return "评论"
                case "answer":
                    return "回答"
                case "report":
                    return "举报"
                case "upload":
                    return "文件上传"
                case "like":
                    return "点赞"
                case "favorite":
                    return "收藏"
            }
        },
        restDate(value){
            if (value == "") {
                return "永久"
            }
            return format( new Date(value), 'yyyy/MM/dd')//=> '02/11/2014'
        }
    },
    methods:{
        async getData(){
            const res = await this.$axios.get(api.getVipAndGrade)
            if (res.code != 1) {
                this.$message.error(
                    res.message,
                    3
                )
            }
            this.vipList = res.data.list.vip != null ? res.data.list.vip : []
            this.gradeList = res.data.list.grade != null ? res.data.list.grade : []
        
        },
        changeRole(e,i){
            this.vip = e,
            this.selectKey= i
        },
        buyVip(){
            
            if (this.vip == null) {
                this.$message.error(
                    "请选择所需要开通的会员",
                    3
                )
                return
            }

            // 判断
            const product = {
                detailId:this.vip.id,
                orderMoney:this.vip.price,
                orderType: ORDERTYPE.OPENVIP,
            }
            this.$Pay("购买会员",product).then(async (res)=>{
                if (res != false) {
                    this.$message.success(
                    "开通成功",
                        3
                    )
                    return
                }
            }).catch((err)=>{
                console.log(err)
            })

        }
    }
}
</script>


<style lang="less" scoped>
.content{
    .vip-box{
        .vip-role{
            padding: 10px;
            cursor: pointer;
            background-color: #fff;
            border: 2px solid transparent;
            border-radius: 10px;
            box-shadow: 0 0 3px rgb(0 0 0 / 15%) !important;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .vip-title{
                display: flex;
                justify-items: center;
                align-items: center;
                font-size: 1.2rem;
                font-weight: 700;
                img{
                    width: 32px;
                    height: 32px;
                }
            }  
            .vip-price{
                display: flex;
                justify-content: center;
                align-items: center;
                .vip-money{
                    font-size: 24px;
                    font-weight: 200;
                }
                .vip-time{
                    font-size: 24px;
                    color: #bcbcbc;
                    font-weight: 200;
                }
            } 
            .vip-auth{
                display: flex;
                justify-content: center;
                align-items: center;
                .vip-money{
                    font-size: 24px;
                    font-weight: 200;
                }
                .vip-time{
                    font-size: 24px;
                    color: #bcbcbc;
                    font-weight: 200;
                }
            } 
            
        }
        .active{
            border: 2px solid #ffc62c;
        }
        .active::after{
            content: "✓";
            position: absolute;
            width: 20px;
            height: 20px;
            color: rgb(255, 255, 255);
            top: 15px;
            right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #697fe6;
            border-radius: 100%;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(255, 255, 255);
            border-image: initial;
        }
        .vip-role:hover{
            border: 2px solid #ffc62c;
        }
        .vip-user-role{
            background-color: #fff;
            margin-top: 20px;
            padding: 20px;
            .user-role-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                .user-info{
                    display: flex;
                    align-items: center;
                    .user-info-name{
                        .user-info-name-role{
                            display: flex;
                            align-items: center;
                            p{
                                font-size: 16px;
                            }
                            img{
                                width: 32px;
                                height: 32px;
                                margin-left: 10px;
                            }
                        }
                        font-size: 13px;
                    }
                }
            }
        }
        .vip-desc{
            background: white;
            padding: 0 20px 20px 20px;
            .authList{
                width: 200px;
                span{
                    margin-right: 5px;
                }
            }
            .notCheck{
                width: 200px;
                span{
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
