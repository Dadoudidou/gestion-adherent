import * as React from "react";
import * as moment from "moment"
import {
    StyleRulesCallback, withStyles, WithStyles,
    Grid, Paper, Typography, Button, DialogTitle, Dialog, DialogActions, DialogContent,
    CircularProgress
} from "@material-ui/core"

import {connect} from "react-redux"
import { IEReducer } from "./../../routes"
import Store from "@shared/Services/Store/redux"
import { Actions } from "./../../reducer"

import ElementsAFacturer from "./comps/ElementsAFacturer"

import Facture from "@shared/Components/Components/Facture/Facture"
import { dureeTarif, descriptionTarif } from "../../../../Components/Utils/Tarifs";

import ApolloStore from "@shared/Services/Store/apollo"
import gql from "graphql-tag"

import ReduxStore from "@shared/Services/Store/redux"
import { saveAdherentMutation, saveAdherentMutationVariables, saveAdherentMutationData } from "@shared/Components/Queries/Mutations/saveAdherent"
import { saveAdhesionMutation, saveAdhesionMutationVariables, saveAdhesionMutationData } from "@shared/Components/Queries/Mutations/saveAdhesion"
import { saveTiers, saveTiersData, saveTiersVariables } from "@shared/Components/Queries/Mutations/saveTiers"
import { saveFacture, saveFactureData, saveFactureVariables } from "@shared/Components/Queries/Mutations/saveFacture"
import { setAdhesionsTofactureData, setAdhesionsTofactureQuery, setAdhesionsTofactureVariables } from "@shared/Components/Queries/Mutations/setAdhesionsTofacture"


type classKey = "root" | "flex"

const styles: StyleRulesCallback<classKey> = theme => ({
    root: {
    },
    flex: { flex: 1 }
})


type StepFactureProps = {
    adherents?: APIObjects.Adherent[]
    facture?: APIObjects.Facture
    onDeleteItem?: (item: APIObjects.FactureDetail) => void
    onUpdateFacture?: (facture: APIObjects.Facture) => void
    onNextStep?: () => void

    saving?: boolean
}

type StepFactureState = {
    validationPopup?: boolean
}

class StepFacture extends React.PureComponent<StepFactureProps & WithStyles<classKey>, StepFactureState>
{
    
    constructor(props){
        super(props);
        this.state = {
            validationPopup: false
        }
    }
    componentWillMount(){

        let _adhesions: APIObjects.Adherent_Adhesion[] = [];
        this.props.adherents.forEach(adherent => {
            adherent.adhesions.forEach(adhesion => {
                if(adhesion.id) return;
                _adhesions.push({
                    adherent: {
                        id: adherent.id,
                        nom: adherent.nom,
                        prenom: adherent.prenom,
                        datenaissance: adherent.datenaissance
                    },
                    tarif: {
                        id: adhesion.tarif.id
                    }
                })
            });
        });

        ApolloStore.query({
            query: gql`
                query getFacture($adhesions: [AdhesionInput]) {
                    comptabilite {
                        Facture(adhesions: $adhesions){
                            id, date_creation
                            details {
                                id, date_creation, libelle, description, montant, ordre
                            }
                            paiements {
                                id
                            }
                            tiers {
                                id, nom, prenom, adresse, codepostal, ville, telephone_fixe, telephone_mobile, email
                            }
                        }
                    }
                }
            `,
            variables: {
                adhesions: _adhesions
            },
            fetchPolicy: 'no-cache'
        }).then(result => {
            this.props.onUpdateFacture((result.data as any).comptabilite.Facture);
        })

    }

    handle_onFirstClickNextStep = () => {
        this.setState({
            ...this.state,
            validationPopup: true
        })
    }

