import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, } from "react";
import { View, StyleSheet } from "react-native";
const ListItemComponent = ({ item, index, listLength, renderItem, onMoveDown, onMoveUp, }, ref) => {
    const viewRef = useRef(null);
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
        measureInWindow: async () => new Promise((resolve, reject) => {
            if (!viewRef.current) {
                return reject("viewRef is not set");
            }
            viewRef.current.measureInWindow((viewX, viewY, viewWidth, viewHeight) => {
                resolve({
                    x: viewX,
                    y: viewY,
                    height: viewHeight,
                    width: viewWidth,
                });
            });
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
    }, []);
    return (<View ref={viewRef} style={[styles.listItem]}>
      {renderedContent}
    </View>);
};
export const ListItem = forwardRef(ListItemComponent);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    listItem: {},
});
//# sourceMappingURL=ListItem.js.map