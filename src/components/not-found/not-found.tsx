import { MainLayout } from 'components/common/common';
import * as S from './not-found.styled';
import { AppRoute } from 'const';

const NotFound = () => (
  <MainLayout>
    <S.Main>
      <S.ContentWrapper>
          <S.PageTitle>
            Ошибка 404: Страница не найдена
          </S.PageTitle>

          <S.MainPageLink to={AppRoute.Main}>
            Перейти к списку квестов
          </S.MainPageLink>

      </S.ContentWrapper>
    </S.Main>
  </MainLayout>
);

export default NotFound;
