import { _decorator, Component, Graphics, UITransform, Color } from 'cc';
const { ccclass } = _decorator;

@ccclass('GridItemGraphics')
export class GridItemGraphics extends Component {
    start() {
        // 获取Graphics组件
        const g = this.getComponent(Graphics);
        if (!g) {
            console.error('请先添加Graphics组件');
            return;
        }
        
        // 获取UITransform组件
        const transform = this.getComponent(UITransform);
        if (!transform) {
            console.error('节点缺少UITransform组件');
            return;
        }
        
        // 设置线条
        g.lineWidth = 2;
        g.strokeColor = new Color(0, 0, 0); // 黑色边框
        
        // 获取格子大小
        const width = transform.width;
        const height = transform.height;
        
        // 绘制矩形边框（从中心点偏移）
        g.rect(-width/2, -height/2, width, height);
        g.stroke();
    }
}