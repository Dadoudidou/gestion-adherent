import { GraphqlTypes } from "./graphqlType";
import { GraphQlContext } from "../..";
import * as Boom from "boom";

import { testPermissions } from "./../../../../../auths"

export type GraphqlResolverFn = (root: any, args: any, context: GraphQlContext, info: any) => any;

export interface GraphqlObjectPropertyInput {
    type: string
    require?: boolean
}

export interface GraphqlObjectProperty {
    type: string
    args?: {
        [key: string]: string | GraphqlObjectPropertyInput
    }
    resolver?: GraphqlResolverFn
    require?: boolean
    rules?: string[]
}

export interface GraphqlObjectProperties {
    [key: string]: string | GraphqlObjectProperty
}

export abstract class GraphqlObject {

    abstract name: string
    abstract attributes: GraphqlObjectProperties
    type: string = "type"
    queryAttributes: { [name: string]: GraphqlObjectProperty }
    mutationAttributes: { [name: string]: GraphqlObjectProperty }
    isInput: boolean = false
    rules: string[] = [];

    private __gen_property(name, property: string | GraphqlObjectProperty): string {
        let _def = '';
        let _type = "";
        let _required = "";
        let _args = "";
        if (typeof (property) == "string") {
            _type = property as string;
        } else {
            let _prop = (property as GraphqlObjectProperty);
            _type = _prop.type;
            _required = _prop.require ? "!" : "";
            if (_prop.args) {
                let __args = [];
                for (let inputkey in _prop.args) {
                    let _required = "";
                    let _type = "";
                    if (typeof (_prop.args[inputkey]) == "string") {
                        _type = _prop.args[inputkey] as string;
                    } else {
                        _type = (_prop.args[inputkey] as GraphqlObjectPropertyInput).type;
                        _required = (_prop.args[inputkey] as GraphqlObjectPropertyInput).require ? "!" : "";
                    }
                    __args.push(`${inputkey}: ${_type}${_required}`)
                }
                if (__args.length > 0) {
                    _args = `(${__args.join(',')})`;
                }
            }
        }

        _def = `${name}${_args}: ${_type}${_required}\n`;
        return _def;
    }

    private __gen_resolver(resolver, rules: string[] = undefined){
        let _rules: string[] = ["authentification", ...this.rules];
        if(rules) _rules = [..._rules, ...rules];
        return (root, args, context: GraphQlContext ) => {
            if(!context.credentials) return Boom.unauthorized();
            if(!testPermissions(_rules, context.credentials)) return Boom.unauthorized();
            return resolver(root, args, context);
        }
    }

    gen_defs() {
        let _def = "";
        if(this.type == "scalar"){
            _def += `scalar ${this.name}\n`;
        } else {
            // -- input or type
            _def += `${this.type} ${this.name} {\n`;
            // -- properties
            for (let propertyKey in this.attributes) {
                _def += this.__gen_property(propertyKey, this.attributes[propertyKey]);
            }
            // -- end
            _def += `}`
        }
        return _def;
    }

    gen_resolvers() {
        let _resolverType = {};
        _resolverType[this.name] = {};
        for (let propertykey in this.attributes) {
            if (typeof this.attributes[propertykey] != "string") {
                let _prop = this.attributes[propertykey] as GraphqlObjectProperty;
                if (_prop.resolver) {
                    _resolverType[this.name][propertykey] = this.__gen_resolver(_prop.resolver, _prop.rules);
                }
            }
        }
        return _resolverType;
    }

    gen_query_defs() {
        if (!this.queryAttributes) return undefined;
        let _defs = '';
        for (let attr in this.queryAttributes) {
            _defs += this.__gen_property(attr, this.queryAttributes[attr]);
        }
        if (_defs == '') return undefined;
        return _defs;
    }

    gen_query_resolvers() {
        if (!this.queryAttributes) return undefined;
        let _resolver = {};
        for (let attr in this.queryAttributes) {
            if (typeof this.queryAttributes[attr] != "string") {
                let _prop = this.queryAttributes[attr] as GraphqlObjectProperty;
                if (_prop.resolver) {
                    _resolver[attr] = this.__gen_resolver(_prop.resolver, _prop.rules);
                }
            }
        }
        return _resolver;
    }

    gen_mutation_defs() {
        if (!this.mutationAttributes) return undefined;
        let _defs = '';
        for (let attr in this.mutationAttributes) {
            _defs += this.__gen_property(attr, this.mutationAttributes[attr]);
        }
        if (_defs == '') return undefined;
        return _defs;
    }

    gen_mutation_resolvers() {
        if (!this.mutationAttributes) return undefined;
        let _resolver = {};
        for (let attr in this.mutationAttributes) {
            if (typeof this.mutationAttributes[attr] != "string") {
                let _prop = this.mutationAttributes[attr] as GraphqlObjectProperty;
                if (_prop.resolver) {
                    _resolver[attr] = this.__gen_resolver(_prop.resolver, _prop.rules);
                }
            }
        }
        return _resolver;
    }

}

