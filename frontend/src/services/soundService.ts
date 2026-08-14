/**
 * Audio & Voiceover Sound Service
 * Handles sound effects and voice prompts for low-literacy rural learners (Odia/English)
 * Udaan — Rural Education Platform
 */

export type SoundEffectType =
  | 'star'
  | 'coin'
  | 'streak'
  | 'correct'
  | 'wrong'
  | 'cheer'
  | 'click'
  | 'voiceover'
  | 'reward'
  | 'fanfare';

export interface SoundOptions {
  volume?: number;
  rate?: number;
  language?: 'or' | 'en';
}

class SoundService {
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a sound effect by name
   */
  public async playSound(type: SoundEffectType, options?: SoundOptions): Promise<void> {
    if (this.isMuted) return;

    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && type === 'voiceover') {
        return;
      }
    } catch (err) {
      console.warn('[SoundService] Audio playback warning:', err);
    }
  }

  /**
   * Alias method for playing sound effect
   */
  public async playEffect(type: SoundEffectType, options?: SoundOptions): Promise<void> {
    return this.playSound(type, options);
  }

  /**
   * Speaks a text prompt (voiceover for Odia / English voice guidance)
   */
  public async speakPrompt(text: string, lang: 'or' | 'en' = 'or'): Promise<void> {
    if (this.isMuted || !text) return;

    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'or' ? 'or-IN' : 'en-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.warn('[SoundService] Voiceover speech error:', err);
    }
  }

  public stopAll(): void {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }
}

export const soundService = new SoundService();
export default soundService;
