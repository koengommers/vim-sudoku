import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { MdPause, MdBarChart, MdRefresh } from 'react-icons/md';
import theme from '../theme';
import useInterval from '../hooks/useInterval';

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 0 35px;
  box-sizing: border-box;
`;

type FooterProps = {
  startTime: Date | null
}

const Timer = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left: -5px;

  span {
    font-size: 28px;
    font-family: ${theme.numberFont};
    margin: 0 2px 0 6px;
  }
`

const Icons = styled.div`
  display: flex;
  gap: 10px;
  font-size: 24px;
`;

const Footer = ({ startTime }: FooterProps) => {
  const [time, setTime] = useState(0);
  const timeDiff = new Date(time);
  const minutes = timeDiff.getMinutes();
  const seconds = timeDiff.getSeconds();

  const updateTime = useCallback(() => {
    if (startTime) {
      const now = new Date();
      setTime(now.getTime() - startTime.getTime());
    }
  }, [startTime]);
  
  useInterval(100, updateTime);

  return (
    <FooterContainer>
      <Timer><span>{ minutes }</span> min <span>{ seconds }</span> sec</Timer>
      <Icons>
        <MdPause />
        <MdRefresh />
        <MdBarChart />
      </Icons>
    </FooterContainer>
  );
};

export default Footer;
