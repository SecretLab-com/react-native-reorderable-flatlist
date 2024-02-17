import { Animated, Dimensions, Modal, View } from "react-native";
import { AnimationOverlayProps } from "./types";
import { ListItem } from "./ListItem";
import { useEffect, useRef } from "react";

export const AnimationOverlay = <T,>({
  animationOverlayConfig,
  onOverlayAnimationComplete,
  renderItem,
  listLength,
}: AnimationOverlayProps<T>) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animationOverlayConfig) {
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        if (animationOverlayConfig.operation === "moveUp") {
          onOverlayAnimationComplete("moveUp", animationOverlayConfig.item);
        } else {
          onOverlayAnimationComplete("moveDown", animationOverlayConfig.item);
        }
      });
    } else {
      animation.setValue(0);
    }
  }, [animationOverlayConfig, animation, onOverlayAnimationComplete]);

  return (
    <Modal
      transparent
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* Blocks the item under the primary moving overlay item */}
      <View
        style={{
          position: "absolute",
          top: animationOverlayConfig.startingPosition.y,
          height: animationOverlayConfig.startingPosition.height,
          left: animationOverlayConfig.startingPosition.x,
          right:
            Dimensions.get("window").width -
            (animationOverlayConfig.startingPosition.x + animationOverlayConfig.startingPosition.width),
          backgroundColor: "white",
        }}
      />
      {/* Blocks the item under the secondary moving overlay item */}
      <View
        style={{
          position: "absolute",
          top: animationOverlayConfig.endingPosition.y,
          height: animationOverlayConfig.endingPosition.height,
          left: animationOverlayConfig.startingPosition.x,
          right: Dimensions.get("window").width - (animationOverlayConfig.startingPosition.x + animationOverlayConfig.startingPosition.width),
          backgroundColor: "white",
        }}
      />
      {/* The partner item */}
      <Animated.View
        style={{
          position: "absolute",
          top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [animationOverlayConfig.endingPosition.y, animationOverlayConfig.startingPosition.y],
          }),
          left: animationOverlayConfig.endingPosition.x,
          right: Dimensions.get("window").width - (animationOverlayConfig.endingPosition.x + animationOverlayConfig.endingPosition.width),
        }}
      >
        <ListItem
          item={animationOverlayConfig.partnerItem}
          renderItem={renderItem}
          index={animationOverlayConfig.startIndex}
          listLength={listLength}
        />
      </Animated.View>
      {/* Target Item */}
      <Animated.View
        style={{
          position: "absolute",
          top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [animationOverlayConfig.startingPosition.y, animationOverlayConfig.endingPosition.y],
          }),
          height: animationOverlayConfig.startingPosition.height,
          left: animationOverlayConfig.startingPosition.x,
          right:
            Dimensions.get("window").width -
            (animationOverlayConfig.startingPosition.x + animationOverlayConfig.startingPosition.width),
        }}
      >
        <ListItem<T>
          item={animationOverlayConfig.item}
          renderItem={renderItem}
          index={
            animationOverlayConfig.operation === "moveUp"
              ? animationOverlayConfig.startIndex - 1
              : animationOverlayConfig.startIndex + 1
          }
          listLength={listLength}
        />
      </Animated.View>
    </Modal>
  );
};
