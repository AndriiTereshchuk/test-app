import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import styles from '../styles'

type Props = {
    author: string,
    camera: string,
}

const AuthorDetails = (props: Props) => {
    const { author, camera } = props;
    console.log(author, camera, 'AuthorDetails')
    return (
        <View style={styles.authorDetailsContainer}>
            <Text style={styles.authorDetailsAuthor}>{author}</Text>
            <Text style={styles.authorDetailsCamera}>{camera}</Text>
        </View>
    );
}

export default AuthorDetails;
