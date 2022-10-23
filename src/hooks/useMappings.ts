import { useCallback, useEffect, useRef } from 'react';
import { SudokuAction } from './useSudokuState';

export type Mapping = {
  trigger: String,
  action: SudokuAction
}

const getKeyString = (event: KeyboardEvent) => {
  return event.key;
}

const useMappings = (mappings: Mapping[], dispatch: (action: SudokuAction) => void) => {
  const buffer = useRef('');

  const handleKeyPress = useCallback(
    (event) => {
      buffer.current += getKeyString(event);
      const mapping = mappings.find((m) => m.trigger === buffer.current);
      if (mapping) {
        dispatch(mapping.action);
        buffer.current = '';
      } else if (mappings.some((m) => m.trigger.startsWith(buffer.current))) {
        setTimeout(() => {
          buffer.current = '';
        }, 500)
      } else {
        buffer.current = '';
      }
    },
    [mappings]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress])
}

export default useMappings;
