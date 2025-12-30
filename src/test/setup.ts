import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte/svelte5';

afterEach(() => {
  cleanup();
});
