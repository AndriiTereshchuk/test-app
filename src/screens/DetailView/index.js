// @flow
import * as React from 'react'
import {
  View,
  Image,
  ActivityIndicator,
    Dimensions
} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import {
    Sepia,
} from 'react-native-color-matrix-image-filters';

import styles from './styles'
import DetailsFooter from './components/DetailsFooter'
import AuthorDetails from './components/AuthorDetails'

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
  author: string,
  camera: string,
  sepia: number
}

const { width, height } = Dimensions.get('window')

// TODO: it would be great to see here loader, pinch to zoom here and pan

class DetailView extends React.PureComponent<Props> {
  render () {
    const { imageUrl, isLoading, shareCallback, applyFilterCallback, pictureDetails, author, camera, sepia } = this.props
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
                imageWidth={width * 0.9}
                imageHeight={width * 0.9}
            >
                <Sepia amount={sepia} width={width * 0.9} height={width * 0.9}>
                    <Image
                        source={{uri: imageUrl}}
                        style={styles.imageStyle} />
                </Sepia>
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
