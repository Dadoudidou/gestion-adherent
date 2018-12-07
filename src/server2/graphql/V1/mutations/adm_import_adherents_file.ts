import { GQLField } from "@server/graphql/V1";
import { GraphQLBoolean } from "graphql";
import { GraphQLUpload } from "apollo-server-core"
import * as csv from "csvtojson"
import * as moment from "moment"

type FileResult = {
    filename: string
    stream?: NodeJS.ReadStream
    mimetype?: string
    encoding?: string
}

type args = {
    file: FileResult
}

const generateObjectFromHeadValues = (headValues: string[], obj: object) => {
    let _value: {[key: string]: any} = {};
    headValues.forEach(head => {
        let _key = Object.keys(obj).find(x => x.trim().toUpperCase().indexOf(head.toUpperCase()) > -1);
        if(head == "nom" || head == "prenom") _key = Object.keys(obj).find(x => x.trim().toUpperCase() == head.toUpperCase());
        if(!_key) return;
        _value[head] = obj[_key].trim();
    })
    return _value;
}

const transformObjectNaissance = (obj: object) => {
    let _value = obj;
    if(_value["naissance"] != "") {
        let _reg = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/g
        let _matches = _reg.exec(_value["naissance"] as string);
        if(_matches){
            _value = {
                ..._value,
                naissance: moment().startOf("day")
                    .year(parseInt(_matches[3]))
                    .month(parseInt(_matches[1]) - 1)
                    .date(parseInt(_matches[2]))
                    .toDate()
            }
        }
    }
    return _value;
}

export default {
    type: GraphQLBoolean,
    description: "Import de fichier adhérent",
    args: {
        file: { type: GraphQLUpload }
    },
    resolve: async (parent, args, context) => {
        let _file = await args.file;
        let _nbAdherents = 0;
        let _headers = ["nom", "prenom", "naissance", "adresse", "ville", "postal"];
        //let _tabAdherents = await csv().fromStream(_file.stream).then(jsonObj => { return jsonObj; });

        // process by lines
        let _tabAdherents = [];
        await csv()
        .fromStream(_file.stream)
        .subscribe((json) => {
            
            // -- récupération d'objet
            let _value: {[key: string]: any} = {};
            _value = generateObjectFromHeadValues(_headers, json);
            if(_value["nom"] == "") return undefined;

            // -- transformations
            _value = transformObjectNaissance(_value);

            // -- sauvegarde
            _tabAdherents.push(_value);

            return json;
        })

        //let _tabAdherents = ParserFileAdhesions(_file.stream);
        //_nbAdherents = _tabAdherents.length;
        
        console.log(`${_tabAdherents.length} adhérents`);
        console.log(_tabAdherents[0]);
        return true;
    }
} as GQLField<args>
