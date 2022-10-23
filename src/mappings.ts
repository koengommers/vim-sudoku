import { Mapping } from './hooks/useMappings';

const mappings: Mapping[] = [{
  trigger: 'j',
  action: { type: 'MOVE_VERTICAL', payload: 1 }
}, {
  trigger: 'k',
  action: { type: 'MOVE_VERTICAL', payload: -1 }
}, {
  trigger: 'h',
  action: { type: 'MOVE_HORIZONTAL', payload: -1 }
}, {
  trigger: 'l',
  action: { type: 'MOVE_HORIZONTAL', payload: 1 }
}, {
  trigger: 'b',
  action: { type: 'MOVE_BEGIN_OF_CELL' }
}, {
  trigger: 'w',
  action: { type: 'MOVE_TO_NEXT_CELL' }
}, {
  trigger: 'e',
  action: { type: 'MOVE_END_OF_CELL' }
}, {
  trigger: 'gg',
  action: { type: 'MOVE_TO_TOP' }
}, {
  trigger: 'G',
  action: { type: 'MOVE_TO_BOTTOM' }
}, {
  trigger: '1',
  action: { type: 'FILL', payload: 1 }
}, {
  trigger: '2',
  action: { type: 'FILL', payload: 2 }
}, {
  trigger: '3',
  action: { type: 'FILL', payload: 3 }
}, {
  trigger: '4',
  action: { type: 'FILL', payload: 4 }
}, {
  trigger: '5',
  action: { type: 'FILL', payload: 5 }
}, {
  trigger: '6',
  action: { type: 'FILL', payload: 6 }
}, {
  trigger: '7',
  action: { type: 'FILL', payload: 7 }
}, {
  trigger: '8',
  action: { type: 'FILL', payload: 8 }
}, {
  trigger: '9',
  action: { type: 'FILL', payload: 9 }
}, {
  trigger: 'x',
  action: { type: 'CLEAR' }
}, {
  trigger: 'r',
  action: { type: 'RESET_PUZZLE' }
}, {
  trigger: '0',
  action: { type: 'MOVE_TO_BEGIN' }
}, {
  trigger: '$',
  action: { type: 'MOVE_TO_END' }
}, {
  trigger: '^',
  action: { type: 'MOVE_TO_FIRST_CHAR' }
}];

export default mappings
