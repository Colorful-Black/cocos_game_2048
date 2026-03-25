// AudioManager.ts
import { AudioClip, AudioSource, resources } from 'cc';

export class AudioManager {
    private static bgmSource: AudioSource;
    private static sfxSource: AudioSource;
    
    // 预加载所有音效
    static preload() {
        resources.loadDir('audio', AudioClip);
    }
    
    // 播放移动音效
    static playMove() {
        // 播放 move.mp3
    }
    
    // 播放合并音效
    static playMerge() {
        // 播放 merge.mp3
    }
}