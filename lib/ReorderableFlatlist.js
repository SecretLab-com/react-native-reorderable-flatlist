import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ListItem } from "./ListItem";
import { AnimationOverlay } from "./AnimationOverlay";
export const ReorderableFlatList = (props) => {
    const [data, setData] = useState(props.data ?? []);
    useEffect(() => {
        setData(props.data);
    }, []);
    const [overlay, setOverlay] = useState(null);
    const itemRefs = useRef({});
    const moveUp = useCallback(async (item, startingPosition) => {
        const index = data.findIndex((thisItem) => props.keyExtractor(thisItem) === props.keyExtractor(item));
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
    }, [data]);
    const moveDown = useCallback(async (item, startingPosition) => {
        const index = data.findIndex((thisItem) => props.keyExtractor(thisItem) === props.keyExtractor(item));
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
    }, [data]);
    const renderItem = useCallback(({ item }) => {
        const handleRef = (ref) => {
            if (ref) {
                itemRefs.current[props.keyExtractor(item)] = ref;
            }
        };
        return (<ListItem ref={handleRef} item={item} renderItem={props.renderItem} onMoveUp={moveUp} onMoveDown={moveDown}/>);
    }, [moveDown, moveUp]);
    const handleOverlayAnimationComplete = useCallback(setData, []);
    return (<View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => props.keyExtractor(item)}/>
      {overlay && (<AnimationOverlay animationOverlayConfig={overlay} onOverlayAnimationComplete={handleOverlayAnimationComplete} keyExtractor={props.keyExtractor} renderItem={props.renderItem}/>)}
    </View>);
};
const styles = StyleSheet.create({});
//# sourceMappingURL=ReorderableFlatlist.js.map