import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
const Loader = () => {
    return (<View style={styles}>
        <ActivityIndicator size="large" color="#1755F4" />
        <StatusBar barStyle="default" />
    </View>)
}

const styles = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
}

export default Loader;