<template>
  <el-container>
   <el-header>
     <Head
      @showOrHiddenGride="showOrHiddenGride"
      @zoomIn="zoomIn"
      @zoomOut="zoomOut"
    />
   </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu
          @addNode="addNode"
          @changMouseType="changMouseType"
          @save="save"
          @clean="clean"
        />
      </el-aside>
      <el-container>
        <el-main>
          <div
            :class="isGride ? 'gride scroll' : 'scroll'"
            v-loading="loading"
            :element-loading-text="`X ${ scale.toFixed(1) }`"
            element-loading-spinner="null"
            element-loading-customClass="load"
            element-loading-background="rgba(0, 0, 0, 0)"
          >
            <div ref="diagramContainer" id="diagramContainer" :style="containerStyle">
              <NodeItem
                ref="nodes"
                v-for="(node, index) in nodeList" :key="index"
                v-show="node.show"
                :id="node.id"
                :node="node"
                :type="node.type"
                :name="node.name"
                absoulate="true"
                @clickNode="clickNode"
              >
              </NodeItem>
            </div>
          </div>
        </el-main>
      </el-container>
      <el-aside width="200px">
        <Action
          v-if="focusNode.name"
          :node="focusNode"
          @delNode="delNode"
        />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './components/plumb/menu'
