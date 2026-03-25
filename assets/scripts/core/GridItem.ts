import { _decorator, Component, Label, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

const TILE_COLORS: {[key: number]: string} = {
    2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
    16: '#f59563', 32: '#f67c5f', 64: '#f65e3b',
    128: '#edcf72', 256: '#edcc61', 512: '#edc850',
    1024: '#edc53f', 2048: '#edc22e'
};

const EMPTY_COLOR = '#cdc1b4';

@ccclass('GridItem')
export class GridItem extends Component {
    @property(Label)
    numberLabel: Label = null;
    
    private _value: number = 0;
    
    get value(): number {
        return this._value;
    }
    
    set value(v: number) {
        this._value = v;
        // 更新数字显示
        if (this.numberLabel) {
            this.numberLabel.string = v === 0 ? '' : v.toString();
        }
        
        // 更新背景颜色
        const sprite = this.getComponent(Sprite);
        if (sprite) {
            const hex = v === 0 ? EMPTY_COLOR : (TILE_COLORS[v] || EMPTY_COLOR);
            sprite.color = new Color(hex);
        }
    }
}