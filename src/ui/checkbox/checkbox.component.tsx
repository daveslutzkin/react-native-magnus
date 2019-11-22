import * as React from "react";
import { useContext, useState } from "react";
import {
  View as RNView,
  ActivityIndicator,
  GestureResponderEvent as RNGestureResponderEvent,
  TouchableWithoutFeedback as RNButton
} from "react-native";

import { getStyle } from "./checkbox.style";
import { ThemeContext } from "../../theme";
import { Icon } from "../icon/icon.component";
import { getThemeProperty } from "../../theme/theme.service";
import { getIconName, getIconColor } from "./checkbox.service";
import { CheckboxProps } from "./checkbox.type";

const Checkbox: React.FunctionComponent<CheckboxProps> = props => {
  const {
    m,
    mt,
    mr,
    mb,
    ml,
    p,
    pr,
    pt,
    pb,
    pl,
    size,
    style,
    loading,
    disabled,
    onChange,
    children,
    activeColor,
    inactiveColor,
    defaultChecked,
    onPress: onPressProp,
    ...rest
  } = props;
  const theme = useContext(ThemeContext);
  const [checked, setChecked] = useState(
    "checked" in props ? props.checked : props.defaultChecked
  );
  const [focussed, setFocussed] = useState(false);
  const computedStyle = getStyle(theme, props);

  /**
   * on press checkbox
   */
  const onPress = (event: RNGestureResponderEvent) => {
    if (disabled) {
      return;
    }

    if (!("checked" in props)) {
      setChecked(!checked);
    }

    if (typeof onPressProp === "function") {
      onPressProp(event);
    }
  };

  /**
   * sets focussed to true
   *
   * @param event
   */
  const onPressIn = () => {
    setFocussed(true);
  };

  /**
   * sets focussed to true
   *
   * @param event
   */
  const onPressOut = () => {
    setFocussed(false);
  };

  /**
   * get icon
   * shows activity indication if loading state is true
   */
  const getIcon = () => {
    return loading ? (
      <ActivityIndicator
        size={getThemeProperty(theme.fontSize, size, 16)}
        color={iconColor}
      />
    ) : (
      <Icon
        name={iconName}
        color={iconColor}
        style={{ zIndex: 2, position: "relative" }}
        fontFamily="MaterialIcons"
        fontSize={size}
      />
    );
  };

  const iconName = getIconName(checked, disabled);
  const iconColor = getIconColor(
    checked,
    disabled,
    activeColor,
    inactiveColor,
    theme
  );
  const icon = getIcon();

  return (
    <RNButton
      {...rest}
      style={computedStyle.button}
      onPress={disabled ? undefined : onPress}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
    >
      <RNView style={computedStyle.container}>
        <RNView>
          {focussed && <RNView style={computedStyle.highlightContainer} />}
          {icon}
        </RNView>
        {children}
      </RNView>
    </RNButton>
  );
};

Checkbox.defaultProps = {
  loading: false,
  disabled: false,
  size: "text700",
  defaultChecked: false,
  activeColor: "blue600",
  inactiveColor: "gray400"
};

export { Checkbox };