import mixin from './components/plumb/mixin'
import NodeItem from './components/plumb/NodeItem'
import Head from './components/plumb/Head'
import Action from './components/plumb/action'
export default {
  name: '',
  components: { Menu, NodeItem, Head, Action },
  props: {},
  mixins: [ mixin ],
  data () {
    return {
      nodeList: [], // 节点列表
      connectionList: [], // 连线的列表
      jsPlumb: {}, // jsPlumb 实例
      isGride: false, // 是否显示 栅格
      type: 'mouse', // 当前工具类型
      focusNode: {}, // 当前选中的node节点
      scale: 1, // 操作区域缩放
      loading: false, // 控制显示缩放倍数
    }
  },
  watch: {
  },
  computed: {
    containerStyle() {
      if (this.jsPlumb.getZoom ) {
        return {
          transform: `scale(${this.scale})`
        }
      } else {
        return {}
      }
    }
  },
  created () {
    if (localStorage.getItem('nodemsg')) {
      this.nodeList = JSON.parse(localStorage.getItem('nodemsg')).node
      this.connectionList = JSON.parse(localStorage.getItem('nodemsg')).line
    }
  },
  mounted () {
    import('jsplumb').then( ({ jsPlumb }) => {
      jsPlumb.ready(() => {
        this.jsPlumb = jsPlumb
        this.jsPlumbInit()
      })
    })
  },
  methods: {
    showOrHiddenGride () {
      this.isGride = !this.isGride
    },
    getUUID() {
      return Math.random().toString(36).substr(3, 10)
    },
    jsPlumbInit () {
      const { jsPlumb } = this
       console.log(jsPlumb)
      jsPlumb.importDefaults(this.baseOptions) // 导入默认配置
      jsPlumb.setSuspendDrawing(false, true); // 会使整个jsPlumb立即重绘。
      jsPlumb.bind('click', (connect) => {
        this.$alert('是否删除次line', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            action === 'confirm' && jsPlumb.deleteConnection(connect)
            this.connectionList = this.connectionList.filter(v => v.sourceId !== connect.sourceId || v.targetId !== connect.targetId)
          }
        });
      })
      jsPlumb.bind("connection",(info) => {
        if (info.sourceId === info.targetId) {
          jsPlumb.getAllConnections().forEach(v => {
            v.sourceId === info.sourceId && v.targetId === info.targetId &&  jsPlumb.deleteConnection(v)
          })
          return
        }
        this.connectionList.some(v => v.sourceId === info.sourceId && v.targetId === info.targetId)
          ? ''
          : this.connectionList.push({
              sourceId: info.sourceId,
              targetId: info.targetId
            })
      });
      this.renderLine() // 渲染连线
    },
    renderLine () { // 渲染连线
      this.connectionList.forEach(v => {
        this.jsPlumb.connect({
          source: v.sourceId, target: v.targetId
        }, {
          endpoint:"Dot",
          anchor: 'Continuous'
        })
      })
    },
    changMouseType (type) {
      this.type = type
      switch(type) {
        case 'mouse': 
          this.drawLine(false)
          this.dragNode(false)
          break
        case 'line':
          this.drawLine(true)
          break
        case 'drag':
          this.dragNode(true)
          break
      }
    },
    drawLine (type) { //连线
      if (type) {
        this.dragNode(false)
        this.jsPlumb.repaintEverything()
        this.nodeList.forEach(v => {
          v.type !== 'end' &&  this.jsPlumb.makeSource(v.id, {
            endpoint:"Dot",
            anchor: "Continuous"
          })
          v.type !== 'start' && this.jsPlumb.makeTarget(v.id, {
            endpoint:"Dot",
            anchor: "Continuous"
          })
        })
      } else {
        this.jsPlumb.unmakeEverySource()
      }
    },
    dragNode (type) { // 拖动
      this.drawLine(false)
      this.nodeList.forEach(v => {
        if (type) {
          this.jsPlumb.draggable(v.id,{
            containment: 'parent'
          })
          this.jsPlumb.setDraggable(v.id, type)
        } else {
          this.jsPlumb.setDraggable(v.id, type)
        }
      })
    },
    addNode (evt, nodeMenu, mousePosition) { // 添加节点
      let nodeId = this.getUUID()
      let position = this.$refs.diagramContainer.getBoundingClientRect()
      let left = evt.originalEvent.clientX - position.left - ~~mousePosition.offsetX
      let top = evt.originalEvent.clientY - position.top - ~~mousePosition.offsetY
      var node = {
        id: nodeId,
        name: nodeMenu.name,
        type: nodeMenu.type,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.ico,
        show: true
      }
      this.nodeList.push(node)
    },
    clickNode (node) { // 选中 节点
      if (this.type == 'mouse') {
        this.focusNode = node
      } else {
        this.focusNode = {}
      }
    },
    zoomIn () { // 放大
      this.jsPlumb.setZoom(this.jsPlumb.getZoom() + .1)
      this.scale += .1
      this.showSize()
    },
    zoomOut () { // 缩小
      this.jsPlumb.setZoom(this.jsPlumb.getZoom() - .1)
      this.scale -= .1
      this.showSize()
    },
    showSize () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    save () { // 保存
      let saveData = JSON.parse(JSON.stringify(this.nodeList.filter(v => v.show !== false)))
      saveData.forEach(v => {
        this.$refs.nodes.forEach(item => {
          if (v.id === item.node.id) {
            v.top = item.$el.offsetTop + 'px'
            v.left = item.$el.offsetLeft + 'px'
           }
        })
      })
      localStorage.setItem('nodemsg', JSON.stringify({
        node: saveData,
        line: this.connectionList
      }))
    },
    clean () { // 清空
      this.nodeList.forEach(v => {
        this.jsPlumb.remove(v.id)
      })
      this.$set(this, 'nodeList', [])
      this.$set(this, 'connectionList', [])
      localStorage.setItem('nodemsg', '')
    },
    delNode () { // 删除 节点
      const { id } = this.focusNode
      this.nodeList.forEach(v => {
        v.id === id && (v.show =false)
      })
      this.$nextTick(() => {
        this.jsPlumb.removeAllEndpoints(id)
      })
      this.connectionList = this.connectionList.filter(v => v.sourceId !== id && v.targetId !== id)
      this.focusNode = {}
    }
  }
}
</script>
<style lang="scss" scope>
  #diagramContainer {
    height: 800px;
    position: relative;
    font-size: 12px;
    transform-origin: left top;
  }
  .scroll {
    height: 800px;
    overflow: auto;
    border: 1px solid gray;
  }
  .scroll /deep/ .el-loading-text{
    font-size: 28px !important;
    color: #ccc !important;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .gride{
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;
  }
</style>
