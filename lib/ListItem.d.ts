import React, { ForwardedRef } from "react";
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
export declare const ListItem: <T>(props: ListItemProps<T> & {
    ref?: React.ForwardedRef<ListItem> | undefined;
}) => JSX.Element;
export {};
