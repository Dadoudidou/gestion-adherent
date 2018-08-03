import gql from "graphql-tag"
import { QueryAdminLieu } from "./AdminLieu";

export const QueryAdminActiviteSession = {
    fragments: {
        base: gql`
            fragment AdminActiviteSessionBase on AdminActiviteSession {
                id
                jour
                heure_debut
                heure_fin
                lieu {
                    ...AdminLieuBase
                }
            }
            ${QueryAdminLieu.fragments.base}
        `,
    }
}