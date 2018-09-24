import { GraphQLObjectType, GraphQLScalarType, GraphQLField, GraphQLFieldConfig, GraphQLSchema, GraphQLDirective } from "graphql";
import { DatabaseSingleton } from "@server/database2";
import * as Hapi from "hapi";
import * as Express from "express";
import { Credentials } from "@server/utils/auth";
import { LoggerItem } from "@modules/Logger";
import { enforceResolver, traceResolver } from "@server/graphql/_ResolverMiddleware";


export type GraphQLContext = { 
    db: DatabaseSingleton
    request: Express.Request
    credentials: Credentials
    logger: LoggerItem
}
export type GQLField<TArgs = any> = GraphQLFieldConfig<any, GraphQLContext, TArgs>

var _Files_Queries = require.context("./queries/", false, /\.ts/);
var _Files_Mutations = require.context("./mutations/", false, /\.ts/);


type GraphQLSingletonSetupOptions = {
}

export class GraphQLSingleton {

    //#region SINGLETON INSTANCE
    static instance:GraphQLSingleton = null;
    static getInstance = () => {
        if(GraphQLSingleton.instance === null){
            GraphQLSingleton.instance = new GraphQLSingleton();
        }
        return GraphQLSingleton.instance;
    }
    //#endregion

    queryObj: GraphQLObjectType
    mutationObj: GraphQLObjectType
    directives: GraphQLDirective[]
    schema: GraphQLSchema

    setup(options?: GraphQLSingletonSetupOptions){
        this.init();
        return this;
    }

    private createGraphObject(name: string, requireContext: __WebpackModuleApi.RequireContext): GraphQLObjectType {
        let _fields = {};
        let _nbFields = 0;
        let _objectType = undefined;
        requireContext.keys().forEach(name => {
            let _actionName = name.replace(/\.ts$/i, "").replace(/^\.\//i, "");
            let _field = requireContext(name).default;
            _fields[_actionName] = _field;
            _nbFields++;
        });
        if(_nbFields > 0){
            _objectType = new GraphQLObjectType({ name: name, fields: _fields });
        }
        return _objectType;
    }

    init() {
        this.queryObj = this.createGraphObject("Query", _Files_Queries);
        enforceResolver(this.queryObj, [ traceResolver ]);
        this.mutationObj = this.createGraphObject("Mutation", _Files_Mutations);
        this.directives = [];
        this.schema = new GraphQLSchema({
            query: this.queryObj,
            mutation: this.mutationObj,
            directives: this.directives,
        });
    }

    getSchema(): GraphQLSchema{
        return this.schema;
    }
}

export default GraphQLSingleton.getInstance();