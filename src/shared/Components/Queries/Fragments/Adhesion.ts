import gql from "graphql-tag"
import { QueryAdherent } from "./Adherent";
import { QueryAdminActiviteSection } from "./AdminActiviteSection";
import { QueryAdminTarif } from "./AdminTarif";
import { QueryAdminActiviteSession } from "./AdminActiviteSession";

export const QueryAdhesion = {
    fragments: {
        base: gql`
            fragment AdhesionBase on Adhesion {
                id
                adherent {
                    ...AdherentBase
                }
                section {
                    ...AdminActiviteSectionBase
                }
                tarif {
                    ...AdminTarifBase
                }
                sessions {
                    ...AdminActiviteSessionBase
                }
            }
            ${QueryAdherent.fragments.base}
            ${QueryAdminActiviteSection.fragments.base}
            ${QueryAdminTarif.fragments.base}
            ${QueryAdminActiviteSession.fragments.base}
        `,
    }
}