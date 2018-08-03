import gql from "graphql-tag"
import { Query } from "react-apollo"
import { QueryAdhesion } from "../Fragments/Adhesion";

export const getFactureQuery = gql`
query($facture_id: Int!){
    comptabilite {
      Facture(id: $facture_id) {
        id, date_creation
        tiers { id, nom, prenom, adresse, codepostal, ville }
        details { id, date_creation, libelle, ordre, montant }
        paiements { id, type, montant, date_banque, reference, banque, valide }
      }
    }
}  
`

export const getFactureAdhesionsQuery = gql`
query($facture_id: Int!){
    comptabilite {
      Facture(id: $facture_id) {
        id, date_creation
        tiers { id, nom, prenom, adresse, codepostal, ville }
        details { id, date_creation, libelle, ordre, montant }
        paiements { id, type, montant, date_banque, reference, banque, valide }
        adhesions { ...AdhesionBase }
      }
    }
}  
${QueryAdhesion.fragments.base}
`


type getFactureData = {
    comptabilite: {
        Facture: APIObjects.Facture
    }
}

type getFactureVariables = {
    facture_id: number
}

export class GetFacture extends Query<getFactureData, getFactureVariables>{}