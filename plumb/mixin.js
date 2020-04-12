export default {
  data() {
      return {
          baseOptions: {
              // anchor: 'Continuous',
              maxConnections: -1,
              // 动态锚点、位置自适应
              Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
              Container: 'flowContainer',
              // 连线的样式 StateMachine、Flowchart，Bezier
              Connector: 'StateMachine',
              // 鼠标不能拖动删除线
              ConnectionsDetachable: false,
              // 删除线的时候节点不删除
              DeleteEndpointsOnDetach: false,
              // 连线的端点：圆形
              Endpoint: ['Dot', {radius: 3}],
              // 连线的端点：矩形
              // Endpoint: ['Rectangle', {height: 10, width: 10}],
              // 线端点的样式
              EndpointStyle: {fill: '', outlineWidth: 1},
              // 是否打开jsPlumb的内部日志记录
              LogEnabled: true,
              // 绘制线
              PaintStyle: {stroke: 'lightblue', strokeWidth: 2},
              // 绘制箭头
              Overlays: [
                  ['Arrow', {width: 10, length: 8, location: 1, foldback: 0.8}],
                  // ['Arrow', {width: 10, length: 8, location: .5, foldback: 0.8}],
                  ['Label', {location: 0.1, id: 'label', cssClass: 'aLabel'}]
              ],
              // 绘制图的模式 svg、canvas
              RenderMode: 'canvas',
              // 没看到效果
              DragOptions: {
                  cursor: 'pointer',
                  zIndex: 2000,
                  hoverClass: 'dropHover',
                  activeClass: 'dragActive'
              },
              scope: 'green dot',
              // 鼠标滑过线的样式
              HoverPaintStyle: {stroke: 'lightblue'},
              // 滑过锚点效果
              // EndpointHoverStyle: {fill: 'red'}
          }
      }
  }
}
