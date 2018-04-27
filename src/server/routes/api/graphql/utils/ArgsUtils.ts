export const args_searchString = (args: any, name: string) => {
    if(!args) return args;
    if(!args[name]) return args;
    if(typeof(args[name]) != "string") return args;
    return {
        ...args,
        [name]: { $like: `%${args[name]}%` }
    }
}

export const args_replaceVar = (args: any, oldName: string, newName: string) => {
    if(!args) return args;
    if(!args[oldName]) return args;
    let _args = {};
    for(let key in args){
        if(key != oldName){
            _args[key] = args[key];
        } else {
            _args[newName] = args[key];
        }
    }
    return _args;
}