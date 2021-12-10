import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as S from './waiting.styled';

const Waiting = () => (
  <S.SpinnerContainer>
    <Loader
      type='TailSpin'
      color='#FFF'
    />;
  </S.SpinnerContainer>
);

export default Waiting;
