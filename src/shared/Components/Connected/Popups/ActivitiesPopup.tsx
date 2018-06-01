import * as React from "react"
import gql from "graphql-tag"
import { graphql, ChildDataProps } from "react-apollo"

import ComponentBase from "@shared/Components/Components/Popups/ActivitiesPopup";

const Sections_Query = gql`
    {
    admin {
      sections {
        id
        nom
        activite {
          id
          nom
          categorie {
            id
            nom
          }
        }
        sessions {
          id
          jour
          heure_debut
          heure_fin
          place
          lieu {
            id
            nom
          }
        }
        tarifs {
          id
          montant
          nbsessionmin
          nbsessionmax
          carte
          carte_nbsession
          restriction_date_debut
          restriction_date_fin
        }
      }
    }
  }
`
type Response = {
  admin: {
    sections: APIObjects.ActiviteSection[]
  }
}

type ComponentProps = {
  open: boolean
  onSave?: (section: APIObjects.ActiviteSection, tarif: APIObjects.Tarif, sessions: APIObjects.ActiviteSession[]) => void
  onClose?: () => void
}

type ChildProps = ChildDataProps<ComponentProps, Response, any>

const withSections = graphql<ComponentProps, Response, any, ChildProps>(Sections_Query, {

})

export default withSections(({ data, ...props }) => {
  if (data.loading) return <div>Loading...</div>
  if (data.error) return <div>Erreur</div>;

  return (<ComponentBase {...props} sections={data.admin.sections} />)
})