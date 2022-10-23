import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import Selector from "./Selector";

export const difficultyOptions = [{
  key: 'easy' as const,
  label: 'Easy'
}, {
  key: 'medium' as const,
  label: 'Medium'
}, {
  key: 'hard' as const,
  label: 'Hard'
}, {
  key: 'expert' as const,
  label: 'Expert'
}];

const DifficultySelector = ({ selected, setOption }: { selected: Difficulty, setOption: (key: Difficulty) => void }) => (
  <Selector
    selected={selected}
    options={difficultyOptions}
    setOption={setOption}
  />
)

export default DifficultySelector
