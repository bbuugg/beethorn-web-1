<template>
    <div class="content-box" :style="{ width: design.width + 'px' }">
        <a-row :gutter="24">
            <a-col :xl="8" :style="{ marginBottom: '24px' }">
                <a-card>
                    <a-statistic
                        :value="1123423"
                        :value-style="{ color: '#108ee9' }"
                        style="margin-right: 50px; font-size: 20px; font-weight: 800;"
                    >
                        <template #title >
                            <span >
                                圈友
                            </span>
                        </template>
                        <template #prefix>
                            <a-icon type="user" style="margin-right: 10px;"/>
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col :xl="8" :style="{ marginBottom: '24px' }">
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
            <a-col  :xl="8" :style="{ marginBottom: '24px' }">
                <a-card>
                    <a-statistic
                        :value="1123423"
                        :value-style="{ color: '#f50' }"
                        style="margin-right: 50px; font-size: 20px; font-weight: 800;"
                    >
                        <template #title >
                            <span >
                                热度
                            </span>
                        </template>
                        <template #prefix>
                            <a-icon type="fire" style="margin-right: 10px;"/>
                        </template>
                    </a-statistic>
                </a-card>
            </a-col>
            <!-- <a-col  :xl="6" :style="{ marginBottom: '24px' }">
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
            </a-col> -->
        </a-row>

        <a-row :gutter="24">
            <a-col :xl="24">
                <a-table :columns="columns" :data-source="data" size="middle" />
            </a-col>
        </a-row>

        <a-row :gutter="24">
            <a-col :xl="24">
                <a-table :columns="columns" :data-source="data" size="middle" />
            </a-col>
        </a-row>


    </div>
</template>

<style lang="less" scoped>
.content-box{
    min-height: 100vh;
    border: 1px solid #e5e9ef;
    background: white;
    border-radius: 4px;
    padding:20px;
    
}
</style>

<script>
import { mapState } from "vuex"

export default {
    middleware: ['auth'],
    name:"MemberGroupDashboard",
    data(){
        return{
            id:null,
            data: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                 {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                 {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                 {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
            ],
            columns:[
                {
                    title: 'Name',
                    dataIndex: 'name',
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                },
            ],
        }
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
    validate({ query }) {
        if (query.id != null && query.id != undefined && query.id != NaN) {
             return true // 如果参数有效
        }
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    mounted(){
        this.id = this.$route.query.id

    },
    methods:{

    },
}
</script>