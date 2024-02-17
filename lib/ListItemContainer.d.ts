import React, { ForwardedRef } from "react";
import { ListItemContainerProps } from "./types";
export type ListItemContainer = {
    measureInWindow: () => Promise<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
};
export declare const ListItemContainer: <T>(props: ListItemContainerProps<T> & {
    ref?: React.ForwardedRef<ListItemContainer> | undefined;
}) => JSX.Element;
