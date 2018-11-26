import { GraphQLFieldResolver, GraphQLObjectType } from "graphql";
import { GraphQLContext } from "@server/graphql/V1";
import * as Boom from "boom"

type ResolverMiddlewareFn<TSource, TContext, TArgs> = 
    (fn: GraphQLFieldResolver<TSource, TContext, TArgs>) => GraphQLFieldResolver<TSource, TContext, TArgs>


/**
 * Apply resolver middleware function to all descendant defined resolver of objectType
 * Usage :
 * enforceResolver(user, [ traceResolver, isAuthenticatedResolver ])
 */
let _middlewaresResolvers: {[key:string]: ResolverMiddlewareFn<any, any, any>[]} = {};
export const enforceResolver = <TSource, TContext, TArgs>(objectType: GraphQLObjectType, middlewares: ResolverMiddlewareFn<TSource, TContext, TArgs>[], recursive: boolean = true) => {

    if(!objectType) return;
    if(!objectType.getFields) return;


    // -- save middlewares to ObjectType
    _middlewaresResolvers[objectType.name] = [...middlewares];

    let _fields = objectType.getFields();
    for(let key in _fields){
        if(_fields[key]){
            // -- resolve childs fields
            if(_fields[key].resolve){
                let _fn = _fields[key].resolve;
                // -- apply middleware to resolver
                _fields[key].resolve = composeResolver(...middlewares)(_fn);
            }
            // -- childs objects
            if(recursive){
                if(typeof _fields[key].type == "object"){
                    let _typeObject = _fields[key].type;
                    // -- array type
                    if(_typeObject["ofType"]) _typeObject = _typeObject["ofType"];
                    if(_typeObject["getFields"] && _typeObject["name"] && _middlewaresResolvers[_typeObject["name"]] == undefined)
                        enforceResolver(_typeObject as GraphQLObjectType, middlewares, recursive);
                }
            }

        }

    }
    
}

/**
 * Resolver middleware function
 * Usage :
 * compose(traceResolver, isAuthenticatedResolver)((src, args, ctx) => {  })
 */
export const composeResolver = <TSource, TContext, TArgs>(...middlewares: ResolverMiddlewareFn<TSource, TContext, TArgs>[]) => {
    return (fn: GraphQLFieldResolver<TSource, TContext, TArgs>) => {
        return ( async(source, args, context, info) => {
            let _fn = fn;
            let _middlewares = middlewares.reverse();
            for(let i=0; i<_middlewares.length; i++){
                
                _fn = await _middlewares[i](_fn);
            }
            return _fn(source, args, context, info);
        })
    }
}

export const traceResolver: ResolverMiddlewareFn<any, GraphQLContext, any> = (fn) => async (obj, args, context, info) => {
    const start = new Date().getTime();
    const result = await fn(obj, args, context, info);
    const end = new Date().getTime();

    let _pathString = ""; let _path = info.path;
    while(_path){ 
        _pathString = `${_path.key}/${_pathString}`; 
        _path = _path.prev; 
    }

    context.logger.debug(`Resolver ${_pathString} took ${end-start} ms`);
    return result;
}

export const isAuthenticatedResolver: ResolverMiddlewareFn<any, GraphQLContext, any> = (fn) => async (obj, args, context, info) => {
    if(info.fieldName != "auth") if(!context.credentials) throw Boom.forbidden("You are not connected");
    return await fn(obj, args, context, info);
}

export const isAuthorizedResolver: ResolverMiddlewareFn<any, GraphQLContext, any> = (fn) => async (obj, args, context, info) => {
    
    return await fn(obj, args, context, info);
}

export const isOwnResolver: ResolverMiddlewareFn<any, GraphQLContext, any> = (fn) => async (obj, args, context, info) => {
    
    return await fn(obj, args, context, info);
}

