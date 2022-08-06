<template>
  <div class="sidear-box">
        <div class="info">
            <div class="btn">
                <h2>申请圈子</h2>  
                <a-button @click="goCreate" type="primary">
                    创建圈子
                </a-button>
            </div>
            <div class="desc">
                欢迎您创建的圈子内容有一定的专业性
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goCreate(){
           this.$router.push({ path: `/member/group/create`})
        }
    }
}
</script>

<style lang="less" scoped>
.sidear-box{
    background: white;
    margin-bottom: 10px;
    .info{
        padding: 20px;
        .btn{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            h2{
                font-weight: 700;
                font-size: 16px;
                color: #1d2129;
            }
        }
        .desc{
            font-size: 14px;
            line-height: 22px;
            color: #86909c;
        }
    }
}
</style>