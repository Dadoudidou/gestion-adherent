import { IAction, actionCreator, isType } from "@shared/Modules/redux-actions"
import { IEViewAdherentTabValue } from "./components/StepAdherent/comps/ViewAdherent";


const _rootActions = "IEActions/"
export const Actions = {
    removeAllAdherents: actionCreator(`${_rootActions}removeAllAdherents`),
    addAdherent: actionCreator<APIObjects.Adherent>(`${_rootActions}addAdherent`),
    addAdherents: actionCreator<APIObjects.Adherent[]>(`${_rootActions}addAdherents`),
    removeAdherent: actionCreator<APIObjects.Adherent>(`${_rootActions}removeAdherent`),
    updateAdherent: actionCreator<APIObjects.Adherent>(`${_rootActions}updateAdherent`),
    gotoStep: actionCreator<number>(`${_rootActions}gotoStep`),
    nextStep: actionCreator(`${_rootActions}nextStep`),
    previousStep: actionCreator(`${_rootActions}previousStep`),
}

export type IEState = {
    adherents: APIObjects.Adherent[]
    step: number
}

export let InitialState: IEState = {
    adherents: [],
    step: 0,
}

InitialState = {"adherents":[{"__id":1530014826672,"nom":"Violet","id":1,"prenom":"David","datenaissance":"1984-11-28T23:00:00.000Z","adresse":"15 rue de Palencia","codepostal":"18000","ville":"Bourges","telephone_fixe":null,"telephone_mobile":null,"email":null,"__typename":"Adherent","adhesions":[{"section":{"id":10,"nom":"Water-Polo","activite":{"id":4,"nom":"Water-Polo","categorie":{"id":2,"nom":"Compétition","campagne":{"id":1,"__typename":"AdminCampagne"},"__typename":"AdminActiviteCategorie"},"__typename":"AdminActivite"},"sessions":[{"id":3,"jour":2,"heure_debut":"20:15:00","heure_fin":"21:30:00","place":50,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":4,"jour":4,"heure_debut":"20:00:00","heure_fin":"21:30:00","place":50,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"tarifs":[{"id":1,"montant":235,"nbsessionmin":null,"nbsessionmax":null,"carte":null,"carte_nbsession":null,"restriction_date_debut":null,"restriction_date_fin":null,"__typename":"AdminTarif"}],"__typename":"AdminActiviteSection"},"tarif":{"id":1,"montant":235,"nbsessionmin":null,"nbsessionmax":null,"carte":null,"carte_nbsession":null,"restriction_date_debut":null,"restriction_date_fin":null,"__typename":"AdminTarif"},"sessions":[{"id":3,"jour":2,"heure_debut":"20:15:00","heure_fin":"21:30:00","place":50,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":4,"jour":4,"heure_debut":"20:00:00","heure_fin":"21:30:00","place":50,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"__id":1530014886097}]},{"__id":1530014861098,"adresse":"15 rue de Palencia","ville":"Bourges","codepostal":"18000","telephone_fixe":null,"nom":"Violet","prenom":"Claire","datenaissance":"1985-03-25T23:00:00.000Z","adhesions":[{"section":{"id":11,"nom":"Aquagym","activite":{"id":5,"nom":"Aquaforme","categorie":{"id":3,"nom":"Loisir","campagne":{"id":1,"__typename":"AdminCampagne"},"__typename":"AdminActiviteCategorie"},"__typename":"AdminActivite"},"sessions":[{"id":5,"jour":1,"heure_debut":"12:00:00","heure_fin":"12:45:00","place":10,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":6,"jour":1,"heure_debut":"12:45:00","heure_fin":"13:30:00","place":10,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":7,"jour":1,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":8,"jour":2,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":9,"jour":3,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":10,"jour":4,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":11,"jour":5,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"tarifs":[{"id":2,"montant":90,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":3,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":4,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"},{"id":5,"montant":170,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":6,"montant":150,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":7,"montant":150,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"}],"__typename":"AdminActiviteSection"},"tarif":{"id":2,"montant":90,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},"sessions":[{"id":7,"jour":1,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"__id":1530014896338},{"section":{"id":11,"nom":"Aquagym","activite":{"id":5,"nom":"Aquaforme","categorie":{"id":3,"nom":"Loisir","campagne":{"id":1,"__typename":"AdminCampagne"},"__typename":"AdminActiviteCategorie"},"__typename":"AdminActivite"},"sessions":[{"id":5,"jour":1,"heure_debut":"12:00:00","heure_fin":"12:45:00","place":10,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":6,"jour":1,"heure_debut":"12:45:00","heure_fin":"13:30:00","place":10,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":7,"jour":1,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":8,"jour":2,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":9,"jour":3,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":10,"jour":4,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":11,"jour":5,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"tarifs":[{"id":2,"montant":90,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":3,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":4,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"},{"id":5,"montant":170,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":6,"montant":150,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":7,"montant":150,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"}],"__typename":"AdminActiviteSection"},"tarif":{"id":3,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},"sessions":[{"id":7,"jour":1,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"__id":1530015045592},{"section":{"id":11,"nom":"Aquagym","activite":{"id":5,"nom":"Aquaforme","categorie":{"id":3,"nom":"Loisir","campagne":{"id":1,"__typename":"AdminCampagne"},"__typename":"AdminActiviteCategorie"},"__typename":"AdminActivite"},"sessions":[{"id":5,"jour":1,"heure_debut":"12:00:00","heure_fin":"12:45:00","place":10,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":6,"jour":1,"heure_debut":"12:45:00","heure_fin":"13:30:00","place":10,"lieu":{"id":1,"nom":"Centre Nautique","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":7,"jour":1,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":8,"jour":2,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":9,"jour":3,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":10,"jour":4,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"},{"id":11,"jour":5,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"tarifs":[{"id":2,"montant":90,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":3,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":4,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"},{"id":5,"montant":170,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2018-09-01T00:00:00.000Z","restriction_date_fin":"2018-12-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":6,"montant":150,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-01-01T00:00:00.000Z","restriction_date_fin":"2019-03-31T23:59:59.000Z","__typename":"AdminTarif"},{"id":7,"montant":150,"nbsessionmin":2,"nbsessionmax":2,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"}],"__typename":"AdminActiviteSection"},"tarif":{"id":4,"montant":80,"nbsessionmin":1,"nbsessionmax":1,"carte":null,"carte_nbsession":null,"restriction_date_debut":"2019-04-01T00:00:00.000Z","restriction_date_fin":"2019-06-30T23:59:59.000Z","__typename":"AdminTarif"},"sessions":[{"id":7,"jour":1,"heure_debut":"20:00:00","heure_fin":"20:45:00","place":10,"lieu":{"id":2,"nom":"Picsine des Gibjoncs","__typename":"AdminLieu"},"__typename":"AdminActiviteSession"}],"__id":1530015052994}]}],"step":1} as any

const __privates = {
    newAdherent: (payload: APIObjects.Adherent): APIObjects.Adherent => {
        return {
            ...payload,
            __id: (payload.id) ? payload.id : Date.now()
        }
    }
}

export const reducer = (state: IEState = InitialState, action: IAction<any>): IEState => {

    

    if(isType(action, Actions.addAdherent)){
        return {
            ...state,
            adherents: [
                ...state.adherents,
                __privates.newAdherent(action.payload)
            ]
        };
    }

    if(isType(action, Actions.addAdherents)){
        return {
            ...state,
            adherents: [
                ...state.adherents,
                ...action.payload.map(x => __privates.newAdherent(x))
            ]
        }
    }

    if(isType(action, Actions.removeAdherent)){
        let _index = state.adherents.map(x => x.__id).indexOf(action.payload.__id);
        if(_index > -1){
            return {
                ...state,
                adherents: [
                    ...state.adherents.splice(0, _index),
                    ...state.adherents.splice(_index + 1)
                ]
            }
        }
    }

    if(isType(action, Actions.removeAllAdherents)){
        return {
            ...state,
            adherents: []
        };
    }

    if(isType(action, Actions.updateAdherent)){
        let _index = state.adherents.map(x => x.__id).indexOf(action.payload.__id);
        if(_index > -1){
            return {
                ...state,
                adherents: state.adherents.map((adherent, index) => {
                    if(index != _index) return adherent;
                    return action.payload;
                })
            }
        }
    }

    if(isType(action, Actions.gotoStep)){
        return {
            ...state,
            step: action.payload
        }
    }

    if(isType(action, Actions.nextStep)){
        return {
            ...state,
            step: state.step + 1
        }
    }

    if(isType(action, Actions.previousStep)){
        return {
            ...state,
            step: state.step - 1
        }
    }

    return state;
}