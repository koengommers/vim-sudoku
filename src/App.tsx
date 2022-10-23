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
`;

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
          Use H, J, K, L to move around and number keys to fill in cells. Press ? for more advanced movements.
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
