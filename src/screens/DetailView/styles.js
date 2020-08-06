import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: width * 0.9,
    height: width * 0.9,
  },
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  spinner: {
    position: 'absolute',
  },
  detailView: {
    position: 'absolute',
    bottom: 10,
    width: 120,
    right: 10,
    flexDirection: 'row',
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  authorDetailsContainer: {
    position: 'absolute',
    bottom: 10,
    width: width - 120,
    left: 10,
  },
  authorDetailsAuthor: {
    fontSize: 20,
    color: 'white',
  },
  authorDetailsCamera: {
    fontSize: 15,
    color: 'white',
  }
})
export default styles
