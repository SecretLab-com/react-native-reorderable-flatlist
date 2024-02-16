import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { ListItem } from "./ListItem";
import { AnimationOverlay } from "./AnimationOverlay";
import { ReorderableFlatListProps, AnimationOverlayConfig } from "./types";

export const ReorderableFlatList = <T,>(props: ReorderableFlatListProps<T>) => {
  const [data, setData] = useState<T[]>(props.data ?? []);

  useEffect(() => {
    setData(props.data);
  }, []);

  const [overlay, setOverlay] = useState<AnimationOverlayConfig<T> | null>(
    null
  );

  const itemRefs = useRef<Record<string, ListItem>>({});

  const moveUp = useCallback(
    async (
      item: T,
      startingPosition: { x: number; y: number; height: number; width: number }
    ) => {
      const index = data.findIndex(
        (thisItem) => props.keyExtractor(thisItem) === props.keyExtractor(item)
      );
      const itemAboveId = props.keyExtractor(data[index - 1]);
      const itemAboveRef = itemRefs.current[itemAboveId];
      const { x, y, width, height } = await itemAboveRef.measureInWindow();

      setOverlay({
        item,
        partnerItem: data[index - 1],
        operation: "moveUp",
        startingPosition,
        endingPosition: { x, y, width, height },
      });
    },
    [data]
  );

  const moveDown = useCallback(
    async (
      item: T,
      startingPosition: { x: number; y: number; height: number; width: number }
    ) => {
      const index = data.findIndex(
        (thisItem) => props.keyExtractor(thisItem) === props.keyExtractor(item)
      );
      const itemBelowId = props.keyExtractor(data[index + 1]);

      const itemBelowRef = itemRefs.current[itemBelowId];
      const { x, y, width, height } = await itemBelowRef.measureInWindow();
      setOverlay({
        item,
        partnerItem: data[index + 1],
        operation: "moveDown",
        startingPosition,
        endingPosition: { x, y, width, height },
      });
    },
    [data]
  );

  const renderItem: ListRenderItem<T> = useCallback(
    ({ item }) => {
      const handleRef = (ref: ListItem | null) => {
        if (ref) {
          itemRefs.current[props.keyExtractor(item)] = ref;
        }
      };
      return (
        <ListItem
          ref={handleRef}
          item={item}
          renderItem={props.renderItem}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
        />
      );
    },
    [moveDown, moveUp]
  );

  const handleOverlayAnimationComplete = useCallback(setData, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => props.keyExtractor(item)}
      />
      {overlay && (
        <AnimationOverlay
          animationOverlayConfig={overlay}
          onOverlayAnimationComplete={handleOverlayAnimationComplete}
          keyExtractor={props.keyExtractor}
          renderItem={props.renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
