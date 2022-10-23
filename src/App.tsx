import { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getSudoku } from 'sudoku-gen';
import theme from './theme';
import useSudukoState from './hooks/useSudokuState';
import useMappings from './hooks/useMappings';
import mappings from './mappings';
import SudokuGrid from './components/SudokuGrid';
import Footer from './components/Footer';
import DifficultySelector from './components/DifficultySelector';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};
    font-family: ${theme.font};
  }
`;

const AppContainer = styled.div`
  padding-top: 60px;
  width: 460px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  margin: 0 auto 35px;
  text-align: center;
  font-size: 15px;
  line-height: 1.8;
`;

const Key = styled.span`
  font-family: monospace;
  background-color: ${theme.colors.darkGray};
  font-weight: bold;
  padding: 4px 8px;
  margin: 0 2px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const App = () => {
  const [state, dispatch] = useSudukoState();
  useMappings(mappings, dispatch);

  useEffect(() => {
    const sudoku = getSudoku(state.difficulty);
    dispatch({ type: 'SET_PUZZLE', payload: sudoku })
  }, [state.difficulty])

  if (state.state === state.solution) {
    return <h1>You won</h1>
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Description>
          Use <Key>h</Key>, <Key>j</Key>, <Key>k</Key>, <Key>l</Key> to move around and number keys to fill in cells. Use <Key>b</Key>, <Key>w</Key>, <Key>e</Key>, <Key>gg</Key>, <Key>G</Key>, <Key>0</Key>, <Key>^</Key> and <Key>$</Key> to get around more quickly.
        </Description>
        <DifficultySelector
          selected={state.difficulty}
          setOption={(key) => dispatch({ type: 'SET_DIFFICULTY', payload: key })}
        />
        <SudokuGrid puzzle={state.puzzle} state={state.state} position={state.position} />
        <Footer startTime={state.startTime} />
      </AppContainer>
    </>
  )
}

export default App;
