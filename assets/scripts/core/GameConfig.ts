// 游戏全局配置
export const GameConfig = {
    // 网格参数
    gridSize: 4,
    cellSize: 150,
    spacing: 20,
    
    // 颜色配置
    colors: {
        tile: {
            2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
            16: '#f59563', 32: '#f67c5f', 64: '#f65e3b',
            128: '#edcf72', 256: '#edcc61', 512: '#edc850',
            1024: '#edc53f', 2048: '#edc22e'
        },
        empty: '#cdc1b4',
        text: {
            light: '#f9f6f2',    // 深色背景上的文字
            dark: '#776e65'       // 浅色背景上的文字
        }
    },
    
    // 广告配置（穿山甲）
    ad: {
        rewardedId: '123456',      // 激励视频ID（复活、撤销）
        interstitialId: '789012',  // 插屏ID（游戏结束）
        bannerId: '345678'         // Banner ID（首页底部）
    },
    
    // 音效配置
    audio: {
        bgm: true,
        sfx: true
    }
};