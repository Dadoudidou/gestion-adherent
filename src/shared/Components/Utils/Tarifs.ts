import moment from "moment";

export const dureeTarif = (tarif: APIObjects.Tarif): string => {
    let _desc = "";
    if(tarif.restriction_date_debut && tarif.restriction_date_fin){
        _desc = `du ${moment(tarif.restriction_date_debut).utc().format("ll")} au ${moment(tarif.restriction_date_fin).utc().format("ll")}`;
    } else {
        _desc = "Tarif annuel"
    }
    return _desc;
}

export const descriptionTarif = (tarif: APIObjects.Tarif): string => {
    let _desc = "";
    if(tarif.carte){
        _desc = `Carte de ${tarif.carte_nbsession} séance${tarif.carte_nbsession > 1 ? 's' : ''}`
    } else {
        if(tarif.nbsessionmin && tarif.nbsessionmax){
            if(tarif.nbsessionmin == tarif.nbsessionmax){
                _desc = `${tarif.nbsessionmin} séance${tarif.nbsessionmin > 1 ? 's' : ''}`;
            } else {
                _desc = `de ${tarif.nbsessionmin} à ${tarif.nbsessionmax} séances`
            }
            _desc += ` / semaine`;
        } else {
            _desc = `Toutes séances`
        }
    }
    return _desc;
}