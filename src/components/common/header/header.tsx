import logo from 'assets/img/logo.svg';
import * as S from './header.styled';
import { MenuItem, MenuItemProp } from 'const';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItem } from 'store/selectors';
import { changeLocation } from 'store/actions';

const Header = () => {
  const dispatch = useDispatch();
  const activeItem = useSelector(getMenuItem);

  const onItemClick = (item: MenuItem) => () => {
    dispatch(changeLocation(item));
  };

  return (
    <S.StyledHeader>
      <S.HeaderWrapper>
        <S.Logo>
          <S.Image src={logo} alt="Логотип Escape Room" width="134" height="50" />
        </S.Logo>

        <S.Navigation>
          <S.Links>
            {Object.entries(MenuItemProp).map(([item, {label, route}]) => (
              <S.LinkItem key={item} onClick={onItemClick(item as MenuItem)}>
                <S.Link $isActiveLink={item === activeItem} to={route}>
                  {label}
                </S.Link>
              </S.LinkItem>
            ))}
          </S.Links>
        </S.Navigation>
        <S.Phone href="tel:88003335599">8 (800) 333-55-99</S.Phone>
      </S.HeaderWrapper>
    </S.StyledHeader>
  );
}

export default Header;
