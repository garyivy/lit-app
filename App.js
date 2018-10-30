import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const AWS_PATH = 'https://3tf0oierhc.execute-api.us-east-1.amazonaws.com/dev/echo-translate?source=';

class Lit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', translated: ''};
    this.onChangeText = this.onChangeText.bind(this);
    this.getEchoTranslation = this.getEchoTranslation.bind(this);
  }

  onChangeText(text) {
    this.setState({text, translated: "Loading 'Echo' Translation..."});
    this.getEchoTranslation(text).then( json=> {
      this.setState({ translated: json })
    });
  }
  
 getEchoTranslation(text) {
  return fetch(AWS_PATH + encodeURI(text))
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.echo;
    })
    .catch((error) => {
      console.error(error);
    });
}

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Enter text to translate here."
          onChangeText={this.onChangeText}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.translated}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="See Examples"
          onPress={() =>
            navigate('Examples', {})
          }
        />
        <Button
          title="What is Lost In Translation?"
          onPress={() =>
            navigate('About', {})
          }
        />
        <Lit/>
      </View>
    );
  }
}

class ExamplesScreen extends React.Component {
  static navigationOptions = {
    title: 'Examples',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Home"
          onPress={() =>
            navigate('Home', {})
          }
        />
        <Button
          title="What is Lost In Translation?"
          onPress={() =>
            navigate('About', {})
          }
        />
      </View>
    );
  }
}

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About Lost In Translation',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Home"
          onPress={() =>
            navigate('Home', {})
          }
        />
        <Button
          title="See Examples"
          onPress={() =>
            navigate('Examples', {})
          }
        />
      </View>
    );
  }
}

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Examples: { screen: ExamplesScreen },
  About: { screen: AboutScreen }
});

export default App;

