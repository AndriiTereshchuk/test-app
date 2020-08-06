// @flow
import { PICTURES_FETCH_REQUESTED, PICTURES_FETCH_SUCCESS, FETCH_FAILED} from './actions';

const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  const payload = action.payload
  const actionType = action.type;
  switch (actionType) {
    case PICTURES_FETCH_REQUESTED:
      return {
        ...state,
        isLoading: true,
      }

    case PICTURES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        page: payload.page + 1,
        pictures: [...state.pictures, ...payload.pictures]
      }
    case FETCH_FAILED:
      return {
        ...state,
        errorMessage: payload.errorMessage,
      }

    default:
      return state;
  }
}
