import { GraphQLSchema } from "../utils/GraphQLSchema";
//import { __tabGraphs } from "./.."
const __tabGraphs = [];
export class Mutation extends GraphQLSchema<any>
{
    Type= {
        defs: ``,
        resolvers: { Mutation: { } }
    }

    constructor(){
        super();
        // -- init type string
        let __mutationTypes = '';
        this.Type.defs = '';

        __tabGraphs.forEach(graph => {
            if(graph.Mutation){
                // -- type dans Query
                __mutationTypes += `
                    ${graph.Mutation.name}: Mutation${graph.Mutation.name}
                `;
                // -- type requete
                this.Type.defs += `
                type Mutation${graph.Mutation.name} {
                    ${graph.Mutation.defs}
                }`
                
                if(graph.Mutation.resolvers){
                    // -- resolver dans query
                    this.Type.resolvers.Mutation[graph.Mutation.name] = () => {
                        return this.Type.resolvers[`Mutation${graph.Mutation.name}`]
                    }
                    // -- resolver du type requete
                    this.Type.resolvers[`Mutation${graph.Mutation.name}`] = graph.Mutation.resolvers
                }
            }
        });

        if(__mutationTypes.trim() != ''){
            this.Type.defs = `
            type Mutation {
                ${__mutationTypes}
            }
            ${this.Type.defs}
            `;
        }

    }
}