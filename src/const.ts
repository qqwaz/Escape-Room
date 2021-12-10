import mapMarkerIcon from 'assets/img/icon-location.svg';
import { LatLngTuple, IconOptions } from 'leaflet';

export const BACKEND_URL = 'http://localhost:3001';
export const REQUEST_TIMEOUT = 1000;

export enum AppRoute {
  Main = '/',
  Quest = '/quest',
  Contacts = '/contacts',
  NotFound = '/oops',
}

export enum APIRoute {
  Quests = '/quests',
  Quest = '/quests/:quest_id',
  Order = '/orders',
}

export const MapSettings = {
  view: {
    point: [59.96835, 30.31765] as LatLngTuple,
    zoom: 16,
  },
  marker: {
    iconUrl: mapMarkerIcon,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  } as IconOptions,
} as const;

export enum MenuItem {
  NotFound = 'NotFound',
  Home = 'Home',
  Noobies = 'Noobies',
  Reviews = 'Reviews',
  Actions = 'Actions',
  Contacts = 'Contacts',
}

export const MenuItemProp = {
  [MenuItem.Home]: {
    label: 'Квесты',
    route: AppRoute.Main,
  },
  [MenuItem.Noobies]: {
    label: 'Новичкам',
    route: AppRoute.NotFound,
  },
  [MenuItem.Reviews]: {
    label: 'Отзывы',
    route: AppRoute.NotFound,
  },
  [MenuItem.Actions]: {
    label: 'Акции',
    route: AppRoute.NotFound,
  },
  [MenuItem.Contacts]: {
    label: 'Контакты',
    route: AppRoute.Contacts,
  },
} as const;

export enum QuestType {
  Adventure = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  Scifi = 'sci-fi',
}

export enum QuestFilter {
  Adventure = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  Scifi = 'sci-fi',
  All = 'all'
}

export const QuestFilterTitle: Record<QuestFilter, string> = {
  [QuestFilter.All]: 'Все квесты',
  [QuestFilter.Adventure]: 'Приключения',
  [QuestFilter.Horror]: 'Ужасы',
  [QuestFilter.Mystic]: 'Мистика',
  [QuestFilter.Detective]: 'Детектив',
  [QuestFilter.Scifi]: 'Sci-fi',
} as const;

export enum QuestLevel {
  Hard = 'hard',
  Medium = 'medium',
  Easy = 'easy',
}

export const QuestLevelTitle = {
  [QuestLevel.Hard]: 'сложный',
  [QuestLevel.Medium]: 'средний',
  [QuestLevel.Easy]: 'легкий',
} as const;

export const OrderErrorMessage = {
  Name: 'Имя не может быть пустым',
  Phone: 'Телефон должен содержать 10 цифр',
  PeopleCount: 'Нужно указать допустимое количество участников',
  Legal: 'Нужно согласиться с правилами',
};

export const ApiMessage = {
  GetQuestsError: 'Something went wrong',
  GetQuestError: 'Quest not found',
  PostOrderSuccess: 'Заказ отправлен',
  PostOrderError: 'Something went wrong',
}

export const ORDER_PHONE_MASK = /^[0-9]{10}$/;
