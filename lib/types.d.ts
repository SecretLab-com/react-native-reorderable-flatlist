import { ReactNode } from "react";
import { FlatListProps } from "react-native";
export type ListRenderItem<T> = (props: {
    item: T;
    index: number;
    canMoveUp: boolean;
    canMoveDown: boolean;
    moveUp: () => void;
    moveDown: () => void;
}) => ReactNode;
export type ReorderableFlatListProps<T> = {
    data: T[];
    renderItem: ListRenderItem<T>;
    keyExtractor: (data: T) => string;
    onReorder?: (newData: T[]) => void;
    containerStyle?: FlatListProps<T>["style"];
    contentContainerStyle?: FlatListProps<T>["contentContainerStyle"];
    showsVerticalScrollIndicator?: FlatListProps<T>["showsVerticalScrollIndicator"];
    showsHorizontalScrollIndicator?: FlatListProps<T>["showsHorizontalScrollIndicator"];
};
export type ListItemProps<T> = {
    item: T;
    index: number;
    listLength: number;
    renderItem: ListRenderItem<T>;
    onMoveUp?: (item: T, startingPosition: {
        x: number;
        y: number;
        height: number;
        width: number;
    }) => void;
    onMoveDown?: (item: T, startingPosition: {
        x: number;
        y: number;
        height: number;
        width: number;
    }) => void;
};
export type AnimationOverlayConfig<T> = {
    item: T;
    startIndex: number;
    partnerItem: T;
    operation: "moveUp" | "moveDown";
    startingPosition: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
    endingPosition: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
};
export type AnimationOverlayProps<T> = {
    animationOverlayConfig: AnimationOverlayConfig<T>;
    onOverlayAnimationComplete: (operation: "moveUp" | "moveDown", item: T) => void;
    renderItem: ReorderableFlatListProps<T>["renderItem"];
    listLength: number;
};
