import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('updates state and localStorage when the setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  test('rehydrates from an existing localStorage value on mount', () => {
    window.localStorage.setItem('existing-key', JSON.stringify({ foo: 'bar' }));
    const { result } = renderHook(() => useLocalStorage('existing-key', null));
    expect(result.current[0]).toEqual({ foo: 'bar' });
  });
});
