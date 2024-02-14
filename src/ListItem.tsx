import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { ReorderableFlatListProps } from "./types";

export type ListItem = {
  measureInWindow: () => Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
};

type ListItemProps<T> = {
  item: T;
  renderItem: ReorderableFlatListProps<T>["renderItem"];
  onMoveUp?: (
    item: T,
    startingPosition: { x: number; y: number; height: number; width: number }
  ) => void;
  onMoveDown?: (
    item: T,
    startingPosition: { x: number; y: number; height: number; width: number }
  ) => void;
};

const ListItemComponent = <T,>(
  { item, renderItem, onMoveDown, onMoveUp }: ListItemProps<T>,
  ref: ForwardedRef<ListItem>
) => {
  const viewRef = useRef<View>(null);

  const handleMoveUp = useCallback(() => {
    viewRef.current?.measureInWindow((x, y, width, height) => {
      onMoveUp?.(item, { x, y, width, height });
    });
  }, [item, onMoveUp]);

  const handleMoveDown = useCallback(() => {
    viewRef.current?.measureInWindow((x, y, width, height) => {
      onMoveDown?.(item, { x, y, width, height });
    });
  }, [item, onMoveDown]);

  useImperativeHandle(ref, () => ({
    measureInWindow: async (): Promise<{
      x: number;
      y: number;
      height: number;
      width: number;
    }> =>
      new Promise((resolve, reject) => {
        if (!viewRef.current) {
          return reject("viewRef is not set");
        }
        viewRef.current.measureInWindow(
          (viewX, viewY, viewWidth, viewHeight) => {
            resolve({
              x: viewX,
              y: viewY,
              height: viewHeight,
              width: viewWidth,
            });
          }
        );
      }),
  }));

  return (
    <View ref={viewRef} style={[styles.listItem]}>
      {renderItem({ item, moveUp: handleMoveUp, moveDown: handleMoveDown })}
    </View>
  );
};

export const ListItem = forwardRef(ListItemComponent) as <T>(
  props: ListItemProps<T> & { ref?: ForwardedRef<ListItem> }
) => JSX.Element;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    backgroundColor: "fuchsia",
    height: 100,
  },
});
