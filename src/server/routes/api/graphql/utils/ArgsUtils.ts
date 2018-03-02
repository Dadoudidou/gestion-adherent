export const args_searchString = (args: any, name: string) => {
    if(!args) return args;
    if(!args[name]) return args;
    if(typeof(args[name]) != "string") return args;
    return {
        ...args,
        [name]: { $like: `%${args[name]}%` }
    }
}