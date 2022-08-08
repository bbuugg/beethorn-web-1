<template>
    <div>
        <div class="content-top">
            <a-row :gutter="24">
                <a-col :xl="14">
                    <!-- <MemberSwipe /> -->
                </a-col>
                <a-col :xl="10">
                    <div class="content-top-announcement">
                        <div class="announcement-title">
                            公告
                        </div>
                        <ul>
                            <li>
                                <span class="point-circle"></span>
                                <span class="announcement-info">投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议</span>
                                <a-tag color="#f50">
                                    必读
                                </a-tag>
                            </li>
                            <li>
                                <span class="point-circle"></span>
                                <span class="announcement-info">投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议</span>
                                <a-tag color="#f50">
                                    必读
                                </a-tag>
                            </li>
                            <li>
                                <span class="point-circle"></span>
                                <span class="announcement-info">投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议投稿遵循协议</span>
                                <a-tag color="#f50">
                                    必读
                                </a-tag>
                            </li>
                        </ul>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="content-box">
            <a-row :gutter="24">
                <a-col :xl="6" :style="{ marginBottom: '24px' }">
                    <a-card>
                        <a-statistic
                            :value="1123423"
                            :value-style="{ color: '#108ee9' }"
                            style="margin-right: 50px; font-size: 20px; font-weight: 800;"
                        >
                            <template #title >
                                <span >
                                    粉丝
                                </span>
                            </template>
                            <template #prefix>
                                <a-icon type="user" style="margin-right: 10px;"/>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :xl="6" :style="{ marginBottom: '24px' }">
                    <a-card>
                        <a-statistic
                            :value="1123423"
                            :value-style="{ color: '#87d068' }"
                            style="margin-right: 50px; font-size: 20px; font-weight: 800;"
                        >
                            <template #title >
                                <span >
                                    内容
                                </span>
                            </template>
                            <template #prefix>
                                <a-icon type="bars" style="margin-right: 10px;"/>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col  :xl="6" :style="{ marginBottom: '24px' }">
                    <a-card>
                        <a-statistic
                            :value="1123423"
                            :value-style="{ color: '#f50' }"
                            style="margin-right: 50px; font-size: 20px; font-weight: 800;"
                        >
                            <template #title >
                                <span >
                                    圈子
                                </span>
                            </template>
                            <template #prefix>
                                <a-icon type="compass" style="margin-right: 10px;"/>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col  :xl="6" :style="{ marginBottom: '24px' }">
                    <a-card>
                        <a-statistic
                            :value="1123423"
                            :value-style="{ color: '#2db7f5' }"
                            style="margin-right: 50px; font-size: 20px; font-weight: 800;"
                        >
                            <template #title >
                                <span >
                                    收益
                                </span>
                            </template>
                            <template #prefix>
                                <a-icon type="dollar" style="margin-right: 10px;"/>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>

            <a-row :gutter="24">
                <a-col :xl="12">
                    <div id="fansChart" style="height:400px;"></div>
                </a-col>
                <a-col :xl="12">
                    <div id="incomeChart" style="height:400px;"></div>
                </a-col>
            </a-row>

            <a-row :gutter="24">
                <a-col :xl="24">
                    <div id="contentChart" style="height:400px;"></div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content-top{
    
    margin-bottom:20px ;
    .content-top-announcement{
        background: white;
        height: 260px;
        padding:20px;
        .announcement-title{
            font-size: 16px;
            color: #212121;
            letter-spacing: 0;
            line-height: 20px;
        }
        ul{
            margin-top: 10px;
            li{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .point-circle{
                    width: 6px;
                    height: 6px;
                    background: #e7e7e7;
                    border-radius: 50%;
                    display: block;
                }
                .announcement-info{
                    font-size: 18px;
                    font-weight: bold;
                    color: #425167;
                    height: 32px;
                    line-height: 32px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin:0 10px;
                }
            }
        }
    }
}
.content-box{
    border: 1px solid #e5e9ef;
    background: white;
    border-radius: 4px;
    padding:20px;
}
</style>

<script>
import { mapState } from "vuex"
import MemberSwipe from "@/components/carousel/memberSwipe"
export default {
    middleware: ['auth'],
    name:"MemberDashboard",
    components:{
       MemberSwipe
    },
    data(){
        return{
            id:null,
            
        }
    },
    head(){
        return this.$seo(`创作中心-仪表盘-${this.base.title}`,`创作中心`,[{
            hid:"beethorn",
            name:"description",
            content:`创作中心`
        }])
    },
    computed:{
        ...mapState(["design","base"])
    },
    mounted(){
        this.echartsInit()
    },
    methods:{
        echartsInit () {
            // 基于准备好的dom，初始化echarts实例
            let fansChart = this.$echarts.init(document.getElementById("fansChart"));
            // 指定图表的配置项和数据
            let fansOption = {
                // color:["#4169E1","#00FFFF"],
                title: {
                    text: "粉丝增量趋势"
                },
                tooltip: {},
                legend: {
                    data: ["增加","减少"],
                    top: 'bottom',
                },
                xAxis: {
                    data: ["20/11/01", "20/11/02", "20/11/03", "20/11/04", "20/11/05", "20/11/06", "20/11/07"]
                },
                yAxis: {},
                series: [
                    {
                        name: "增加",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20,12]
                    },
                    {
                        name: "减少",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20,47]
                    },
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            fansChart.setOption(fansOption);

            let incomeChart = this.$echarts.init(document.getElementById("incomeChart"));
            let incomeOption = {

                title: {
                    text: '收益分布',
                    subtext: '计算收益分布占比',
                    // left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // left: 'center',
                    top: 'bottom',
                    data: ['付费下载', '作品交易', '用户打赏', '悬赏回答', '付费圈子']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: [
                            {value: 10, name: '付费下载'},
                            {value: 5, name: '作品交易'},
                            {value: 15, name: '用户打赏'},
                            {value: 25, name: '悬赏回答'},
                            {value: 20, name: '付费圈子'},
                        ]
                    }
                ]
            };
            incomeChart.setOption(incomeOption);

             // 基于准备好的dom，初始化echarts实例
            let contentChart = this.$echarts.init(document.getElementById("contentChart"));
            // 指定图表的配置项和数据
            let contentOption = {
                color:["#4169E1","#F08080","#008080"],
                title: {
                    text: '内容增量趋势',
                    left:"center"
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['点赞', '评论', '收藏'],
                    top: 'bottom',
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ["20/11/01", "20/11/02", "20/11/03", "20/11/04", "20/11/05", "20/11/06", "20/11/07"]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '评论',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '点赞',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '收藏',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            contentChart.setOption(contentOption);

           
        },
    },
}
</script>