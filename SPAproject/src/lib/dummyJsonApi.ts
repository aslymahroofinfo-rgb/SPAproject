import { API_BASE_URL } from '@/lib/constants';
import type { AuthResponse, LoginRequest } from '@/types/auth';
import type { CategoryEndpointItem, Product, ProductListResponse } from '@/types/product';

interface ApiErrorBody {
  message?: string;
  error?: string;
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return 'message' in value || 'error' in value;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    if (isApiErrorBody(body) && typeof body.message === 'string') {
      throw new Error(body.message);
    }

    if (isApiErrorBody(body) && typeof body.error === 'string') {
      throw new Error(body.error);
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  return body as T;
}

function parseCategory(item: CategoryEndpointItem): string | null {
  if (typeof item === 'string') {
    return item;
  }

  if (typeof item === 'object' && item !== null && typeof item.slug === 'string') {
    return item.slug;
  }

  return null;
}

export async function fetchProducts(limit = 100): Promise<Product[]> {
  const payload = await request<ProductListResponse>(`/products?limit=${limit}`);
  return payload.products;
}

export async function fetchProductById(productId: number): Promise<Product> {
  return request<Product>(`/products/${productId}`);
}

export async function fetchCategories(): Promise<string[]> {
  const payload = await request<unknown>('/products/categories');
  if (!Array.isArray(payload)) {
    return [];
  }

  const categories = payload
    .map((entry) => parseCategory(entry as CategoryEndpointItem))
    .filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);

  return [...new Set(categories)];
}

export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
}

