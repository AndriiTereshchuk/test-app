import { PICTURE_DETAILS_FETCH_REQUESTED, PICTURE_DETAILS_FETCH_SUCCESS } from './actions';
const initialState = {
  hiResPictures: [],
  isLoading: false,
}


export default function (state: any = initialState, action: Object) {
  const payload = action.payload
  const actionType = action.type;
  switch (actionType) {
    case PICTURE_DETAILS_FETCH_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case PICTURE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hiResPictures: [...state.hiResPictures, payload]
      }
    default:
      return state;
  }
}
