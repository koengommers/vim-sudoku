import styled from 'styled-components';
import theme from '../theme';

type Option<Key> = {
  key: Key,
  label: string
};

type SelectorProps<Key> = {
  options: Option<Key>[],
  selected: Key,
  setOption: (key: Key) => void
};

const SelectorContainer = styled.div`
  background-color: ${theme.colors.darkGray};
  display: flex;
  padding: 5px;
  border-radius: 4px;
  gap: 5px;
`;

type SelectorButtonProps = {
  selected: boolean
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

const Selector = <Key extends string,>({ selected, options, setOption }: SelectorProps<Key>) => {
  return (
    <SelectorContainer>
      { options.map((option) => (
        <SelectorButton
          key={option.key}
          onClick={() => setOption(option.key)}
          selected={option.key === selected}
        >{ option.label }</SelectorButton>
      ))}
    </SelectorContainer>
  )
};

export default Selector;
