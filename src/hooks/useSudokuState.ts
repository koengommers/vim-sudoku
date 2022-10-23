import { useReducer } from 'react';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';

type Position = [number, number];

export type SudokuState = {
  puzzle: String,
  solution: String,
  state: String,
  position: Position,
  startTime: Date | null
}

export type SudokuAction = {
  type: 'SET_PUZZLE',
  payload: Sudoku
} | {
  type: 'RESET_PUZZLE'
} | {
  type: 'MOVE_VERTICAL',
  payload: number
} | {
  type: 'MOVE_HORIZONTAL',
  payload: number
} | {
  type: 'MOVE_END_OF_CELL'
} | {
  type: 'MOVE_BEGIN_OF_CELL'
} | {
  type: 'MOVE_TO_NEXT_CELL'
} | {
  type: 'MOVE_TO_TOP'
} | {
  type: 'MOVE_TO_BOTTOM'
} | {
  type: 'FILL',
  payload: number
} | {
  type: 'CLEAR'
}

const initialState: SudokuState = {
  puzzle: '',
  solution: '',
  state: '',
  position: [0, 0],
  startTime: null
};

const getIndex = ([x, y]: Position): number => y * 9 + x

const sudokuReducer = (state: SudokuState, action: SudokuAction): SudokuState => {
  const index = getIndex(state.position);
  const [x, y] = state.position

  switch (action.type) {
    case 'SET_PUZZLE':
      const { puzzle, solution } = action.payload;
      return {
        ...state,
        puzzle,
        solution,
        state: puzzle,
        startTime: new Date()
      }
    case 'RESET_PUZZLE':
      return {
        ...state,
        state: state.puzzle
      }
    case 'MOVE_VERTICAL':
      let newY = state.position[1] + action.payload;
      if (newY < 0) newY = 0;
      if (newY > 8) newY = 8;
      return {
        ...state,
        position: [state.position[0], newY]
      }
    case 'MOVE_HORIZONTAL':
      let newX = state.position[0] + action.payload;
      if (newX < 0) newX = 0;
      if (newX > 8) newX = 8;
      return {
        ...state,
        position: [newX, state.position[1]]
      }
    case 'MOVE_END_OF_CELL':
      let endOfCell = x + (3 - ((x + 1) % 3));
      if (endOfCell > 8) endOfCell = 8;
      return {
        ...state,
        position: [endOfCell, state.position[1]]
      }
    case 'MOVE_BEGIN_OF_CELL':
      let beginOfCell = x - ((x % 3) === 0 ? 3 : x % 3);
      if (beginOfCell < 0) beginOfCell = 0;
      return {
        ...state,
        position: [beginOfCell, state.position[1]]
      }
    case 'MOVE_TO_NEXT_CELL':
      let nextCell = x + (3 - (x % 3));
      if (nextCell > 8) nextCell = 6;
      return {
        ...state,
        position: [nextCell, state.position[1]]
      }
    case 'MOVE_TO_TOP':
      return {
        ...state,
        position: [state.position[0], 0]
      }
    case 'MOVE_TO_BOTTOM':
      return {
        ...state,
        position: [state.position[0], 8]
      }
    case 'FILL':
      if (state.puzzle[index] === '-') {
        return {
          ...state,
          state: state.state.substring(0, index) + action.payload.toString() + state.state.substring(index + 1)
        }
      }
    case 'CLEAR':
      if (state.puzzle[index] === '-') {
        return {
          ...state,
          state: state.state.substring(0, index) + '-' + state.state.substring(index + 1)
        }
      }
    default:
      return state
  }
}

const useSudokuState = () => useReducer(sudokuReducer, initialState);

export default useSudokuState;

