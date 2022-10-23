import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getSudoku } from 'sudoku-gen';
import theme from './theme';
import useSudukoState from './hooks/useSudokuState';
import useMappings, { Mapping } from './hooks/useMappings';
import SudokuGrid from './components/SudokuGrid';
import Selector from './components/Selector';
import Footer from './components/Footer';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};
    font-family: ${theme.font};
  }
`;


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

const AppContainer = styled.div`
  padding-top: 60px;
  width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  margin: 0 auto 35px;
  text-align: center;
  font-size: 15px;
  line-height: 1.4;
`

const difficultyOptions = [{
  key: 'easy',
  label: 'Easy'
}, {
  key: 'medium',
  label: 'Medium'
}, {
  key: 'hard',
  label: 'Hard'
}, {
  key: 'expert',
  label: 'Expert'
}];

const App = () => {
  const [state, dispatch] = useSudukoState();
  useMappings(mappings, dispatch);

  useEffect(() => {
    const sudoku = getSudoku('easy');
    dispatch({ type: 'SET_PUZZLE', payload: sudoku })
  }, [])

  if (state.state === state.solution) {
    return <h1>You won</h1>
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Description>
          Use H, J, K, L to move around and number keys to fill in cells. Press ? for more advanced movements.
        </Description>
        <Selector
          selected="easy"
          options={difficultyOptions}
          setOption={(key) => console.log(key)}
        />
        <SudokuGrid puzzle={state.puzzle} state={state.state} position={state.position} />
        <Footer startTime={state.startTime} />
      </AppContainer>
    </>
  )
}

export default App;
