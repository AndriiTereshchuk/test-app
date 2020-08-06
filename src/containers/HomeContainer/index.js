// @flow
import * as React from 'react'
import { Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import HomeView from '../../screens/Home'
import { fetchPictures } from './actions'
import { getToken } from '../../services/500pxAPI';

export interface Props {
  navigation: any,
  fetchPictures: Function,
  pictures: Array<Object>,
  isLoading: boolean,
}

export interface State {}

class HomeContainer extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super(props)
    StatusBar.setBarStyle('light-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#000')
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadNext = this.onLoadNext.bind(this)
  }

  componentDidMount () {
    getToken()
        .then(this.onRefresh)
  }

  onRefresh (): void {
    this.props.fetchPictures(1)
  }

  onLoadNext (): void {
    const { page } = this.props;
    this.props.fetchPictures(page)
  }

  render () {
    return <HomeView {...this.props}
      onRefresh={this.onRefresh}
      onLoadNext={this.onLoadNext} />
  }
}

function bindAction (dispatch) {
  return {
    fetchPictures: page => dispatch(fetchPictures(page)),
  }
}

const mapStateToProps = state => ({
  pictures: state.homeReducer.pictures,
  page: state.homeReducer.page,
  isLoading: state.homeReducer.isLoading,
})

export default connect(mapStateToProps, bindAction)(HomeContainer)
