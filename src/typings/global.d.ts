
declare namespace APIObjects {
    
    //#region SYSTEM
    type User = Partial<{

    }>

    type Group = Partial<{
        
    }>

    type Permission = Partial<{
        
    }>
    //#endregion

    //#region ADMIN

    //#region ACTIVITES
    type Activite = Partial<{
        id: number
        nom: string
        sections: ActiviteSection[]
        categorie: ActiviteCategorie
    }>
    type ActiviteCategorie = Partial<{
        id: number
        nom: string
        activites: Activite[]
        campagne: Campagne
    }>
    type ActiviteSection = Partial<{
        id: number
        nom: string
        sessions: ActiviteSession[]
        activite: Activite
        tarifs: Tarif[]
    }>
    type ActiviteSession = Partial<{
        id: number
        jour: number
        heure_debut: string
        heure_fin: string
        place: number
        lieu: Lieu
        section: ActiviteSection
    }>
    type ActiviteSessions = { sessions: ActiviteSession[] }
    //#endregion
    
    type Lieu = Partial<{
        id: number
        nom: string
        adresse: string
        codepostal: string
        ville: string
        sessions: ActiviteSession[]
    }>
    type Campagne = Partial<{
        id: number
        debut: Date
        fin: Date
        nom: string
        activites: Activite[]
    }>
    type Tarif = Partial<{
        id: number
        montant: number
        nbsessionmin?: number
        nbsessionmax?: number
        carte?: boolean
        carte_nbsession?: number
        restriction_date_debut?: Date
        restriction_date_fin?: Date
        campagne: Campagne
        section: ActiviteSection
    }>
    type TarifLicence = Partial<{
        id: number
        montant: number
        restriction_age_min?: number
        restriction_age_max?: number
        nom?: string
        campagne: Campagne
    }>
    //#endregion

}