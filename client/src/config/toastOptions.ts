import type { Position, ToastSlideFrom, ToastSpacing, ToastVariant } from "react-floatify";

export const toastOptions = {
    position:"bottom center" as Position,
    toastContainer:{
        variant:"contained" as ToastVariant,
        spacing:"small" as ToastSpacing,
        slideFrom:"bottom" as ToastSlideFrom
    }
}