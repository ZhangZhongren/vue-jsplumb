<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>信息</span>
    </div>
    <el-form ref="form" :model="data" size="mini" label-width="40px">
       <el-row>
         <el-form-item label="名称">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="类型">
          <el-input v-model="data.type"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-button type="danger" size="mini" @click="$emit('delNode')">删除</el-button>
      </el-row>
    </el-form>
   
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    node: {}
  },
  data () {
    return {
      data: this.node
    }
  },
  watch: {
    node () {
      this.data = this.node
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
