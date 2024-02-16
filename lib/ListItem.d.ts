import React, { ForwardedRef } from "react";
import { ListItemProps } from "./types";
export type ListItem = {
    measureInWindow: () => Promise<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
};
export declare const ListItem: <T>(props: ListItemProps<T> & {
    ref?: React.ForwardedRef<ListItem> | undefined;
}) => JSX.Element;
