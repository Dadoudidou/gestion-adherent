import { GraphQLSchema } from "../utils/GraphQLSchema";
import { __tabGraphs } from "./.."

export class Query extends GraphQLSchema<any>
{
    Type= {
        defs: ``,
        resolvers: { Query: { } }
    }

    constructor(){
        super();
        // -- init type string
        let __queryTypes = '';
        this.Type.defs = '';

        __tabGraphs.forEach(graph => {
            if(graph.Query){
                // -- type dans Query
                __queryTypes += `
                    ${graph.Query.name}: Query${graph.Query.name}
                `;
                // -- type requete
                this.Type.defs += `
                type Query${graph.Query.name} {
                    ${graph.Query.defs}
                }`
                
                if(graph.Query.resolvers){
                    // -- resolver dans query
                    this.Type.resolvers.Query[graph.Query.name] = () => {
                        return this.Type.resolvers[`Query${graph.Query.name}`]
                    }
                    // -- resolver du type requete
                    this.Type.resolvers[`Query${graph.Query.name}`] = graph.Query.resolvers
                }
            }
        });

        if(__queryTypes.trim() != ''){
            this.Type.defs = `
            type Query {
                ${__queryTypes}
            }
            ${this.Type.defs}
            `;
        }

    }
}