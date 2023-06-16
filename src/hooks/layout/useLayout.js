import {LayoutContext} from "./layoutProvider";
import {useContext} from "react";

export const useLayout = () => {
    return useContext(LayoutContext)
}