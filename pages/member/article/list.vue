<template>
    <div  class="content-box">
        <div class="content-status">
            <a-radio-group name="radioGroup" @change="changeRadio" :defaultValue="queryParam.status">
                <a-radio :value="0">
                    全部
                </a-radio>
                <a-radio :value="1">
                    审核中
                </a-radio>
                <a-radio :value="2">
                    已通过
                </a-radio>
                <a-radio :value="3">
                    未通过
                </a-radio>
            </a-radio-group>
             <a-button type="primary" @click="create">投稿</a-button>
        </div>

        <div class="content-info" v-if="list == null || list.length < 1">
            <a-config-provider :locale="locale">
               <a-empty />
            </a-config-provider>
        </div>
        <ul class="content-info" v-if="list != null && list.length>0">
           <li v-for="(item,index) in list" :key="index">
                <listOne  @edit="edit" 
                @remove="remove"  :isMember="true" :info="item"/>
            </li>
        </ul>
        <div  v-if="list != null && list.length>0" class="content-pagination" >
            <a-config-provider :locale="locale">
                <a-pagination
                    @change="changePage"
                    :pageSize="queryParam.limit"
                    :total="total"
                    show-quick-jumper
                >
                </a-pagination>
            </a-config-provider>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import listOne from "@/components/list/listOne"
import api from "@/api/index"
export default {
    name:"articleList",
    middleware: ['auth'],
    components:{
        listOne
    },
    data() {
        return {
            locale: zhCN,
            list: [],
            total: 0,
            queryParam: {
                page: 1,
                limit: 10,
                status: 0,
                userId:0,
            },
        };
    },
    head(){
        return this.$seo(`创作中心-${this.base.title}`,`创作中心`,[{
            hid:"beethorn",
            name:"description",
            content:`创作中心`
        }])
    },
    computed:{
        ...mapState(["base"])
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            try {
                const res = await this.$axios.get(api.getArticleList,{params: this.queryParam})
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.total = res.data.total
                this.list = res.data.list == null ? [] : res.data.list
            } catch (error) {
                setTimeout(() => {
                    this.$notification.error({
                        message: '网络错误',
                        description: "请稍后再试"
                    })
                }, 1000)
            }
        },
        changePage(page,limit){
            this.queryParam.limit = limit
            this.queryParam.page = page
            this.getData()
        },
        changeRadio(e){
            this.queryParam.status = e.target.value
            this.getData()
        },
        create(){
            this.$router.push({ name: "member-article-create"})
        },
        view(e){
            this.$router.push({ name: "article-id",params:{id:e}})
        },
        edit(e){
            this.$router.push({ name: "member-article-edit",
                query:{
                    id:e,
                }
            })
        },
        async remove(e){
            this.$confirm({
                okText:"确定",
                cancelText:"取消",
                title: '正在删除',
                content: '请注意，您现在正在删除',
                onOk:() => {e
                    const formData = {
                        id:parseInt(e),
                    }
                    this.postDelete(formData)
                    return false;
                },
                onCancel() {},
            });
        },
        async postDelete(formData){
            try {
                const res = await this.$axios.post(api.postArticleRemove,formData)
                if (res.code != 1) {
                    this.$message.error(
                        res.message,
                        3
                    )
                    return
                }
                this.getData()
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
.content-box{
    border: 1px solid #e5e9ef;
    background: white;
    border-radius: 4px;
    padding:20px;
    .content-status{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .content-info{
        width: 100%;
        margin:10px 0;
    }
    .content-pagination{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>