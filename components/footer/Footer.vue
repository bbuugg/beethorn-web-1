<template>
    <div class="footer">
        <div class="page" >
            <div class="page_box" :style="{ width: design.layout == 'home' ? `1500px`: `${design.width}px`}">
                <div class="copyright">
                    <span>Copyright © 2022 </span>
                    <span class="site"> {{base.title}} </span>
                    <span class="dot">・</span>
                    <span>{{base.recordNumber}}</span>
                </div>
                <ul class="page_list">
                    <li class="item" @click="go(1)">
                        关于我们
                    </li>
                    <li class="item" @click="go(1)">
                       用户协议
                    </li>
                </ul>
            </div>
        </div>
        <div class="divider"></div>
        <div class="link">
            <div class="link_box" :style="{ width: design.layout == 'home' ? `1500px`: `${design.width}px`}">
                <div class="link_text">友情链接：</div>
                <ul class="link_list">
                    <li class="item">
                        暂无友链
                    </li>
                    <li class="item">
                       暂无友链
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    computed:{
        ...mapState(["design","base"])
    },
    methods:{
        go(e){
            this.$router.push(`/pages/${e}`)
        }
    }
}
</script>
<style lang="less" scoped>
.footer{
   .page{
        height: 60px;
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #191919!important;
        border-bottom: 1px solid #111;
        .page_box{
            display: flex;
            align-items: center;
            .copyright{
                display: flex;
                // justify-content: center;
                align-items: center;
                .site{
                    margin-left:10px;
                }
                .dot{
                    margin: 0 10px;
                }
            }
            .page_list{
                margin-left: 20px;
                display: flex;
                align-items: center;
                .item{
                    cursor: pointer;
                    margin-right: 10px;
                }
            }
        }
    }
    .divider{
        height: 1px;
        width: 100%;
        border-top: 1px solid #030303;
        background-color: #242424;
        margin: 0;
    }
    .link{
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #444;
        background-color: #1a1a1a;
        font-size: 14px;
        color: #666;
        padding: 20px 0;
        .link_box{
            display: flex;
            align-items: center;
            .link_text{

            }
            .link_list{
                margin-left: 20px;
                display: flex;
                align-items: center;
                .item{
                    margin-right: 10px;
                }
                .item:hover{
                    cursor: pointer;
                    color: aqua;
                }
            }
        }
    }
}
// 响应式处理
@media only screen and (max-width: 768px) {
  .footer{
      display: none;
  }
}

</style>