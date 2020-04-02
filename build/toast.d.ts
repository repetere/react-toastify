export default toast;
declare function toast(content: any, options: any): any;
declare namespace toast {
    export const warn: any;
    export function dismiss(id?: any): false | void;
    export function isActive(id: any): boolean;
    export function update(toastId: any, options?: {}): void;
    export function done(id: any): void;
    export function onChange(callback: any): void;
    export function configure(config: any): void;
    export { POSITION };
    export { TYPE };
}
import { POSITION } from "./utils/constant";
import { TYPE } from "./utils/constant";
