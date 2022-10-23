import styled from 'styled-components';
import theme from '../theme';

type Option = {
  key: String,
  label: String
};

type SelectorProps = {
  options: Option[],
  selected: String,
  setOption: (key: String) => void
};

const SelectorContainer = styled.div`
  background-color: ${theme.colors.darkGray};
  display: flex;
  padding: 5px;
  border-radius: 4px;
  gap: 5px;
`;

type SelectorButtonProps = {
  selected: Boolean
}

const SelectorButton = styled.button`
  border: none;
  background-color: ${(props: SelectorButtonProps) => props.selected ? theme.colors.blue : 'transparent' };
  color: ${(props: SelectorButtonProps) => props.selected ? theme.colors.black : 'inherit' };
  font-weight: 600;
  font-family: ${theme.font};
  font-size: 14px;
  width: 80px;
  padding: 4px;
  border-radius: 3px;
  cursor: pointer;
`

const Selector = ({ selected, options, setOption }: SelectorProps) => {
  return (
    <SelectorContainer>
      { options.map((option) => (
        <SelectorButton
          onClick={() => setOption(option.key)}
          selected={option.key === selected}
        >{ option.label }</SelectorButton>
      ))}
    </SelectorContainer>
  )
};

export default Selector;
