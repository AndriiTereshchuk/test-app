// @flow

import { getPictureDetails } from '../../services/500pxAPI'
import { FETCH_FAILED } from '../HomeContainer/actions'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED'
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS'

export function pictureIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  }
}

export function fetchPictureSuccess (imageId: number, hiResImage: string, author: string, camera: string): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: {
      id: imageId,
      hiResImage,
      author,
      camera
    }
  }
}

export function fetchPictureFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: {
      errorMessage,
    }
  }
}

export function fetchPictureDetails (imageId: number) {
  return async dispatch => {
    dispatch(pictureIsLoading())
    try {
      const res = await getPictureDetails(imageId)
      console.log(res, 'res')
      dispatch(fetchPictureSuccess(res.id, res.full_picture, res.author, res.camera))
    } catch (e) {
      dispatch(fetchPictureFailed(e.message))
    }
  }
}
