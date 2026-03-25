import { _decorator, Component, Prefab, instantiate, Node, Vec3, EventTouch, UITransform, Label, Vec2 } from 'cc';
import { GameData } from './GameData';
import { GridItem } from './GridItem';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    
    @property(Prefab)
    gridItemPrefab: Prefab = null;
    
    @property(Label)
    scoreLabel: Label = null;
    
    @property(Label)
    bestLabel: Label = null;
    
    private gameData: GameData = null;
    private gridNodes: Node[][] = [];
    private touchStart: Vec2 = null;
    private score: number = 0;
    private bestScore: number = 0;
    
    start() {
        // 加载最高分
        this.bestScore = localStorage.getItem('2048_best') ? parseInt(localStorage.getItem('2048_best')) : 0;
        if (this.bestLabel) this.bestLabel.string = "最高分：" + this.bestScore.toString();
        
        this.initGame();
        this.setupTouch();
    }
    
    initGame() {
        this.gameData = new GameData();
        this.score = 0;
        this.updateScore();
        
        // 生成网格
        this.generateGrid();
        
        // 生成两个初始数字
        this.gameData.spawnNewTile();
        this.gameData.spawnNewTile();
        
        // 更新显示
        this.updateAllTiles();
    }
    
    generateGrid() {
        // 清除旧节点
        this.node.removeAllChildren();
        this.gridNodes = [];
        
        const totalWidth = 4 * 150 + 3 * 20; // 660
        const startX = -totalWidth / 2 + 150 / 2;
        const startY = 200;
        
        for (let row = 0; row < 4; row++) {
            const rowNodes = [];
            for (let col = 0; col < 4; col++) {
                const x = startX + col * (150 + 20);
                const y = startY - row * (150 + 20);
                
                const tile = instantiate(this.gridItemPrefab);
                tile.setPosition(new Vec3(x, y, 0));
                this.node.addChild(tile);
                rowNodes.push(tile);
            }
            this.gridNodes.push(rowNodes);
        }
    }
    
    updateAllTiles() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const script = this.gridNodes[row][col].getComponent(GridItem);
                if (script) {
                    script.value = this.gameData.get(row, col);
                }
            }
        }
    }
    
    updateScore() {
        if (this.scoreLabel) {
            this.scoreLabel.string = "得分：" + this.score.toString();
        }
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('2048_best', this.bestScore.toString());
            if (this.bestLabel) this.bestLabel.string = "最高分：" + this.bestScore.toString();
        }
    }
    
    setupTouch() {
        this.node.on(Node.EventType.TOUCH_START, (e: EventTouch) => {
            this.touchStart = e.getUILocation();
        }, this);
        
        this.node.on(Node.EventType.TOUCH_END, (e: EventTouch) => {
            if (!this.touchStart) return;
            
            const end = e.getUILocation();
            const dx = end.x - this.touchStart.x;
            const dy = end.y - this.touchStart.y;
            
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
            
            let moved = false;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) moved = this.gameData.moveRight();
                else moved = this.gameData.moveLeft();
            } else {
                if (dy > 0) moved = this.gameData.moveUp();
                else moved = this.gameData.moveDown();
            }
            
            if (moved) {
                // 计算分数（累加合并后的值）
                this.calculateScore();
                this.gameData.spawnNewTile();
                this.updateAllTiles();
                this.updateScore();
                
                if (this.gameData.isGameOver()) {
                    console.log('游戏结束！');
                    // 可以加弹窗提示
                }
            }
            
            this.touchStart = null;
        }, this);
    }
    
    calculateScore() {
        // 简单计分：遍历所有格子，累加数字
        let total = 0;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                total += this.gameData.get(row, col);
            }
        }
        this.score = total;
    }
    
    restartGame() {
        this.initGame();
    }
}