import * as React from "react";
import loadableFn from "loadable-components";
import pMinDelay from "p-min-delay";
import { timeout as timeoutFn } from 'promise-timeout'


type loadable_renderProps = {
    Component: React.ComponentType<any>
    loading: boolean | Error
    ownProps: any
}

type loadable_component = {
    load: () => void
}

export type loadableOptions = {
    LoadingComponent?: React.ComponentType<any>
    ErrorComponent?: React.ComponentType<any>
    render?: (props: loadable_renderProps) => React.ReactNode
    delay?: number
    timeout?: number
}

export const loadable = (component: () => Promise<object>, options?: loadableOptions): React.ComponentType<any> & loadable_component => {
    let _options = { ...options };

    let { delay, timeout, ...loadableOptions } = _options;
    let _fn = component;

    /*if(delay){
        _fn = pMinDelay(_fn, _options.delay);
    }

    if(timeout){
        _fn = timeoutFn(_fn, timeout);
    }*/

    return loadableFn(_fn, loadableOptions);
}



