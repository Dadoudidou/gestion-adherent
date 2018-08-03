import gql from "graphql-tag"

export const QueryAdminLieu = {
    fragments: {
        base: gql`
            fragment AdminLieuBase on AdminLieu {
                id
                nom
                adresse
                codepostal
                ville
            }
        `,
    }
}