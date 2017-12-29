# native-tabs

This tiny package was built for React Native via Animated Views from own React Native elements without of using of external packages.

* [Demo](#demo)
* [Installation](#installation)
* [Docs](#docs)
* [Styles](#styles)
* [Usage](#usage)

## Demo

1. NativeTabs without scroll with a small number of tabs.
2. NativeTabs with scroll used for a large number of tabs or very wide tabs.

<img src="https://s3-eu-west-1.amazonaws.com/njnest-opensource/npm/nativeTabs.gif" width="300">   <img src="https://s3-eu-west-1.amazonaws.com/njnest-opensource/npm/nativeTabsScroll.gif" width="300">


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
`disabled` | bool | Disable `onTab` function.
`styles` | object | An object of react native styles. More details below.


## Styles:

Property | Type | Description
:---|:---|:---
`wrap` | ViewPropTypes.style | Styles for the wrap View component. Useful for adding a border, shadow and etc.
`tabs` | ViewPropTypes.style | Styles for the component of the whole list of tabs.
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
     name: "lorem"
   },
   {
     id: 222,
     name: "ipsum"
   },
   {
     id: 333,
     name: "dolor"
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
              wrap: styles.wrap,
              tab: styles.tab,
              tabText: styles.tabText,
              underline: styles.underline
            }}
            activeTab={this.state.activeTab}
            onTab={this.callBackFunction}/>;
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12
  },
  tabText: {
    width: "100%",
    textAlign: "center"
  },
  underline: {
    height: 3,
    backgroundColor: "#00D8BB"
  }
});

```
