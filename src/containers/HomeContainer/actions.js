import { getPictures } from '../../services/500pxAPI'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED'
export const PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

export function listIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURES_FETCH_REQUESTED,
  }
}

export function fetchListSuccess (pictures: Array<Object>, page: number): ActionWithPayload {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload: {
      pictures,
      page,
    }
  }
}

export function fetchListFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: {
      errorMessage,
    }
    // TODO: implement me
  }
}

export function fetchPictures (page: number = 1) {
  return async dispatch => {
    dispatch(listIsLoading())
    try {
      const data = await getPictures(page);
      dispatch(fetchListSuccess(data.pictures, data.page))
    } catch (e) {
      dispatch(e.message)
    }
  }
}
