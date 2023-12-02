<template>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <!-- 
            action 为自动上传 这个项目是手动上传
            show-file-list 是否展示上传列表
         -->
    </el-upload>
</template>

<script>
  export default {
    props: {
        value: {
            type: String,
            default: ''
        },
    },
    methods: {
        // 检查头像上传 =》 判断文件的类型和大小 =》返回true（继续上传）或者false（停止上传）
        beforeAvatarUpload(file) {
            // 支持格式 JPEG png gif bmp
            const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
            const isLt2M = file.size / 1024 / 1024 < 5; // 5M
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPEG PNG GIF BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>