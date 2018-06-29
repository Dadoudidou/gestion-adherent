import * as React from "react"
import gql from "graphql-tag"
import deepExtend from "deep-extend"
import { graphql, ChildDataProps, compose, Query } from "react-apollo"

import * as Queries from "@shared/Components/Connected/Queries";
import ComponentBase from "@shared/Components/Components/Adherent/ListAdherentActivites";

window["deepExtend"] = deepExtend;

type ComponentProps = {
    adherent: APIObjects.Adherent,
    onClickAddActivite?: (campagne: APIObjects.Campagne) => void
    onSelectActivite?: (adhesion?: APIObjects.Adherent_Adhesion) => void
}


export default (props: ComponentProps) => (
    <Queries.GetAdherentActivitesQuery
        query={Queries.getAdherentActivites} 
        variables={{ member_id: props.adherent.id || 0 }}
    >
        {(dataAdherent) => {
            if (dataAdherent.loading) return <div>Loading...</div>
            if (dataAdherent.error) return <div>Erreur</div>;
            return (
                <Queries.GetCampagnes query={Queries.getCampagnes}>
                    {(dataCampagnes) => {
                        if (dataCampagnes.loading) return <div>Loading...</div>
                        if (dataCampagnes.error) return <div>Erreur</div>;
                        return (
                            <ComponentBase 
                                {...props} 
                                adherent={props.adherent}
                                campagnes={dataCampagnes.data.admin.campagnes}
                            />
                        )
                    }}
                </Queries.GetCampagnes>
            )
        }}
    </Queries.GetAdherentActivitesQuery>
)
