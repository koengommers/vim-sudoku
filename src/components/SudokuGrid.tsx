import styled from 'styled-components';
import theme, { colors } from '../theme';

type SudokuGridProps = {
  state: String,
  puzzle: String,
  position: [number, number]
}

type SudokuCellProps = {
  selected: Boolean,
  parallel: Boolean,
  prefilled: Boolean,
  similar: Boolean
}

const getCellColor = (props: SudokuCellProps) => {
  let color = 'transparent';

  if (props.parallel) {
    color = theme.colors.lightBlue
  }

  if (props.selected) {
    color = theme.colors.blue
  }

  return color;
}

const SudokuCell = styled.span`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  width: 40px;
  height: 40px;
  background-color: ${getCellColor};
  color: ${(props: SudokuCellProps) => props.prefilled ? colors.midGray : colors.black};
  position: relative;
  font-family: ${theme.numberFont};

  &:nth-of-type(3n + 2) {
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
  }

  &:nth-of-type(3n) {
    border-right: 2px solid ${theme.colors.gray};
  }

  &:last-of-type {
    border: none;
  }

  ${(props: SudokuCellProps) => (props.similar && !props.selected) && `
    &:after {
      content: '';
      width: 16px;
      height: 3px;
      background-color: #7ab7d6;
      display: block;
      position: absolute;
      bottom: 5px;
      left: 12px;
    }
  `}
`;

const SudokuRow = styled.div`
  &:nth-of-type(3n + 2) {
    border-top: 1px solid ${theme.colors.lightGray};
    border-bottom: 1px solid ${theme.colors.lightGray};
  }

  &:nth-of-type(3n) {
    border-bottom: 2px solid ${theme.colors.gray};
  }

  &:last-of-type {
    border: none;
  }
`

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  overflow: hidden;
  margin: 25px 0;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  font-weight: 400;
`

const SudokuGrid = ({ state, puzzle, position: [x, y], ...props }: SudokuGridProps) => {
  const rows = state.match(/.{9}/g)
  const selectedNumber = state[y * 9 + x]

  return (
    <GridContainer {...props}>{ rows?.map((row, i) => (
      <SudokuRow key={i}>{ [...row].map((cell, j) => {
        return <SudokuCell
          key={j}
          selected={(j === x) && (i === y)}
          parallel={(j === x) || (i === y)}
          prefilled={cell === puzzle[i * 9 + j]}
          similar={(selectedNumber === cell) && (cell !== '-')}
        >{ cell !== '-' && cell }</SudokuCell>
      }) }</SudokuRow>
    )) }</GridContainer>
  )
}

export default SudokuGrid
