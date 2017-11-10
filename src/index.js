import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

export default class NativeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      underlineWidthAm: new Animated.Value(0),
      underlineOffsetAm: new Animated.ValueXY({x: 0, y: 0})
    };
    this.onLayout = this.onLayout.bind(this);
    this.getUnderlineStyle = this.getUnderlineStyle.bind(this);
    this.createActiveTabRef = this.createActiveTabRef.bind(this);

    this.onTab = this.onTab.bind(this);
    this.moveUnderline = this.moveUnderline.bind(this);
  }
  onLayout(event) {
    var { x, width } = event.nativeEvent.layout;
    this.setState({
      underlineWidthAm: new Animated.Value(width),
      underlineOffsetAm: new Animated.ValueXY({x: x, y: 0})
    });
  }
  getUnderlineStyle() {
    const t = this.state.underlineOffsetAm.getTranslateTransform();
    return [
      styles.underline, {
        width: this.state.underlineWidthAm,
      }, {
        transform: t
      }
    ]
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
  render() {
    return (
      <Animated.View style={styles.tabs}>
        {
          this.props.tabs.map((tab, index) => {

            let style = null;
            let onLayout = null;
            let refs = {};
            if (this.props.activeTab.name === tab.name) {
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
              <TouchableOpacity key={index} onPress={this.onTab.bind(this, tab)} {...refs}
                style={style.tab} onLayout={onLayout}>
                <Text style={style.text}>{tab.name}</Text>
              </TouchableOpacity>
            )
          })
        }
        <Animated.View style={this.getUnderlineStyle()}/>
      </Animated.View>
    );
  }
}

NativeSideBar.propTypes = {
  tabs: PropTypes.any,
  activeTab: PropTypes.any,
  onTab: PropTypes.func
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
  activeTab: {
    padding: 8
  },
  tabText: {
    color: "#e1e1e1"
  },
  activeTabText: {

  },
  underline: {
    position: "absolute",
    bottom: -1,
    backgroundColor: "#fbd900",
    height: 4
  }
});
