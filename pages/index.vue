<template>
    <div class="content-box">
        <div class="warper" :style="{ width: this.design.width+ 'px' }">
            <LeftMenu 
                :queryParam="queryParam"
                :myGroupList="myGroupList"
                :hotGroupList="hotGroupList"
                @changeMenu="changeMenu"
                @changeMyGroup="changeMyGroup"
            />
            <Right 
                :hotGroupList="hotGroupList"
                :loading="loading"
                :list="list"
                :noMore="noMore"
                :topLoading="topLoading"
                :topList="topList"
                @resetList="resetList"
            />
           
        </div>
    </div>
</template>



<script>

import LeftMenu from "@/components/feed/left"
import Right from "@/components/feed/right"

import { mapState } from "vuex"
import api from "@/api/index"
import {MODE} from "@/shared/mode"
import {MODULE} from "@/shared/module"
export default {
    head(){
        return this.$seo(`话题动态-${this.base.title}`,`${this.base.childTitle}`,[{
            hid:"fiber-desc",
            name:"description",
            content:`${this.base.description}`
        }])
    },
    components:{
        LeftMenu,
        Right,
        
    },
    computed:{
        ...mapState(["design"]),
        ...mapState(["emojiList"]),
        ...mapState("user",["token","userInfo"]),
    },
    async asyncData({store}){
        return{
            base:store.state.base,
            myGroupList:  [],
            hotGroupList:  [],
        }
    },
    data(){
        return{
            MODE,
            MODULE,
            
            topList:[],
            topLoading:false,
            
            queryParam:{
                page:1,
                limit: 10,
                module: MODULE.TOPIC,
                mode: MODE.NEW,
            },
            loading:false,
            list:[],
            total:0,
            noMore:false,
        }
    },
    mounted(){
       
        this.getTopList()
        this.getList()
        this.getGroup()
        window.addEventListener('scroll', this.scrollList)
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
            this.loading = true
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
            this.loading = false
           
        },

        // 获取置顶列表
        async getTopList(){
            this.topLoading = true
            const res = await this.$axios.get(api.getTopicTop) 
            if (res.code != 1) {
                this.$router.push(`/404`)
                this.$message.error(
                    res.message,
                    3
                )
                return
            }
            this.topLoading = false
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
                const myjoinQueryParam = {
                    page:1,
                    limit: 10,
                    module: MODULE.GROUP,
                    mode: MODE.HOT,
                    isJoin: true,
                    authorId:this.userInfo.userId
                }
                const myGroupRes = await this.$axios.get(api.getSystemFilter,{params: myjoinQueryParam}) 
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
            this.list = []
            this.total = 0
            this.queryParam.page = 1
            this.getList()
        },

        // 修改菜单
        changeMenu(e){
            this.queryParam.groupId = 0
            this.queryParam.mode = e
            
 
            this.list = []
            this.total = 0
            this.queryParam.page = 1
            this.getList()
        },
        // 修改小组
        changeMyGroup(e){
            this.queryParam.mode = MODE.NEW

            this.list = []
            this.queryParam.isJoin = true
            this.queryParam.groupId = e
            this.total = 0
            this.queryParam.page = 1
            this.getList()
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
.content-box{
    margin: 80px 0;
    display: flex;
    justify-content: center;
    min-height: 550px;
}

</style>
