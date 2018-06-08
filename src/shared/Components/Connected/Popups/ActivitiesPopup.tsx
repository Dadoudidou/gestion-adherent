import * as React from "react"
import gql from "graphql-tag"
import { graphql, ChildDataProps } from "react-apollo"

import * as Queries from "@shared/Components/Connected/Queries"

import ComponentBase from "@shared/Components/Components/Popups/ActivitiesPopup";


type ComponentProps = {
  campagne_id?: number
  adhesion?: APIObjects.Adherent_Adhesion
  open: boolean
  onSave?: (adhesion: APIObjects.Adherent_Adhesion) => void
  onClose?: () => void
}


export default ({ campagne_id, ...props }: ComponentProps) => (
  <Queries.GetActiviteSections
      query={Queries.getActiviteSections} 
      variables={{ campagne_id: campagne_id }}
  >
      {(data) => {
          if (data.loading) return <div>Loading...</div>
          if (data.error) return <div>Erreur</div>;
          return (
            <ComponentBase 
              {...props} 
              sections={data.data.admin.sections}
          />
          )
      }}
  </Queries.GetActiviteSections>
);