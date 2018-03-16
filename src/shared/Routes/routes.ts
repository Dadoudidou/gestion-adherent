import { RouterRoute } from "./../Services/Router";

export const loadRoutes = (parent = ""): RouterRoute[] => {
    /*
    let _requestFiles = (require as any).context(".", true, /^\.\/[a-zA-Z0-9_]*\/route\.ts$/);
    let _childRoutes: IRoutesConfig[] = [];
    let _keys: any[] = _requestFiles.keys();

    //execute routes
    for(let i=0; i<_keys.length; i++){
        let _route = _requestFiles(_keys[i]);
        if(!_route["loadRoutes"]) continue;
        _childRoutes.push(_route.loadRoutes());
    }
    */

    return [
        ...require("./Test/routes").loadRoutes(`${parent}`)
    ]
}