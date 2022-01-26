import './sass/main.scss';

import './js/scripts/header';

import './js/scripts/search';

import './js/scripts/pagination';

import './js/scripts/local-storage';

import './js/scripts/modal';

import './js/scripts/scrollToTop';

import './js/scripts/swiper';

import './js/scripts/toggle-theme';

import './js/scripts/filter';

import './js/scripts/team-modal';

import './js/scripts/localization';

import './js/scripts/year-option';

import './js/scripts/authForm/authentic';

import Auth from './js/scripts/authForm/auth';

if (localStorage.getItem('authorise') != null) {
  const newAuth = new Auth();
  const logUser = JSON.parse(localStorage.getItem('authorise'));
  newAuth.loginUser(newAuth.auth, logUser.name, logUser.email, logUser.password);
}
