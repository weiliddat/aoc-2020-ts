import { performance } from 'perf_hooks';

export function bench(func: any): void {
  const start = performance.now();
  func();
  const end = performance.now();
  console.log(`${end - start}ms`);
}
