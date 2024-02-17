import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ListItemContainer } from "./ListItemContainer";
import { AnimationOverlay } from "./AnimationOverlay";
import { handleMoveDown, handleMoveUp } from "./utils";
export const ReorderableFlatList = (props) => {
    const { renderItem: renderItemProp, keyExtractor, data: dataProp, onReorder, onReorderIds, ...flatListProps } = props;
    const [data, setData] = useState(dataProp ?? []);
    // Synchronize the internal state if a prop update occurs
    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    const [overlay, setOverlay] = useState(null);
    const itemRefs = useRef({});
    const moveUp = useCallback(async (item, startingPosition) => {
        const index = data.findIndex((thisItem) => keyExtractor(thisItem) === keyExtractor(item));
        const itemAboveId = keyExtractor(data[index - 1]);
        const itemAboveRef = itemRefs.current[itemAboveId];
        const { x, y, width, height } = await itemAboveRef.measureInWindow();
        setOverlay({
            item,
            startIndex: index,
            partnerItem: data[index - 1],
            operation: "moveUp",
            startingPosition,
            endingPosition: { x, y, width, height },
        });
    }, [data, keyExtractor]);
    const moveDown = useCallback(async (item, startingPosition) => {
        const index = data.findIndex((thisItem) => keyExtractor(thisItem) === keyExtractor(item));
        const itemBelowId = keyExtractor(data[index + 1]);
        const itemBelowRef = itemRefs.current[itemBelowId];
        const { x, y, width, height } = await itemBelowRef.measureInWindow();
        setOverlay({
            item,
            startIndex: index,
            partnerItem: data[index + 1],
            operation: "moveDown",
            startingPosition,
            endingPosition: { x, y, width, height },
        });
    }, [data, keyExtractor]);
    const renderItem = useCallback(({ item, index }) => {
        const handleRef = (ref) => {
            if (ref) {
                itemRefs.current[keyExtractor(item)] = ref;
            }
        };
        return (<ListItemContainer ref={handleRef} item={item} index={index} listLength={data.length} renderItem={renderItemProp} onMoveUp={moveUp} onMoveDown={moveDown}/>);
    }, [data.length, moveDown, moveUp, keyExtractor, renderItemProp]);
    const handleOverlayAnimationComplete = useCallback((operation, item) => {
        if (operation === "moveUp") {
            setData((currentData) => {
                const reorderedData = handleMoveUp(currentData, item, keyExtractor);
                if (onReorder)
                    onReorder(reorderedData);
                if (onReorderIds)
                    onReorderIds(reorderedData.map(keyExtractor));
                return reorderedData;
            });
        }
        else {
            setData((currentData) => {
                const reorderedData = handleMoveDown(currentData, item, keyExtractor);
                if (onReorder)
                    onReorder(reorderedData);
                if (onReorderIds)
                    onReorderIds(reorderedData.map(keyExtractor));
                return reorderedData;
            });
        }
        setOverlay(null);
    }, [onReorder, onReorderIds, keyExtractor]);
    return (<>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => keyExtractor(item)} {...flatListProps}/>
      {overlay && (<AnimationOverlay animationOverlayConfig={overlay} onOverlayAnimationComplete={handleOverlayAnimationComplete} renderItem={props.renderItem} listLength={data.length}/>)}
    </>);
};
const styles = StyleSheet.create({});
//# sourceMappingURL=ReorderableFlatlist.js.map