    render(){
        if(!this.props.facture) return <div></div>
        let _tiers: APIObjects.Tiers[] = []
        return (
            <div>
                <Grid container justify="center" spacing={24}>
                    <Grid item xl={6} lg={6} md={6}>
                        <Facture 
                            facture={this.props.facture}
                            tiersList={_tiers}
                            onUpdateFacture={this.props.onUpdateFacture}
                        />
                        <div style={{ marginTop: "1em", marginBottom: "1em", textAlign: "right" }}>
                            <Button variant="raised" color="primary" onClick={this.handle_onFirstClickNextStep}>
                                Passer au règlement
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <Dialog 
                    open={this.state.validationPopup}
                    onClose={() => this.setState({...this.state, validationPopup: false})}>
                    <DialogTitle>Enregistrer la facture ?</DialogTitle>
                    <DialogContent>
                        <Typography>
                        Attention !! L'enregistrement de cette facture sera définitif. Il ne sera pas possible de la modifier par la suite.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({...this.state, validationPopup: false})}>Retourner à la facture</Button>
                        <Button 
                            variant="raised" 
                            color="primary" 
                            onClick={() => { 
                                this.setState({...this.state, validationPopup: false}, () => {
                                    this.props.onNextStep() 
                                })
                            }}
                        >
                            Enregistrer et passer au règlement
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.props.saving || false}>
                    <DialogContent>
                        <div style={{textAlign: "center"}}>
                            <div><CircularProgress /></div>
                            <Typography variant="title">Enregistrement...</Typography>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default connect<StepFactureProps,Partial<StepFactureProps>, any, IEReducer>(
    (state) => ({
        adherents: state.InscriptionExpress.adherents,
        facture: state.InscriptionExpress.facture,
        saving: state.InscriptionExpress.savingFacture
    }),
    (dispatch) => ({
        onUpdateFacture: (facture) => {
            dispatch(Actions.setFacture(facture))
        },
        onNextStep: async () => {
            let _state: IEReducer = ReduxStore.getState() as any;
            dispatch(Actions.savingFacture(true));

            let _adhesions_ids = [];

            // -- enregistrement des adhérents
            // -- pour chaque adhérent, enregistrement des adhésions
            for(let i=0; i<_state.InscriptionExpress.adherents.length; i++){

                let _adherent = _state.InscriptionExpress.adherents[i];

                // -- enregistrement adhérent
                let _res = await ApolloStore.mutate<saveAdherentMutationData>({ 
                    mutation: saveAdherentMutation,
                    variables: { member: {  
                        adresse: _adherent.adresse,
                        codepostal: _adherent.codepostal,
                        datenaissance: _adherent.datenaissance,
                        email: _adherent.email,
                        id: _adherent.id,
                        male: _adherent.male || true,
                        nom: _adherent.nom,
                        prenom: _adherent.prenom,
                        telephone_fixe: _adherent.telephone_fixe,
                        telephone_mobile: _adherent.telephone_mobile,
                        ville: _adherent.ville
                    }} as saveAdherentMutationVariables,
                    fetchPolicy: 'no-cache'
                })
                _adherent.id = _res.data.member.saveMember.id;

                // -- enregistrment adhésion
                for(let j=0; j<_adherent.adhesions.length; j++){
                    let _adhesion = _adherent.adhesions[j];
                    let _res = await ApolloStore.mutate<saveAdhesionMutationData>({
                        mutation: saveAdhesionMutation,
                        variables: { adhesion: {
                            adherent: { id: _adherent.id },
                            tarif: { id: _adhesion.tarif.id },
                            valide: false,
                            sessions: ((_adhesion.tarif.nbsessionmin || _adhesion.tarif.nbsessionmax) && _adhesion.sessions) ?
                                _adhesion.sessions.map(session => ({ id: session.id })) :
                                undefined
                        }} as saveAdhesionMutationVariables
                    });
                    _adhesion.id = _res.data.member.saveAdhesion.id;
                    _adhesions_ids.push(_adhesion.id);
                }
            }

            let _facture = _state.InscriptionExpress.facture;

            // -- enregistrement du tiers
            let _res = await ApolloStore.mutate<saveTiersData>({ 
                mutation: saveTiers,
                variables: { tiers:{
                    id: _facture.tiers.id,
                    adresse: _facture.tiers.adresse,
                    codepostal: _facture.tiers.codepostal,
                    email: _facture.tiers.email,
                    nom:_facture.tiers.nom,
                    prenom: _facture.tiers.prenom,
                    telephone_fixe: _facture.tiers.telephone_fixe,
                    telephone_mobile:_facture.tiers.telephone_mobile,
                    ville:_facture.tiers.ville
                }} as saveTiersVariables,
                fetchPolicy: 'no-cache'
            })
            _facture = { ..._facture, tiers: { ..._facture.tiers, id: _res.data.comptabilite.saveTiers.id } }

            // -- enregistrement de la facture
            let _fres = await ApolloStore.mutate<saveFactureData>({
                mutation: saveFacture,
                variables: {facture: {
                    tiers: { id: _facture.tiers.id },
                    details: _facture.details.map(x => ({
                        description: x.description,
                        libelle: x.libelle,
                        montant: x.montant,
                        ordre: x.ordre
                    } as APIObjects.FactureDetail)),
                    paiements: []
                }} as saveFactureVariables,
                fetchPolicy: 'no-cache'
            });
            _facture = { ..._facture, id: _fres.data.comptabilite.saveFacture.id };

            // -- ajout des adhésions à la facture
            await ApolloStore.mutate<setAdhesionsTofactureData>({
                mutation: setAdhesionsTofactureQuery,
                variables: {
                    facture_id: _facture.id,
                    adhesions_ids: _adhesions_ids
                } as setAdhesionsTofactureVariables
            })

            // -- étape suivante
            dispatch(Actions.setFacture(_facture));
            dispatch(Actions.savingFacture(false));
            dispatch(Actions.nextStep());
            
        }
    })
) (
    withStyles(styles)(StepFacture)
)