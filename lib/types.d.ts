import { ReactNode } from "react";
export type ReorderableFlatListProps<T> = {
    data: T[];
    renderItem: (props: {
        item: T;
        moveUp: () => void;
        moveDown: () => void;
    }) => ReactNode;
    keyExtractor: (data: T) => string;
    onReorder?: (newData: T[]) => void;
};
export type AnimationOverlayConfig<T> = {
    item: T;
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
export type OverlayProps<T> = {
    animationOverlayConfig: AnimationOverlayConfig<T>;
    onOverlayAnimationComplete: (setState: (currentData: T[]) => T[]) => void;
    renderItem: ReorderableFlatListProps<T>["renderItem"];
    keyExtractor: (data: T) => string;
};
