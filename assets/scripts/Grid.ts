import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

const COLORS = ['#ECE0D5', '#EBDCC2', '#F4A873', '#F18151', '#F1654D', '#F0462D', '#9A8032', '#F4CD50', '#78C93A', '#C9963A', '#C2BC2F', '#E64AA4', '#37C377', '#0CF694', '#35B8B5', '#984DD9']


@ccclass('Grid')
export class Grid extends Component {
    start() {
 

    }

    update(deltaTime: number) {
        
    }

    private lblNum: cc.Label

    private _num: number = 0
    public get num(): number { return this._num }
    public set num(val: number) {
        this._num = val
        this.lblNum.string = val.toString()

        this.setColor()
    }

    private _pos: cc.Vec2
    public get pos(): cc.Vec2 { return this._pos }
}


