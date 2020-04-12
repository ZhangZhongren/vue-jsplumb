<template>
  <div
    :class="absoulate ? 'start absoulate' : 'start' "
    :type="node.type"
    :style="nodeContainerStyle"
    @click="$emit('clickNode', node)"
    >{{ node.name }}</div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    node: {
      type: Object
    },
    absoulate: {
      default: false
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
    nodeContainerStyle () {
      return {
        top: this.node.top,
        left: this.node.left
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
  .start{
    /* position: absolute; */
    width: 90px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .absoulate {
    position: absolute;
  }
</style>
