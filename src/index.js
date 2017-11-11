import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class NativeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      underlineWidthAm: new Animated.Value(0),
      underlineOffsetAm: new Animated.ValueXY({x: 0, y: 0})
    };
    this.onLayout = this.onLayout.bind(this);
    this.createActiveTabRef = this.createActiveTabRef.bind(this);

    this.onTab = this.onTab.bind(this);
    this.getUnderlineStyle = this.getUnderlineStyle.bind(this);
    this.moveUnderline = this.moveUnderline.bind(this);
  }
  onLayout(event) {
    var { x, width } = event.nativeEvent.layout;
    this.setState({
      underlineWidthAm: new Animated.Value(width),
      underlineOffsetAm: new Animated.ValueXY({x: x, y: 0})
    });
  }
  createActiveTabRef(c) {
    if (c) c.measure((fx, _, width) => {
      this.moveUnderline({offset: fx, width: width});
    });
    this.activeTab = c;
  }
  onTab(tab) {
    this.props.onTab(tab);
  }
  getUnderlineStyle() {
    const t = this.state.underlineOffsetAm.getTranslateTransform();
    const propStyles = this.getStyles(this.props.styles)("underline");
    return [
      styles.underline, propStyles, {
        width: this.state.underlineWidthAm,
      }, {
        transform: t
      }
    ]
  }
  moveUnderline({offset, width}) {
    if (width) Animated.parallel([
      Animated.timing(this.state.underlineOffsetAm, {
        toValue: {x: offset, y: 0},
        duration: 500,
      }),
      Animated.timing(this.state.underlineWidthAm, {
          toValue: width,
          duration: 500
      })
    ]).start();
  }
  getStyles(styles) {
      return (c) => !!styles && !!styles[c] ? styles[c] : null
  }
  render() {
    const styleOf = this.getStyles(this.props.styles);
    return (
      <Animated.View style={[styles.tabs , styleOf("tabs")]}>
        {
          this.props.tabs.map((tab, index) => {

            let style = null;
            let onLayout = null;
            let refs = {};
            if (this.props.activeTab.id === tab.id) {
              style = {
                tab: styles.activeTab,
                text: styles.activeTabText
              };
              onLayout = this.onLayout;
              refs = { ref: this.createActiveTabRef };
            } else {
              style = {
                tab: styles.tab,
                text: styles.tabText
              };
              onLayout = null;
            }

            return (
              <TouchableOpacity key={index}
                onLayout={onLayout}
                onPress={this.onTab.bind(this, tab)} {...refs}
                style={[style.tab, styleOf("tab")]}>
                <Text style={[style.text, styleOf("tabText")]}>{tab.name}</Text>
              </TouchableOpacity>
            )
          })
        }
        <Animated.View style={this.getUnderlineStyle()}/>
      </Animated.View>
    );
  }
}

NativeTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any
  })).isRequired,
  activeTab: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  onTab: PropTypes.func,
  styles: PropTypes.shape({
    tabs: View.propTypes.style,
    tab: TouchableOpacity.propTypes.style,
    tabText: Text.propTypes.style,
    activeTab: TouchableOpacity.propTypes.style,
    activeTabText: Text.propTypes.style,
    underline: View.propTypes.style
  })
}

const styles = StyleSheet.create({
  tabs: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    justifyContent: "space-between"
  },
  tab: {
    padding: 8
  },
  tabText: {
    color: "#e1e1e1"
  },
  activeTab: {
    padding: 8
  },
  activeTabText: {

  },
  underline: {
    position: "absolute",
    bottom: -1,
    backgroundColor: "#e1e1e1",
    height: 4
  }
});
