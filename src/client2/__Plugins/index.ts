import { LiteEvent } from "@modules/LiteEvent";
import { RouterRoute } from "@client/System/Router";

export type IPlugin = {
    name: string
    loadRoutes?: (parent:string) => RouterRoute[]
}

type PluginManagerEventName = "AddPlugin" | "RemovePlugin"

export class PluginManager {

    //#region SINGLETON
    private static __instance: PluginManager = undefined;
    static GetInstance: () => PluginManager = () => {
        if(!PluginManager.__instance) PluginManager.__instance = new PluginManager();
        return PluginManager.__instance;
    }
    //#endregion

    private __plugins: IPlugin[] = [];
    private readonly onAddPlugin = new LiteEvent<IPlugin>();
    private readonly onRemovePlugin = new LiteEvent<IPlugin>();

    constructor(){ }

    on(eventName: PluginManagerEventName, handler: (data?: any) => void){
        if(this["on" + eventName]){
            this["on" + eventName].on(handler);
        }
    }

    off(eventName: PluginManagerEventName, handler: (data?: any) => void){
        if(this["on" + eventName]){
            this["on" + eventName].off(handler);
        }
    }

    getPlugin(plugin: IPlugin | string){
        let _name = (typeof plugin == "string") ? plugin : plugin ? plugin.name : undefined;
        if(!_name) return undefined;
        return this.__plugins.find(x => x.name == _name);
    }

    add(plugin: IPlugin){
        let _plugin = this.getPlugin(plugin);
        if(!_plugin) {
            this.__plugins.push(plugin);
            this.onAddPlugin.trigger(plugin);
        }
    }

    remove(plugin: IPlugin){
        let _plugin = this.getPlugin(plugin);
        if(!_plugin) return;
        this.__plugins = this.__plugins.filter(x => x.name != plugin.name);
        this.onRemovePlugin.trigger(plugin);
    }

    loadRoutes(parent: string = ""): RouterRoute[] {
        let _routes: RouterRoute[] = [];
        this.__plugins.forEach(x => {
            if(x.loadRoutes){
                _routes = [
                    ..._routes,
                    ...x.loadRoutes(parent)
                ];
            }
        });
        return _routes;
    }

}