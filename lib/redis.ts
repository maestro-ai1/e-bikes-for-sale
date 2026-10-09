import { Redis } from '@upstash/redis';

// Vercel's Storage tab can assign any of these names depending on the prefix chosen when connecting Upstash.
const CREDENTIAL_CANDIDATES: [string, string][] = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
];

let cached: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cached !== undefined) return cached;
  for (const [urlKey, tokenKey] of CREDENTIAL_CANDIDATES) {
    const url = process.env[urlKey];
    const token = process.env[tokenKey];
    if (url && token) {
      cached = new Redis({ url, token });
      return cached;
    }
  }
  cached = null;
  return null;
}

/** Local development only: when no Redis is configured, use a process-memory hash so the whole flow can be tested. Never used in production. */
const g = globalThis as unknown as { __ebfsDevMemory?: Map<string, Map<string, string>> };
const devMemory = (g.__ebfsDevMemory ??= new Map<string, Map<string, string>>());
const devMemoryEnabled = () => process.env.NODE_ENV !== 'production' && !getRedis();

export const isStoreConfigured = () => getRedis() !== null || devMemoryEnabled();

export async function hset(key: string, field: string, value: unknown) {
  const r = getRedis();
  if (r) return void (await r.hset(key, { [field]: JSON.stringify(value) }));
  if (devMemoryEnabled()) {
    if (!devMemory.has(key)) devMemory.set(key, new Map());
    devMemory.get(key)!.set(field, JSON.stringify(value));
  }
}

export async function hget<T>(key: string, field: string): Promise<T | null> {
  const r = getRedis();
  if (r) {
    const raw = await r.hget<unknown>(key, field);
    if (!raw) return null;
    return (typeof raw === 'string' ? JSON.parse(raw) : raw) as T;
  }
  if (devMemoryEnabled()) {
    const raw = devMemory.get(key)?.get(field);
    return raw ? (JSON.parse(raw) as T) : null;
  }
  return null;
}

export async function hgetall<T>(key: string): Promise<T[]> {
  const r = getRedis();
  if (r) {
    const all = await r.hgetall<Record<string, unknown>>(key);
    if (!all) return [];
    return Object.values(all).map((v) => (typeof v === 'string' ? JSON.parse(v) : v)) as T[];
  }
  if (devMemoryEnabled()) return [...(devMemory.get(key)?.values() || [])].map((v) => JSON.parse(v) as T);
  return [];
}

export async function hdel(key: string, field: string) {
  const r = getRedis();
  if (r) return void (await r.hdel(key, field));
  if (devMemoryEnabled()) devMemory.get(key)?.delete(field);
}

export async function hclear(key: string) {
  const r = getRedis();
  if (r) return void (await r.del(key));
  if (devMemoryEnabled()) devMemory.delete(key);
}
