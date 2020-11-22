import omit from 'lodash/omit';
import * as ActionTypes from './actionTypes';

function news(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_NEWS:
      return action.news;
    default:
      return state;
  }
}

function showNews(state = true, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SHOW_NEWS:
      return action.showNews;
    default:
      return state;
  }
}

function message(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MESSAGE:
      return action.message;
    default:
      return state;
  }
}

function accounts(state = {}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        [action.id]: action.data
      };
    case ActionTypes.REMOVE_ACCOUNT:
      return omit(state, [action.id]);
    default:
      return state;
  }
}

function currentAccountId(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_ACCOUNT_ID:
      return action.value;
    default:
      return state;
  }
}

function instances(
  state = {
    started: false,
    list: {},
    installing: [],
    installationStatus: null,
    installationProgress: null
  },
  action
) {
  switch (action.type) {
    case ActionTypes.UPDATE_SPECIFIC_INSTANCE:
      return {
        ...state,
        list: { ...state.list, [action.instance.uid]: action.instance }
      };
    case ActionTypes.REMOVE_SPECIFIC_INSTANCE:
      return { ...state, list: omit(state.list, [action.uid]) };
    case ActionTypes.UPDATE_INSTANCES:
      return { ...state, list: action.instances };

    case ActionTypes.ADD_SPECIFIC_INSTANCE_QUEUE:
      return {
        ...state,
        installing: [...state.installing, { name: action.instance.name }]
      };
    case ActionTypes.REMOVE_SPECIFIC_INSTANCE_QUEUE:
      return {
        ...state,
        installing: state.installing.slice(1)
      };
    case ActionTypes.UPDATE_INSTALLATION_STATUS:
      return {
        ...state,
        installationStatus: action.data
      };
    case ActionTypes.UPDATE_INSTALLATION_PROGRESS:
      return {
        ...state,
        installationProgress: action.data
      };
    case ActionTypes.ADD_STARTING_INSTANCE:
      return {
        ...state,
        list: {
          ...state.list,
          [action.instance.uid]: {
            ...action.instance,
            initialized: false,
            initializing: true
          }
        }
      };
    case ActionTypes.ADD_STARTED_INSTANCE:
      return {
        ...state,
        list: {
          ...state.list,
          [action.instance.uid]: {
            ...action.instance,
            initialized: true,
            initializing: false
          }
        }
      };
    case ActionTypes.REMOVE_STARTED_INSTANCE:
      return {
        ...state,
        list: {
          ...state.list,
          [action.instance.uid]: {
            ...action.instance,
            initialized: false,
            initializing: false
          }
        }
      };

    default:
      return state;
  }
}

function updateAvailable(state = false, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_UPDATE_AVAILABLE:
      return action.updateAvailable;
    default:
      return state;
  }
}

export default {
  showNews,
  news,
  accounts,
  currentAccountId,
  message,
  instances,
  updateAvailable
};