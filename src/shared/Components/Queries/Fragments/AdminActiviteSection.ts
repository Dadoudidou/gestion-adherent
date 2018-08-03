import gql from "graphql-tag"

export const QueryAdminActiviteSection = {
    fragments: {
        base: gql`
            fragment AdminActiviteSectionBase on AdminActiviteSection {
                id
                nom
                activite {
                    id
                    nom
                    categorie {
                        id
                        nom
                        campagne {
                            id
                            nom
                        }
                    }
                }
            }
        `,
    }
}