export abstract class GraphqlGroup {
    abstract name: string
    abstract childs: (GraphqlGroup | GraphqlObject)[]

    private __exploreGroups(): {groups: GraphqlGroup[], objects: GraphqlObject[] }{
        let _groups: GraphqlGroup[] = [this];
        let _objects: GraphqlObject[] = [];

        // -- explore tree
        let _explore = (child: GraphqlGroup | GraphqlObject) => {
            if (child instanceof GraphqlGroup) {
                _groups.push(child);
                child.childs.forEach(_child => { _explore(_child) });
            } else if (child instanceof GraphqlObject) {
                _objects.push(child);
            }
        }
        this.childs.forEach(child => { _explore(child) });

        return {
            groups: _groups,
            objects: _objects
        }
    }

    gen_objectDefs(){
        let _def = ``;
        let _explore = this.__exploreGroups();
        _explore.objects.forEach(child => { _def+= child.gen_defs(); })
        return _def;
    }

    gen_objectResolvers(){
        let _resolver = {}
        let _explore = this.__exploreGroups();
        _explore.objects.forEach(child => { _resolver = { ..._resolver, ...child.gen_resolvers() } });
        return _resolver;
    }

    gen_defs(prefix: "Query" | "Mutation" = "Query") {
        let _firstGroup = true;
        let _groups: GraphqlGroup[] = [this];
        let _objects: GraphqlObject[] = [];

        // -- explore tree
        let _explore = (child: GraphqlGroup | GraphqlObject) => {
            if (child instanceof GraphqlGroup) {
                _groups.push(child);
                child.childs.forEach(_child => { _explore(_child) });
            } else if (child instanceof GraphqlObject) {
                _objects.push(child);
            }
        }
        this.childs.forEach(child => { _explore(child) });

        let _def = ``;
        // -- generate groups type
        _groups.forEach(group => {
            _def += `type ${_firstGroup ? "" : prefix}${group.name} {`
            _firstGroup = false;
            group.childs.forEach(child => {
                if (child instanceof GraphqlObject) {
                    if (prefix == "Query") _def += child.gen_query_defs() || ""
                    if (prefix == "Mutation") _def += child.gen_mutation_defs() || ""
                } else if (child instanceof GraphqlGroup) {
                    _def += `${child.name} : ${prefix}${child.name}\n`;
                }
            })
            _def += `}\n`
        })

        return _def;
    }
    

    gen_resolvers(prefix: "Query" | "Mutation" = "Query", generateType: boolean = true) {
        let _resolver = {};
        let _explore = this.__exploreGroups();
        let _cpt = 0;

        _explore.groups.forEach(group => {
            let _groupName = `${_cpt == 0 ? "" : prefix}${group.name}`
            _resolver[_groupName] = {}
            group.childs.forEach(child => {
                if (child instanceof GraphqlObject) {
                    if (prefix == "Query") _resolver[_groupName] = { ..._resolver[_groupName], ...child.gen_query_resolvers() }
                    if (prefix == "Mutation") _resolver[_groupName] = { ..._resolver[_groupName], ...child.gen_mutation_resolvers() }
                } else if (child instanceof GraphqlGroup) {
                    _resolver[_groupName] = { 
                        ..._resolver[_groupName],
                        [child.name]: () => { return _resolver[`${prefix}${child.name}`] }
                    }
                    //_def += `${child.name} : ${prefix}${child.name}\n`;
                }
            })
            _cpt++;
        })

        /*_explore.objects.forEach(child => {
            if (prefix == "Query") 
                _resolver = { ..._resolver, ...child.gen_query_resolvers() }
            if (prefix == "Mutation") 
                _resolver = { ..._resolver, ...child.gen_mutation_resolvers() }
        })*/


        return _resolver;
    }
}


class user extends GraphqlObject {
    name = "User"
    attributes = {
        id: "Int",
        nom: "String"
    }
    queryAttributes = {
        addUser: {
            type: "User",
            args: { nom: "String", prenom: "String" },
            resolver: (root) => { return "blabla" }
        }
    }
}

class group extends GraphqlObject {
    name = "Group"
    attributes = {
        id: "Int",
        nom: "String"
    }
}

class testGroup extends GraphqlGroup {
    name = "TestGroup"
    childs = [new user(), new group()]
}

class userGroup extends GraphqlGroup {
    name = "UserGroup"
    childs = [new testGroup(), new user()]
}

class query extends GraphqlGroup {
    name = "Query"
    childs = [new userGroup()]
}

export const test = () => {
    var a = new query();

    return "<pre>" + JSON.stringify(a.gen_resolvers(), function (key, val) {
        if (typeof val === 'function') {
            return val + ''; // implicitly `toString` it
        }
        return val;
    }) + "</pre>";

    
}

