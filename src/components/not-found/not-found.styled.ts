import styled from 'styled-components';
import { Link as RouterLink } from 'components/common/common';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;

  background-repeat: no-repeat;
  background-position: top left;
  background-color: ${({ theme }) => theme.color.nero};
  background-size: cover;
`;

const ContentWrapper = styled.div`
  max-width: 1080px;
  flex-shrink: 0;
  width: 100%;
  margin: auto;
`;

const PageTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.font.formsHeading};
  line-height: 110%;
  font-weight: 600;
  color: ${({ theme }) => theme.color.white};
  text-align: center;
`;

const MainPageLink = styled(RouterLink)`
  display: block;
  font-size: ${({ theme }) => theme.font.upperbase};
  line-height: 16px;
  letter-spacing: 0.03em;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.tangerine};
  text-decoration: underline;
  text-align: center;
  margin-top: 60px;
`;

export {
  Main,
  ContentWrapper,
  PageTitle,
  MainPageLink,
};
