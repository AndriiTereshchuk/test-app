// @flow
import * as React from 'react'
import {
  View,
  ActivityIndicator,
    Dimensions
} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';

import styles from './styles'
import DetailsFooter from './components/DetailsFooter'
import AuthorDetails from './components/AuthorDetails'
import FilterImage from './components/FilterImage'

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
  author: string,
  camera: string,
  factor: number,
  sepia: number,
  negative: number,
  saturation: number,
}

const { width, height } = Dimensions.get('window')
const imageSize = width * 0.9;

class DetailView extends React.PureComponent<Props> {
  render () {
    const {
        imageUrl,
        isLoading,
        shareCallback,
        applyFilterCallback,
        pictureDetails,
        author,
        camera,
        sepia,
        factor,
        negative,
        saturation
    } = this.props

    return (
      <View style={styles.container}>
          {
              isLoading && (
                  <View style={styles.loaderContainer}>
                      <ActivityIndicator size="large" color="#00ff00" />
                  </View>
              )
          }
        <View style={styles.imageContainer}>
            <ImageZoom
                cropWidth={width}
                cropHeight={height}
                imageWidth={imageSize}
                imageHeight={imageSize}
            >
                <FilterImage
                    key={imageUrl}
                    imageUrl={imageUrl}
                    width={imageSize}
                    height={imageSize}
                    factor={factor}
                    sepia={sepia}
                    negative={negative}
                    saturation={saturation}
                />
            </ImageZoom>
        </View>
        <AuthorDetails
            author={author}
            camera={camera}
        />
        <DetailsFooter
          pictureDetails={pictureDetails}
          shareCallback={shareCallback}
          applyFilterCallback={applyFilterCallback}
        />
      </View>
    )
  }
}

export default DetailView
