import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { View, StyleSheet } from "react-native";
import { ListItemProps } from "./types";

export type ListItem = {
  measureInWindow: () => Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
};

const ListItemComponent = <T,>(
  {
    item,
    index,
    listLength,
    renderItem,
    onMoveDown,
    onMoveUp,
  }: ListItemProps<T>,
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

  const renderedContent = useMemo(() => {
    return renderItem({
      item,
      moveUp: handleMoveUp,
      moveDown: handleMoveDown,
      index,
      canMoveDown: index < listLength - 1,
      canMoveUp: index > 0,
    });
  }, [handleMoveDown, handleMoveUp, index, item, listLength, renderItem]);

  return (
    <View ref={viewRef} style={[styles.listItem]}>
      {renderedContent}
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
  listItem: {},
});
