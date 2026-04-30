import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { loginUser } from '@/lib/dummyJsonApi';
import { AUTH_STORAGE_KEY } from '@/lib/constants';
import { loadJson, removeStored, saveJson } from '@/lib/storage';
import type { AuthResponse, LoginRequest, PersistedAuthState } from '@/types/auth';

function extractToken(response: AuthResponse): string | null {
  if (typeof response.accessToken === 'string' && response.accessToken.length > 0) {
    return response.accessToken;
  }

  if (typeof response.token === 'string' && response.token.length > 0) {
    return response.token;
  }

  return null;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthResponse | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => Boolean(user.value && token.value));
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}`.trim() : 'Guest'
  );

  function hydrate(): void {
    const snapshot = loadJson<PersistedAuthState>(AUTH_STORAGE_KEY);
    if (!snapshot) {
      return;
    }

    user.value = snapshot.user;
    token.value = snapshot.token;
  }

  function persist(): void {
    const snapshot: PersistedAuthState = {
      user: user.value,
      token: token.value
    };
    saveJson(AUTH_STORAGE_KEY, snapshot);
  }

  async function login(credentials: LoginRequest): Promise<void> {
    const response = await loginUser(credentials);
    const receivedToken = extractToken(response);
    if (!receivedToken) {
      throw new Error('Login succeeded but no token was returned.');
    }

    user.value = response;
    token.value = receivedToken;
    persist();
  }

  function logout(): void {
    user.value = null;
    token.value = null;
    removeStored(AUTH_STORAGE_KEY);
  }

  hydrate();

  return {
    user,
    token,
    isAuthenticated,
    fullName,
    login,
    logout
  };
});

