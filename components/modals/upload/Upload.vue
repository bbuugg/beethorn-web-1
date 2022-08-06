<template>
    <div class="upload_file_box center opacity" :class="[isTrue && 'is_back_show']">
        <div class="upload_file_container">
            <div class="upload_file_title">
                <div class="upload_file_title_l">
                    <span>插入文件</span>
                </div>
                <div class="upload_file_title_r">
                    <a-icon  type="close" @click="cancel"/>
                </div>
            </div>


            <div class="upload_file_content">
                <div  class="upload_file_content_box">
                    <a-upload-dragger
                        :fileList="[]"
                        name="file"
                        :multiple="false"
                        :customRequest="onFileAdded"
                    >
                        <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                            点击或者拖拽文件进来
                        </p>
                        <p class="ant-upload-hint">
                            目前只支持单文件上传。。
                        </p>
                    </a-upload-dragger>
                </div>
                <div class="file_progress" v-if="fileList.length > 0">
                    <div class="file_progress_box" :style="`transform: translateX(-${progress}%);`"></div>
                    <div class="file_info">
                        <a-icon v-if="mediaType == 'Image'" class="file_info_icon" type="file-image" />
                        <a-icon v-if="mediaType == 'Audio'" class="file_info_icon" type="file-unknown" />
                        <a-icon v-if="mediaType == 'Video'" class="file_info_icon" type="file-unknown" />
                        <a-icon v-if="mediaType == 'Other'" class="file_info_icon" type="file-unknown" />
                        <div class="file_text">
                            <div class="file_name">
                                {{fileList[0].name}}
                            </div>
                            <div class="file_size">
                                {{fileList[0].size | resetSize}}
                            </div>
                            <div class="file_name">
                                {{fileList[0].loadingText}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/index'
import { mapState } from "vuex"
import { format } from "date-fns"
export default {
     filters: {
        resetSize: function(v){
            let tmp = v / 1024
            if (tmp < 1024) {
                return tmp.toFixed(2) + "kb"
            }
            if (tmp >= 1024) {
                return (tmp / 1024).toFixed(2) + "mb"
            }
        }
    },
    data() {
        return {
            minFileSize:1000, // 文件大小
            bigFileSize:1000, // 文件大小
            mediaType:null,
            imageType:[".png",".jpg",".gif",".jpeg"], // 图片类型
            audioType:[".mp3",".wav"], // 图片类型
            videoType:[".mp4"], // 图片类型
            otherType:[".crt"], // 其他类型

            fileList:[],
            progress:0,
            chunkSize: 1024*1024*2,

            activeLink: null,
            isTrue: false,
            state: null // 准备（prepare） 确定（ ascertain） 取消（cancel）
        };
    },
    computed:{
        ...mapState(["file"]),
        ...mapState("user",["token","userInfo"]),
    },
    methods: {
        async confirm(
            mediaType
        ) {
           
            this.mediaType = mediaType || "Image"
            this.imageType = this.file.imageType
            this.audioType = this.file.audioType
            this.videoType = this.file.videoType
            this.otherType = this.file.otherType
            this.minFileSize = this.file.minFileSize
            this.bigFileSize = this.file.bigFileSize
            
  
            this.open();
            return new Promise((resolve, reject) => {
                const target = { state: 'prepare'};
                const that = this
                let res = new Proxy(target, {
                    set(event, key, value) {
                        if (value === 'ascertain') {
                            resolve(that.activeLink);
                        } else {
                            reject(false);
                        }
                        return true
                    }
                });
                this.state = res;
            });
        },
        async onFileAdded(antfile) { 
            // 文件上传前的校验
            if (!antfile) return;
            // console.log(antfile)
            const file = antfile.file
            this.fileList.push({
                name:file.name,
                size:file.size,
                loadingText:"校验文件中"
            })
            
            // 如果文件尺寸小于后台设置并且小于5m则用普通上传
            if (file.size < this.minFileSize *1204*1024) {
                // 这里用普通上传方式
                this.fileList[0].loadingText = "这里采用普通上传"
                this.uploadMinFile(file)
                return
            }

            
            if ((this.bigFileSize * 1024 * 1024) < file.size) {
                this.$message.error(
                    "文件太大了",
                    3
                )
                return
            }
           
            const type = this.$getType(file.name)
            if (this.mediaType === "Image" && this.imageType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                 
                return
            }
            if (this.mediaType === "Audio" && this.audioType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                
                return
            }
            if (this.mediaType === "Video" && this.videoType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                
                return
            }
            if (this.mediaType === "Other" && this.otherType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                
                return
            }

            
           
            this.fileList[0].loadingText = "正在加密文件内容"
            
            // 获取分片个数
            const chunkCount = Math.ceil(file.size / this.chunkSize)
            
            // 获取md5
            const now = new Date();
            const nowStr = format(now, 'yyyy-MM-dd');
            const fileMd5str = file.size + file.name + this.userInfo.nickName + this.userInfo.userId + nowStr
            const fileMd5 = this.$hex_md5(fileMd5str)
         
           
            // 向后端查询验证切片上传
            const verifyChunkFormData = {
                identifier:fileMd5
            }
            const verifyChunkRes = await this.$axios.get(api.UploadChunk, {params: verifyChunkFormData})
            

            if (verifyChunkRes.code != 1) {
                this.fileList[0].loadingText = "验证文件加密内容错误"
                 this.$message.error(
                    verifyChunkRes.message,
                    3
                )
                return
            }
            
            let chunkResultList = verifyChunkRes.data.result
            // 已上传未合并直接请求合并
            if (chunkResultList.length == chunkCount) {
                this.fileList[0].loadingText = "文件秒传"
                this.mergeChunk(file.name,fileMd5,file.size)
                return
            }
            // 已上传部分切片,继续上传遗留切片
            if (chunkResultList.length != chunkCount && chunkResultList.length > 0) {
                this.fileList[0].loadingText = "文件断点续传"

                let uploadedChunks = [];

                for (let i = 0; i < chunkCount; i++) {
                    
                    //分片开始位置
                    let start = i * this.chunkSize
                    let end = Math.min(file.size,start + this.chunkSize)

                    let _chunkFile = file.slice(start,end)
                

                    let formData = new FormData()
                    formData.append("identifier",fileMd5)
                    formData.append("chunkNumber",i)
                    formData.append("totalChunks",chunkCount)
                    formData.append("file",_chunkFile)

                    uploadedChunks.push(formData)
                }
                // 需求 根据arr 里面的数据 移除 arrobj 里面对应下标数据返回一个新数组
                chunkResultList.forEach((item)=>{
                    uploadedChunks[item] = undefined
                })

                uploadedChunks = uploadedChunks.filter((item)=>{
                    return item != undefined
                })

                for (let index = 0; index < uploadedChunks.length; index++) {
                   await this.$axios.post(api.UploadChunk, uploadedChunks[index])
                }
                this.mergeChunk(file.name,fileMd5,file.size)
              
                return
            }
            
           
            this.fileList[0].loadingText = "文件正在上传"

            for (let i = 0; i < chunkCount; i++) {
                
                //分片开始位置
                let start = i * this.chunkSize
                let end = Math.min(file.size,start + this.chunkSize)

              
                let _chunkFile = file.slice(start,end)
           


                let formData = new FormData()
                formData.append("identifier",fileMd5)
                formData.append("chunkNumber",i)
                formData.append("totalChunks",chunkCount)
                formData.append("file",_chunkFile)


                await this.$axios.post(api.UploadChunk, formData)
                this.progress =  Math.round((((i + 1) / chunkCount) * 100) - 1)
            }

            //合并分片 所有上传结束通知后端进行合并分片
            this.mergeChunk(file.name,fileMd5,file.size)
            
        },

        async mergeChunk(fileName, identifier, size){
            const mergeRes = await this.$axios.post(api.mergeChunk, {
                fileName: fileName,
                identifier: identifier,
                size: size,
            })
            if (mergeRes.code != 1) {
                this.$message.error(
                    mergeRes.error,
                    3
                )
                this.fileList[0].loadingText = "文件成功失败"
                return
            }
            this.progress = 100
            this.fileList[0].loadingText = "文件成功上传"
            this.activeLink = mergeRes.data.link[0]
            this.ascertain()
        },

        async uploadMinFile(file){
            const formData = new FormData()
            formData.append("file",file)
            const res =  await this.$axios({
                url: api.postuploadFile,
                method: 'post',
                data: formData,
                onUploadProgress:(progressEvent)=>{
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    this.progress = complete
                }
            })
            if (res.code != 1) {
                this.$message.error(
                    res.error,
                    3
                )
                this.fileList[0].loadingText = "文件成功失败"
                return
            }
            this.progress = 100
            this.fileList[0].loadingText = "文件成功上传"
            this.activeLink = res.data.link[0]
            this.ascertain()
        },
        cancel(){
            this.state.state = "cancel"
            this.activeLink = null
            this.close()
        },
        ascertain(){
            this.state.state = "ascertain"
            this.close()
            this.activeLink = null
            this.fileList = []
            this.progress = 0
        },
        open() {
            this.isTrue = true;
        },
        close() {
            this.isTrue = false;
        },
        
    }
};
</script>

<style lang="less" scoped>
    .upload_file_box {
        user-select: none;
        pointer-events: none;
        z-index: 20;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transform: perspective(1px) scale(1.1);
        transition: visibility 0s linear .15s,opacity .15s 0s,transform .15s;
        display: flex;
        align-items: center;
        justify-content: center;
        .upload_file_container{
            background-color: #fff;
            width: 33rem;
            margin: 0 auto;
            position: relative;
            background-image: url("/img/login.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin-top: -9%;
            .upload_file_title{
                font-size: 13px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                .upload_file_title_l{
                    display: block;
                    align-items: center;
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .upload_file_tabs{
                .upload_file_tabs_l{
                    margin-right: 10px;
                }
                .upload_file_tabs_item{
                    text-align: center;
                    cursor: pointer;
                }
                .picked{
                    color: brown;
                }
            }
            .upload_file_content{
                padding: 20px 20px;
                .upload_file_content_box{
                    width: 100%;
                }
                .file_progress{
                    margin-top: 10px;
                    position: relative;
                    overflow: hidden;
                    .file_info{
                        position: relative;
                        z-index: 1;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                        .file_info_icon{
                            font-size: 30px;
                        }
                        .file_text{
                            flex: 1;
                            display: flex;
                            justify-content: flex-end;
                            .file_size{
                                margin: 0 20px;
                            }
                        }
                    }
                    .file_progress_box{
                        position: absolute;
                        height: 50px;
                        width: 100%;
                        background-color: #e2eeff;
                        transform: translateX(-100%);
                    }
                }
            }
        }
        
    }
    .is_back_show {
        opacity: 1 !important;
        background: rgba(42, 44, 48, 0.7);
        pointer-events: auto !important;
        visibility: visible;
        transform: perspective(1px) scale(1);
        transition: visibility 0s linear 0s,opacity .15s 0s,transform .15s;
    }

    @media only screen and (max-width: 768px) {
    }
</style>