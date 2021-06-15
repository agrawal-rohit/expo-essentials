import React, { useContext } from "react";
import { Image as CacheImage } from "react-native-expo-image-cache";
import { Image } from "react-native";
import { ThemeContext } from "../contexts/theme-context";

export default function CustomImage({
  src = null,
  imageUri = null,
  preview = null,
  cache = false,
  rounded = true,
  style = {},
  ...props
}) {
  const { theme } = useContext(ThemeContext);

  let defaultStyles;
  if (rounded) {
    defaultStyles = { width: "100%", height: "100%", borderRadius: 10 };
  } else {
    defaultStyles = { width: "100%", height: "100%" };
  }

  if (cache) {
    return (
      <CacheImage
        testID="cached-image"
        uri={imageUri}
        preview={{ uri: preview }}
        tint={theme}
        style={style ? { ...defaultStyles, ...style } : defaultStyles}
        {...props}
      />
    );
  }

  if (imageUri) {
    return (
      <Image
        testID="uri-image"
        source={{ uri: imageUri }}
        style={style ? { ...defaultStyles, ...style } : defaultStyles}
        {...props}
      />
    );
  }

  return (
    <Image
      testID="local-image"
      source={src}
      style={style ? { ...defaultStyles, ...style } : defaultStyles}
      {...props}
    />
  );
}
