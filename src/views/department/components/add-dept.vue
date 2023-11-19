<template>
    <el-dialog title="新增部门" :visible="showDialog" @close="close">
        <!-- 防止弹层内容 -->
    </el-dialog>
</template>

<script>
    export default {
        name: 'AddDept',
        props: {
            showDialog: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            close() {
                // 关闭弹层
                // 修改父组件的值
                this.$emit('update:showDialog', false)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>