export class GameData {
    size: number = 4;
    grid: number[][];
    
    constructor() {
        this.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
    
    get(row: number, col: number): number {
        return this.grid[row][col];
    }
    
    set(row: number, col: number, value: number) {
        this.grid[row][col] = value;
    }
    
    getEmptyCells(): {row: number, col: number}[] {
        const empty: {row: number, col: number}[] = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    empty.push({row, col});
                }
            }
        }
        return empty;
    }
    
    spawnNewTile(): boolean {
        const empty = this.getEmptyCells();
        if (empty.length === 0) return false;
        
        const {row, col} = empty[Math.floor(Math.random() * empty.length)];
        this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
        return true;
    }
    
    // 核心移动逻辑 - 左滑
    moveLeft(): boolean {
        let moved = false;
        for (let row = 0; row < this.size; row++) {
            // 取出这行非0数字
            let values = this.grid[row].filter(v => v !== 0);
            
            // 合并相邻相同数字
            for (let i = 0; i < values.length - 1; i++) {
                if (values[i] === values[i + 1]) {
                    values[i] *= 2;
                    values.splice(i + 1, 1);
                }
            }
            
            // 补0到长度4
            while (values.length < this.size) {
                values.push(0);
            }
            
            // 检查是否有变化
            if (JSON.stringify(this.grid[row]) !== JSON.stringify(values)) {
                moved = true;
                this.grid[row] = values;
            }
        }
        return moved;
    }
    
    // 右滑（先反转，再左滑，再反转）
    moveRight(): boolean {
        this.reverseRows();
        const moved = this.moveLeft();
        this.reverseRows();
        return moved;
    }
    
    // 上滑（转置，左滑，再转置）
    moveUp(): boolean {
        this.transpose();
        const moved = this.moveLeft();
        this.transpose();
        return moved;
    }
    
    // 下滑（转置，右滑，再转置）
    moveDown(): boolean {
        this.transpose();
        const moved = this.moveRight();
        this.transpose();
        return moved;
    }
    
    // 辅助：反转每一行
    private reverseRows() {
        for (let row = 0; row < this.size; row++) {
            this.grid[row] = this.grid[row].reverse();
        }
    }
    
    // 辅助：转置矩阵（行变列）
    private transpose() {
        const newGrid = Array(this.size).fill(0).map(() => Array(this.size).fill(0));
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                newGrid[col][row] = this.grid[row][col];
            }
        }
        this.grid = newGrid;
    }
    
    // 检查游戏是否结束
    isGameOver(): boolean {
        // 有空格子？还能玩
        if (this.getEmptyCells().length > 0) return false;

        this.grid.forEach(val => val.forEach(val_2 => {if(val_2.toString() == "2048"){ return false; console.log("游戏通关")}}))
        
        // 检查相邻相同数字
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const val = this.grid[row][col];
                if (col < this.size - 1 && this.grid[row][col + 1] === val) return false;
                if (row < this.size - 1 && this.grid[row + 1][col] === val) return false;
            }
        }
        return true;
    }
}