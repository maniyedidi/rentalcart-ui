import React from 'react';
import {
    Text,
    View,
    Animated,
    Dimensions
} from 'react-native';
import { Card } from 'react-native-elements';

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

class SpidleToast extends React.Component {
    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            modalShown: false,
            toastColor: 'green',
            message: 'Success!'
        }
    }

    callToast(message, type) {
        if (this.state.modalShown) return
        this.setToastType(message, type)
        this.setState({ modalShown: true })
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 350
            }).start(this.closeToast())
    }

    closeToast() {
        setTimeout(() => {
            this.setState({ modalShown: false })
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 350
                }).start()
        }, 2000)
    }

    callXToast() {
        Animated.timing(
            this.animatedXValue,
            {
                toValue: 0,
                duration: 350
            }).start(this.closeXToast())
    }

    closeXToast() {
        setTimeout(() => {
            Animated.timing(
                this.animatedXValue,
                {
                    toValue: -windowWidth,
                    duration: 350
                }).start()
        }, 2000)
    }

    setToastType(message = 'Success!', type = 'success') {
        let color
        if (type == 'error') color = 'red'
        if (type == 'primary') color = '#2487DB'
        if (type == 'warning') color = '#ec971f'
        if (type == 'success') color = 'green'
        this.setState({ toastColor: color, message: message })
    }

    render() {

        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })

        return (
            <View style={{ position: 'absolute', left: 0, top: 0, right: 0 }}>
                <Animated.View style={{ transform: [{ translateY: animation }], height: 50, backgroundColor: this.state.toastColor, justifyContent: 'center' }}>
                    <Text style={{ marginLeft: 10, color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                        {this.state.message}
                    </Text>
                </Animated.View>
            </View>
        );
    }
}

export default SpidleToast