export function cssTransition({ enter, exit, duration, appendPosition }: {
    enter: any;
    exit: any;
    duration?: number | undefined;
    appendPosition?: boolean | undefined;
}): ({ children, position, preventExitTransition, ...props }: {
    [x: string]: any;
    children: any;
    position: any;
    preventExitTransition: any;
}) => JSX.Element;
