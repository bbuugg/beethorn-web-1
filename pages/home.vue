<template>
    <div class="container" :style="{marginTop: design.layout == 'home' ? '130px' : '80px'}">
        <!-- <WidgetTmp /> -->
        
        <div v-for="(item,index) in list" :key="index">

            <!-- <WidgetTools 
            v-if="item.style == STYLE.WidgetSwipe" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            :count="design.layout == 'home' ? 2 : 3"
            /> -->
            
            <WidgetSwipe 
            v-if="item.style == STYLE.WidgetSwipe" 
            :info="item" 
            :width="design.layout == 'home' ? 1500 : design.width" 
            :height="360" 
            :left="design.layout == 'home' ? 8 : 14"
            :right="design.layout == 'home' ? 16 : 10"
            :rightCount="design.layout == 'home' ? 6 : 12"
            />


           

            <!-- <WidgetBlock 
            v-if="item.style == STYLE.WidgetSwipe" 
            :info="item"
            :width="design.width"
            :count="3"
            /> -->

            <WidgetVideo 
            v-if="item.style == STYLE.WidgetVideo" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            :count="design.layout == 'home' ? 4 : 6"
            />

            <WidgetAudio 
            v-if="item.style == STYLE.WidgetAudio" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            :count="design.layout == 'home' ? 4 : 6"
            />

            <WidgetResource 
            v-if="item.style == STYLE.WidgetResource" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            :count="design.layout == 'home' ? 4 : 6"
            />

            <WidgetCommunity 
            v-if="item.style == STYLE.WidgetCommunity" 
            :info="item"/>

            <WidgetEdu 
            v-if="item.style == STYLE.WidgetEdu" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            :count="design.layout == 'home' ? 4 : 6"
            />

            <WidgetVip 
            v-if="item.style == STYLE.WidgetVip" 
            :info="item"/>

            <WidgetArticle 
            v-if="item.style == STYLE.WidgetArticle" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            :count="design.layout == 'home' ? 12 : 6"
            />

            <WidgetImage
            v-if="item.style == STYLE.WidgetImage" 
            :info="item"
            :width="design.layout == 'home' ? 1500 : design.width"
            />
        </div>
        
    </div>
</template>

<script>
import api from "@/api/index"

import WidgetTmp from "@/components/widget/widgetTmp"
import WidgetTools from "@/components/widget/widgetTools"
import WidgetBlock from "@/components/widget/widgetBlock"
import WidgetSwipe from "@/components/widget/widgetSwipe"
import WidgetAudio from "@/components/widget/widgetAudio"
import WidgetResource from "@/components/widget/widgetResource"
import WidgetVideo from "@/components/widget/widgetVideo"
import WidgetVip from "@/components/widget/widgetVip"
import WidgetArticle from "@/components/widget/widgetArticle"
import WidgetCommunity from "@/components/widget/widgetCommunity"
import WidgetEdu from "@/components/widget/widgetEdu"


import {STYLE} from "@/shared/style"
export default {
    layout({store}){
        if (store.state.design.layout == "default") {
            return "default"
        }
        if (store.state.design.layout == "home") {
            return "home"
        }
    },
    components:{
        WidgetTmp,
        WidgetBlock,
        WidgetTools,
        WidgetSwipe,
        WidgetVideo,
        WidgetAudio,
        WidgetResource,
        WidgetVip,
        WidgetArticle,
        WidgetCommunity,
        WidgetEdu,
    },
    head(){
        return this.$seo(`${this.base.childTitle}-${this.base.title}`,`${this.base.childTitle}`,[{
            hid:"beethorn-desc",
            name:"description",
            content:`${this.base.description}`
        }])
    },
    async asyncData({$axios,store}){
        const res = await $axios.get(api.getSystemHome)

        return {
            base:store.state.base,
            design:store.state.design,
            // res:res,
            list: res.data.list != null ? res.data.list : [],
        }
    },
    data(){
        return{
           STYLE,
        }
    },
}
</script>

<style lang="less" scoped>

@media screen and (max-width: 768px) {
    .container{
        margin-top: 20px;
    }
}
</style>

