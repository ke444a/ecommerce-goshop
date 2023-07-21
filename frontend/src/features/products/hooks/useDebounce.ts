import debounce from "lodash.debounce";
import { useEffect, useRef, useMemo } from "react";


export const useDebounce = (callback: () => void, delay: number) => {
    const ref = useRef<() => void>();
    
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => ref.current?.();

        return debounce(func, delay);
    }, []);

    return debouncedCallback;
};