import { computed, ref } from 'vue';
import { THEME_STORAGE_KEY } from '@/lib/constants';

type ThemeMode = 'light' | 'dark';

const mode = ref<ThemeMode>('light');
let initialized = false;

function detectPreferredTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(nextMode: ThemeMode): void {
  mode.value = nextMode;
  document.documentElement.classList.toggle('dark', nextMode === 'dark');
  localStorage.setItem(THEME_STORAGE_KEY, nextMode);
}

export function useTheme() {
  if (!initialized) {
    applyTheme(detectPreferredTheme());
    initialized = true;
  }

  const isDark = computed(() => mode.value === 'dark');

  function toggleTheme(): void {
    applyTheme(isDark.value ? 'light' : 'dark');
  }

  return {
    mode,
    isDark,
    toggleTheme
  };
}

