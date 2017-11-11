# native-tabs

This tiny package was built for React Native via Animated Views from own React Native elements without of using of external packages.

* [Installation](#installation)
* [Docs](#docs)
* [Styles](#styles)
* [Usage](#usage)

## Installation

```
npm i native-tabs
```


## Docs

Property | Type | Description
:---|:---|:---
`tabs` | required array | The array consists of objects which must have an id inside an object.
`activeTab` | required object | The object must have an id.
`onTab` | required function | The function returns new active tab.
`styles` | object | An object of react native styles. More details below.


## Styles:

Property | Type | Description
:---|:---|:---
`tabs` | View.propTypes.style | Styles for the whole component.
`tab` | TouchableOpacity.propTypes.style | Styles for a tab.
`tabText` | Text.propTypes.style | Styles for a text of a tab.
`activeTab` | TouchableOpacity.propTypes.style | Styles for active tab.
`activeTabText` | Text.propTypes.style | Styles for a text of active tab.
`underline` | View.propTypes.style | Styles for a moving underline.

## Usage: 

```jsx
import NativeTabs from 'native-tabs';
import { StyleSheet } from 'react-native';

const items = [
   {
     id: 111,
     name: "First"
   },
   {
     id: 222,
     name: "Second"
   },
   {
     id: 333,
     name: "Third"
   }
];

class SomeComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeTab: { id: 111 }
    };
    this.callBackFunction = this.callBackFunction.bind(this);
  {
  callBackFunction(tab) {
    this.setState({
      activeTab: tab
    });
  }
  render() {
    return <NativeTabs tabs={items} 
            styles={{
              tabs: styles.tabs,
              tab: styles.tab,
              tabText: styles.tabText,
              underline: styles.underline
            }}
            activeTab={this.state.activeTab}
            onTab={this.callBackFunction}/>;
  }
}

const styles = StyleSheet.create({
  tabs: {
    borderBottomColor: "#DBDBDD"
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    width: "100%",
    textAlign: "center"
  },
  underline: {
    backgroundColor: "#00D8BB"
  }
});

```
