<template>
  <div class="container">
    <a-result status="404" title="404" sub-title="页面不存在">
      <template #extra>
        <nuxt-link to="/">
          <a-button type="primary">
            回到首页
          </a-button>
        </nuxt-link>
      </template>
    </a-result>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: ['error'],
  // layout: 'blog', // 你可以为错误页面指定自定义的布局
  head(){
      return this.$seo(`404页面未找到-${this.base.title}`,`404页面未找到`,[{
          hid:"beethorn",
          name:"description",
          content:`404页面未找到`
      }])
  },
  computed:{
      ...mapState(["design","base"])
  },
}
</script>

<style lang="less" scoped>
.container{
    margin: 40px 0;
    min-height: 550px;
    .account-content{
        display: flex;
        justify-content: center;
        .warper{
            width: 100%;
            .account-router{
                margin: 10px 0;
            }
        }
    }
}

// 响应式处理
@media only screen and (max-width: 768px) {
  .container{
    .account-content{
      .warper {
        width: 100% !important;
      }
    }
  }
}
</style>