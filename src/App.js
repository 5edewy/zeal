import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import RouterNavigator from './RouterNavigator';
import { navigationRef, isReadyRef } from './NavigationActions';
import Store from './store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Spinner } from './components/Assets/common';





function MyComponent(props) {
    return (
        <RootSiblingParent>
            {props.children}
            <StoreProvider store={Store}>
                <NavigationContainer

                    ref={navigationRef}
                    onReady={() => {
                        isReadyRef.current = true;
                    }}
                >
                    <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
                    <RouterNavigator />
                </NavigationContainer>
            </StoreProvider>
        </RootSiblingParent>

    );
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }



    async componentDidMount() {
        Store.subscribe(() => {
            const storeState = Store.getState();
            if (storeState.auth.loading) {
                this.setState({ loading: true });
            } else {
                this.setState({ loading: false });
            }
        });




    }

    render() {
        const { loading } = this.state;
        return (
            <MyComponent>{loading ? <Spinner size="large" /> : null}</MyComponent>
        )

    }
}

export default App;