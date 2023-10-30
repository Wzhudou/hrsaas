<template>
    <el-row type="flex" justify="space-between" align="middle"  style="height: 40px; width: 100%;">
        <el-col>
            <!-- 左侧内容 -->
            <span>
                {{ treeNode.name }}
            </span>
        </el-col>
        <el-col :span="4">
            <!-- 右侧内容 -->
            <el-row type="flex" justify="end">
                <el-col>{{treeNode.manager}}</el-col>
                <el-col>
                    <!-- 下拉菜单 -->
                    <el-dropdown>
                        <span>
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <!-- 具名插槽 -->
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>添加子部门</el-dropdown-item>
                            <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
                            <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'tree-tools',
        props: {
            treeNode: {
                type: Object,
                default: () => {}
            },
            isRoot: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>