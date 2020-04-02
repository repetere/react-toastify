export namespace POSITION {
    export const TOP_LEFT: string;
    export const TOP_RIGHT: string;
    export const TOP_CENTER: string;
    export const BOTTOM_LEFT: string;
    export const BOTTOM_RIGHT: string;
    export const BOTTOM_CENTER: string;
}
export namespace TYPE {
    export const INFO: string;
    export const SUCCESS: string;
    export const WARNING: string;
    export const ERROR: string;
    export const DEFAULT: string;
}
export namespace ACTION {
    export const SHOW: number;
    export const CLEAR: number;
    export const DID_MOUNT: number;
    export const WILL_UNMOUNT: number;
    export const ON_CHANGE: number;
}
export function NOOP(): void;
export const RT_NAMESPACE: "Toastify";
