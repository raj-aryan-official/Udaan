/**
 * Audio Prompt Voiceover Hook for Low-Literacy Users
 * Supports Odia & English voice guidance
 * Udaan — Rural Education Platform
 */

import { useState, useCallback, useEffect } from 'react';
import soundService from '../services/soundService';
import storage from '../services/storage';
import { STORAGE_KEYS } from '../config/constants';

export function useVoiceover() {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [language, setLanguage] = useState<'or' | 'en'>('or');

  useEffect(() => {
    async function loadVoiceSettings() {
      const storedVoice = await storage.getItem(STORAGE_KEYS.VOICEOVER_ENABLED);
      const storedLang = await storage.getItem(STORAGE_KEYS.LANGUAGE);
      if (storedVoice !== null) {
        setIsEnabled(storedVoice === 'true');
      }
      if (storedLang === 'en' || storedLang === 'or') {
        setLanguage(storedLang);
      }
    }
    loadVoiceSettings();
  }, []);

  const speak = useCallback(
    (text: string, overrideLang?: 'or' | 'en') => {
      if (!isEnabled) return;
      soundService.speakPrompt(text, overrideLang || language);
    },
    [isEnabled, language]
  );

  const stop = useCallback(() => {
    soundService.stopAll();
  }, []);

  const toggleVoiceover = useCallback(async () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    await storage.setItem(STORAGE_KEYS.VOICEOVER_ENABLED, String(nextState));
  }, [isEnabled]);

  const changeLanguage = useCallback(async (lang: 'or' | 'en') => {
    setLanguage(lang);
    await storage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }, []);

  return {
    isEnabled,
    language,
    speak,
    stop,
    toggleVoiceover,
    changeLanguage,
  };
}

export default useVoiceover;
