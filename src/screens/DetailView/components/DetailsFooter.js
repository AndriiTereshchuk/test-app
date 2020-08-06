import * as React from 'react'
import {
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import styles from '../styles'
import imageFiltersImage from './images/ImageFilters.png'
import shareImage from './images/ShareThis.png'

type Props = {
  shareCallback: Function,
  colorSwitchCallback: Function,
  pictureDetails: Object,

}

class DetailsFooter extends React.PureComponent<Props> {
  onFilterPress = () => {
      const { applyFilterCallback } = this.props;
      const options = ['Blur', 'Sepia', 'Negative', 'Saturation', 'Cancel'];
      const destructiveButtonIndex = 4;
      const cancelButtonIndex = 4;
      this.props.showActionSheetWithOptions(
          {
              options,
              cancelButtonIndex,
              destructiveButtonIndex,
          },
          buttonIndex => {
              applyFilterCallback(options[buttonIndex].toLowerCase())
          },
      );
  };

  render () {
    const { shareCallback, pictureDetails } = this.props
    if (!pictureDetails) return null
    const imageId = pictureDetails.id
    return (
      <View style={styles.detailView}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={this.onFilterPress}
        >
          <Image style={styles.detailViewImage}
            resizeMode='cover'
            source={imageFiltersImage} />
        </TouchableOpacity>


        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => shareCallback(imageId)}
        >
          <Image style={styles.detailViewImage}
            resizeMode='cover'
            source={shareImage} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default connectActionSheet(DetailsFooter)
