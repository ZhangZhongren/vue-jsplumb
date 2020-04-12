<template>
  <el-row>
    <el-col :span="1" :offset="20">
      <el-tooltip class="item" effect="light" content="网格" placement="bottom">
        <i class="el-icon-view" @click="$emit('showOrHiddenGride')"></i>
      </el-tooltip>
    </el-col>
    <el-col :span="1">
      <el-tooltip class="item" effect="light" content="放大" placement="bottom">
        <i class="el-icon-zoom-in" @click="$emit('zoomIn')"></i>
      </el-tooltip>
    </el-col>
    <el-col :span="1">
      <el-tooltip class="item" effect="light" content="缩小" placement="bottom">
        <i class="el-icon-zoom-out" @click="$emit('zoomOut')"></i>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {
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
<style scoped>
i{
  font-size: 24px;
  cursor: pointer;
}
</style>
