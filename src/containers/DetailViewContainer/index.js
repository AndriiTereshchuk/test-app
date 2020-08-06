// @flow
import * as React from 'react'
import DetailView from '../../screens/DetailView'
import { connect } from 'react-redux'
import Share from "react-native-share";
import { fetchPictureDetails } from './actions'
import { selectHiResImage } from './selectors'

export interface Props {
  navigation: any,
  fetchPictureDetails: Function,
  isLoading: boolean,
  hiResImage: Function,
}
export interface State {
  imageUrl: string,
}

class DetailViewContainer extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#FFF',
  }
  state = {
    sepia: 0,
    factor: 0,
    negative: 0,
    saturation: 1,
  }

  componentDidMount () {
    const { fetchPictureDetails, route } = this.props
    const { pictureDetails } = route.params
    if (!this.props.hiResImage(pictureDetails.id)) {
      fetchPictureDetails(pictureDetails.id)
    }
  }

  share = (imageId: number): void => {
    const { pictureDetails } = this.props.route.params
    const imageURL = pictureDetails.cropped_picture
    const { hiResImage } = this.props
    const hiResImg = hiResImage(imageId)
    const url = hiResImg && hiResImg.hiResImage || imageURL
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      urls: [url],
    };
    Share.open(shareOptions)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
  }

  applyFilter = (type): void => {
    const s = {...this.state};
    if (type === 'blur') {
      s.factor = +!s.factor
    } else if (type === 'sepia') {
      s.sepia = +!s.sepia
    } else if (type === 'negative') {
      s.negative = +!s.negative
    } else if (type === 'saturation') {
      const currentSaturation = s.saturation === 1;
      s.saturation = currentSaturation ? 2 : 1
    }
    this.setState(s);
  }

  render () {
    const { sepia, saturation, factor, negative } = this.state;
    const { pictureDetails } = this.props.route.params
    const imageURL = pictureDetails.cropped_picture
    const { isLoading, hiResImage } = this.props
    const hiResImg = hiResImage(pictureDetails.id)
    const url = hiResImg && hiResImg.hiResImage || imageURL
    const author = hiResImg && hiResImg.author || '';
    const camera = hiResImg && hiResImg.camera || '';
    return (
          <DetailView
              imageUrl={url}
              author={author}
              camera={camera}
              pictureDetails={pictureDetails}
              shareCallback={this.share}
              isLoading={isLoading}
              applyFilterCallback={this.applyFilter}

              sepia={sepia}
              saturation={saturation}
              factor={factor}
              negative={negative}
          />
    )
  }
}

function bindAction (dispatch) {
  return {
    fetchPictureDetails: imageId => dispatch(fetchPictureDetails(imageId)),
  }
}

const mapStateToProps = state => ({
  hiResImage: imageId => selectHiResImage(state, imageId),
  isLoading: state.detailViewReducer.isLoading,
  hiResPictures: state.detailViewReducer,
})

export default connect(mapStateToProps, bindAction)(DetailViewContainer)
