import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ListItem } from "./ListItem";
import { AnimationOverlay } from "./AnimationOverlay";
import { handleMoveDown, handleMoveUp } from "./utils";
export const ReorderableFlatList = (props) => {
    const { renderItem: renderItemProp, keyExtractor, data: dataProp, ...flatListProps } = props;
    const [data, setData] = useState(dataProp ?? []);
    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    const [overlay, setOverlay] = useState(null);
    const itemRefs = useRef({});
    const moveUp = useCallback(async (item, startingPosition) => {
        const index = data.findIndex((thisItem) => props.keyExtractor(thisItem) === props.keyExtractor(item));
        const itemAboveId = props.keyExtractor(data[index - 1]);
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
    }, [data, props]);
    const moveDown = useCallback(async (item, startingPosition) => {
        const index = data.findIndex((thisItem) => props.keyExtractor(thisItem) === props.keyExtractor(item));
        const itemBelowId = props.keyExtractor(data[index + 1]);
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
    }, [data, props]);
    const renderItem = useCallback(({ item, index }) => {
        const handleRef = (ref) => {
            if (ref) {
                itemRefs.current[props.keyExtractor(item)] = ref;
            }
        };
        return (<ListItem ref={handleRef} item={item} index={index} listLength={data.length} renderItem={renderItemProp} onMoveUp={moveUp} onMoveDown={moveDown}/>);
    }, [data.length, moveDown, moveUp, props, renderItemProp]);
    const handleOverlayAnimationComplete = useCallback((operation, item) => {
        if (operation === "moveUp") {
            setData((currentData) => handleMoveUp(currentData, item, props.keyExtractor));
        }
        else {
            setData((currentData) => handleMoveDown(currentData, item, props.keyExtractor));
        }
        setOverlay(null);
    }, [props.keyExtractor]);
    return (<View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => props.keyExtractor(item)} {...flatListProps}/>
      {overlay && (<AnimationOverlay animationOverlayConfig={overlay} onOverlayAnimationComplete={handleOverlayAnimationComplete} renderItem={props.renderItem} listLength={data.length}/>)}
    </View>);
};
const styles = StyleSheet.create({});
//# sourceMappingURL=ReorderableFlatlist.js.map