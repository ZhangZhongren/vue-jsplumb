<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>节点</span>
      </div>
      <draggable @mousedown.native="$emit('changMouseType', 'mouse')" @end="end" @start="move" v-model="dom" :options="draggableOptions">
        <NodeItem v-for="(v, k) in dom" :key="k" :node="v" />
      </draggable>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>工具</span>
      </div>
      <el-row>
        <el-col :span="12">
          <el-button @click="$emit('changMouseType', 'line')" size="mini">画线</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="$emit('changMouseType', 'drag')" size="mini">拖动</el-button>
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-col :span="12">
          <el-button @click="$emit('changMouseType', 'mouse')" size="mini">鼠标</el-button>
        </el-col>
      </el-row>
       <el-row class="mt20">
        <el-col :span="12">
          <el-button @click="$emit('save')" size="mini"> 保存</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="$emit('clean')" size="mini" >清空</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import NodeItem from './NodeItem.vue'
import draggable from 'vuedraggable'
export default {
  name: '',
  components: { NodeItem, draggable },
  props: {
    scale: {
      type: Number
    }
  },
  data () {
    return {
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        // 不使用H5原生的配置
        forceFallback: true,
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      dom: [{
        id: '11',
        type: 'start',
        name: '开始节点',
        show: true,
        // 自定义覆盖样式
        style: {}
      },
      {
        id: '12',
        type: 'middle',
        name: '中间节点',
        show: true,
        // 自定义覆盖样式
        style: {}
      },
      {
        id: '13',
        type: 'end',
        name: '结束',
        show: true,
        // 自定义覆盖样式
        style: {}
      },
      ],
      mousePosition: {},
      nodeMenu: {}
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
    getMenu(type) {
      let item = ''
      this.dom.forEach(v => {
        if (v.type === type) {
          item = v
        }
      })
      return item
    },
    move(evt) {
      this.mousePosition = evt.originalEvent
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenu(type)
    },
    // 拖拽结束时触发
    end(evt) {
        this.$emit('addNode', evt, this.nodeMenu, this.mousePosition)
    },
  }
}
</script>
<style>
  .mt20{
    margin-top: 20px;
  }
</style>
