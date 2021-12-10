import * as S from './booking-modal.styled';
import { ReactComponent as IconClose } from 'assets/img/icon-close.svg';
import { useDispatch } from 'react-redux';
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { postOrder } from 'store/actions';
import { toast } from 'react-toastify';
import { OrderErrorMessage, ORDER_PHONE_MASK } from 'const';

type BookingProps = {
  onClose: () => void,
  peopleCount: [number, number],
}

const BookingModal = (props: BookingProps) => {
  const {
    onClose,
    peopleCount,
  } = props;

  const dispatch = useDispatch();

  const [order, setOrder] = useState({
    name: '',
    peopleCount: '',
    phone: '',
    isLegal: false,
  });

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setOrder({...order, name: evt.target.value});
  };
  const onPhoneChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setOrder({...order, phone: evt.target.value});
  };
  const onPeopleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setOrder({...order, peopleCount: evt.target.value});
  };
  const onLegalChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setOrder({...order, isLegal: evt.currentTarget.checked});
  };

  const onFormSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const errors = [];
    if (order.name.length === 0) {
      errors.push(OrderErrorMessage.Name)
    }
    if (!(ORDER_PHONE_MASK.test(order.phone))) {
      errors.push(OrderErrorMessage.Phone)
    }
    const peoples = Number.parseInt(order.peopleCount, 10);
    if (!peoples || peoples < peopleCount[0] || peoples > peopleCount[1]) {
      errors.push(OrderErrorMessage.PeopleCount)
    }
    if (!order.isLegal) {
      errors.push(OrderErrorMessage.Legal)
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
      return;
    }

    dispatch(postOrder({
      name: order.name,
      phone: order.phone,
      peopleCount: peoples,
      isLegal: order.isLegal,
    }, onClose));
  };

  return (
    <S.BlockLayer>
      <S.Modal>
        <S.ModalCloseBtn onClick={onClose}>
          <IconClose width="16" height="16" />
          <S.ModalCloseLabel>Закрыть окно</S.ModalCloseLabel>
        </S.ModalCloseBtn>
        <S.ModalTitle>Оставить заявку</S.ModalTitle>
        <S.BookingForm
          action="https://echo.htmlacademy.ru"
          method="post"
          id="booking-form"
        >
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-name">Ваше Имя</S.BookingLabel>
            <S.BookingInput
              type="text"
              id="booking-name"
              name="booking-name"
              placeholder="Имя"
              required
              onChange={onNameChange}
              value={order.name}
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-phone">
              Контактный телефон
            </S.BookingLabel>
            <S.BookingInput
              type="tel"
              id="booking-phone"
              name="booking-phone"
              placeholder="Телефон"
              required
              onChange={onPhoneChange}
              value={order.phone}
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-people">
              Количество участников
            </S.BookingLabel>
            <S.BookingInput
              type="number"
              id="booking-people"
              name="booking-people"
              placeholder="Количество участников"
              required
              onChange={onPeopleChange}
              value={order.peopleCount}
            />
          </S.BookingField>
          <S.BookingSubmit type="submit" onClick={onFormSubmit}>Отправить заявку</S.BookingSubmit>
          <S.BookingCheckboxWrapper>
            <S.BookingCheckboxInput
              type="checkbox"
              id="booking-legal"
              name="booking-legal"
              required
              checked={order.isLegal}
              onChange={onLegalChange}
            />
            <S.BookingCheckboxLabel
              className="checkbox-label"
              htmlFor="booking-legal"
            >
              <S.BookingCheckboxText>
                Я согласен с{' '}
                <S.BookingLegalLink href="#">
                  правилами обработки персональных данных и пользовательским
                  соглашением
                </S.BookingLegalLink>
              </S.BookingCheckboxText>
            </S.BookingCheckboxLabel>
          </S.BookingCheckboxWrapper>
        </S.BookingForm>
      </S.Modal>
    </S.BlockLayer>
  );
}

export default BookingModal;
