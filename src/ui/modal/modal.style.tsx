import { StyleSheet } from "react-native";
import {
  createSpacingStyles,
  createBorderWidthStyles,
  createBorderColorStyles,
  createBorderRadiusStyles
} from "../../theme/theme.service";

/**
 * computed style
 *
 * @param theme
 * @param props
 */
export const getStyle = (theme: any, props: any) => {
  const computedStyle: any = {};

  computedStyle.modal = {
    margin: 0
  };

  computedStyle.container = {
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    ...createBorderWidthStyles(props),
    ...createSpacingStyles(props, theme.spacing),
    ...createBorderColorStyles(props, theme.colors),
    ...createBorderRadiusStyles(props, theme.borderRadius)
  };

  // merging style props to computed style
  if (props.style) {
    computedStyle.modal = {
      ...computedStyle.modal,
      ...props.style
    };
  }

  return StyleSheet.create(computedStyle);
};
