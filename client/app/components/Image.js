import React, { useContext } from "react";
import { Image } from "react-native";
import { Image as CacheImage } from "react-native-expo-image-cache";
import { ThemeContext } from "../contexts/theme-context";

export default function CustomImage({
  source = null,
  imageUri = null,
  preview = null,
  cache = true,
  ...props
}) {
  const { theme } = useContext(ThemeContext);

  if (cache) {
    return <CacheImage uri={imageUri} preview={preview} tint={theme} {...props} />;
  }

  if (imageUri) {
    return <Image source={{ uri: imageUri }} {...props} />;
  }

  return <Image source={source} {...props} />;
}
