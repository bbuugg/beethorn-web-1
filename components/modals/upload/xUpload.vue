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
                    <uploader
                        ref="uploader1"
                        :options="options"
                        :file-status-text="fileStatusText"
                        :autoStart="false"
                        @file-added="onFileAdded"
                        @file-progress="onFileProgress"
                        @file-success="onFileSuccess"
                        @file-error="onFileError"
                        >
                            <uploader-unsupport></uploader-unsupport>
                            <!-- <p>Drop files here to upload or</p> -->
                            <uploader-btn class="uploader-btn" >
                                选择文件
                            </uploader-btn>
                            <uploader-list></uploader-list>
                            
                        </uploader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/index'
import { mapState } from "vuex"
// import SparkMD5 from 'spark-md5';
export default {
    data() {
        return {
            uploaderInstance:undefined,
            options: {
                // headers: { Authorization: "Bearer "},
              
                target: api.UploadChunk,
                testChunks: false,
                chunkSize: "2048000",  //5MB
                simultaneousUploads: 3, //并发上传数
                maxChunkRetries: 2, //最大自动失败重试上传次数
                parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) { //格式化时间
                    return parsedTimeRemaining
                        .replace(/\syears?/, '年')
                        .replace(/\days?/, '天')
                        .replace(/\shours?/, '小时')
                        .replace(/\sminutes?/, '分钟')
                        .replace(/\sseconds?/, '秒')
                },
                testChunks: true,   //开启服务端分片校验
                // 服务器分片校验函数
                checkChunkUploadedByResponse: (chunk, message) => {
                    let obj = JSON.parse(message);
                    // console.log('sss',chunk,message,obj)
                    // if (obj.data.isExist=='true') {
                        
                    //     this.statusTextMap.success = '秒传文件,处理中····';
                    //     this.form.videoUrl = obj.data.url
                    //     return true;
                    // }
                    return (obj.data.result || []).indexOf((chunk.offset + 1).toString()) >= 0
                },
            },
            statusTextMap: {
                success: '文件上传成功',
                error: '上传出错了',
                uploading: '上传中...',
                paused: '暂停',
                waiting: '等待中...',
                cmd5: '准备中...'
            },
            fileStatusText: (status, response) => {
                return this.statusTextMap[status];
            },

            mediaSize:1000, // 文件大小
            mediaType:null,
            imageType:[".png",".jpg",".gif",".jpeg"], // 图片类型
            audioType:[".mp3",".wav"], // 图片类型
            videoType:[".mp4"], // 图片类型
            otherType:[".crt"], // 其他类型

            activeLink: null,
            isTrue: false,
            state: null // 准备（prepare） 确定（ ascertain） 取消（cancel）
        };
    },
    computed:{
        ...mapState(["file"]),
        ...mapState("user",["token"]),
    },
    methods: {
        async confirm(
            mediaType
        ) {
            this.options.headers = { Authorization: "Bearer " + this.token}; // 定时器里是拿不到this的,需要更改指向
            this.open();
            this.$refs.uploader1.uploader.opts.headers = { Authorization: "Bearer "+this.token}
            this.mediaType = mediaType || "Image"
            this.imageType = this.file.imageType
            this.audioType = this.file.audioType
            this.videoType = this.file.videoType
            this.otherType = this.file.otherType
            this.mediaSize = this.file.fileSize
            // this.queryParam.ext = this.mediaType
  
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
        onFileAdded(file) { // 文件上传前的校验
            if (!file) return;
            if ((this.mediaSize * 1024 * 1024) < file.size) {
                this.$message.error(
                    "文件太大了",
                    3
                )
                this.$refs.uploader1.uploader.removeFile(file)
                return
            }
           
            const type = this.$getType(file.name)

            if (this.mediaType === "Image" && this.imageType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                 this.$refs.uploader1.uploader.removeFile(file)
                return
            }
            if (this.mediaType === "Audio" && this.audioType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                 this.$refs.uploader1.uploader.removeFile(file)
                return
            }
            if (this.mediaType === "Video" && this.videoType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                 this.$refs.uploader1.uploader.removeFile(file)
                return
            }
            if (this.mediaType === "Other" && this.otherType.indexOf(type) == -1 ) {
                this.$message.error(
                    "文件类型不正确",
                    3
                )
                this.$refs.uploader1.uploader.removeFile(file)
                return
            }
            this.computeMD5(file);
        },
        //计算MD5
        computeMD5(file) {
            let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            chunkSize = 1024*1024*2,
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader();
            let time = new Date().getTime();
            file.cmd5 = true;
            fileReader.onload = (e) => {
                spark.append(e.target.result);   // Append array buffer
                currentChunk++;
            
                if (currentChunk < chunks) {
                    //console.log(`第${currentChunk}分片解析完成, 开始第${currentChunk +1} / ${chunks}分片解析`);
                    let percent = Math.floor(currentChunk / chunks * 100);
                    file.cmd5progress = percent;
                    loadNext();
                } else {
                    console.log('finished loading');
                    let md5 = spark.end();
                    console.log(`MD5计算完成：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                    spark.destroy(); //释放缓存
                    file.uniqueIdentifier = md5; //将文件md5赋值给文件唯一标识
                    file.cmd5 = false; //取消计算md5状态
                    file.resume(); //开始上传
                }
            };
            fileReader.onerror = () => {
                console.warn('oops, something went wrong.');
                file.cancel();
            };
            
            let loadNext = () =>　{
                let start = currentChunk * chunkSize,
                    end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            
                fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
            };
            
            loadNext();
        },
        // 文件进度的回调
        onFileProgress(rootFile, file, chunk) {
            console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
        },
        async onFileSuccess(rootFile, file, response, chunk) {
            let res = JSON.parse(response);
            
            // this.form.videoUrl = resp.data.url
            //合并分片 所有上传结束通知后端进行合并分片
            if (res.code === 1 && res.data.result === "needMerge") {
                const mergeRes = await this.$axios.post(api.mergeChunk, {
                    fileName: file.name,
                    identifier: file.uniqueIdentifier,
                    size: file.size,
                })
                
                this.$refs.uploader1.uploader.removeFile(file)
                this.activeLink = mergeRes.data.link[0]
                this.ascertain()
            }
        },
        onFileError(rootFile, file, response, chunk) {
            console.log('Error:', response)
            this.$refs.uploader1.uploader.removeFile(file)
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
                    /deep/ .uploader-btn{
                        width: 100%;
                        height: 200px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 1px dashed #000;
                    }
                    /deep/ .uploader-desc{
            
                        margin: 10px 0;
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