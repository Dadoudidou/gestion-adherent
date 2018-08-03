import gql from "graphql-tag"

export const QueryAdherent = {
    fragments: {
        base: gql`
            fragment AdherentBase on Adherent {
                id, nom, prenom, datenaissance, male
            }
        `,
        contact: gql`
            fragment AdherentContact on Adherent {
                adresse, codepostal, ville, telephone_fixe, telephone_mobile, email
            }
        `
    }
}