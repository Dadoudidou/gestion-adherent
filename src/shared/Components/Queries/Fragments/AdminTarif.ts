import gql from "graphql-tag"

export const QueryAdminTarif = {
    fragments: {
        base: gql`
            fragment AdminTarifBase on AdminTarif {
                id, montant, nbsessionmin, nbsessionmax, carte, carte_nbsession, restriction_date_debut, restriction_date_fin
            }
        `,
    }
}