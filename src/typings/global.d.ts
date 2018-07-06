
declare namespace APIObjects {
    
    //#region COMPTABILITE

    type Tiers = Partial<{
        __id: number
        id: number
        nom: string
        prenom: string
        adresse: string
        codepostal: string
        ville: string
        email:string
        telephone_fixe: string
        telephone_mobile: string
        factures: Facture[]
    }>

    type Facture = Partial<{
        __id: number
        id: number
        date_creation: Date
        details: FactureDetail[]
        paiements: FacturePaiement[]
        tiers: Tiers
    }>

    type FactureDetail = Partial<{
        __id: number
        __canDeleted: boolean
        __canEdited: boolean
        id: number
        libelle: string
        description: string
        montant: number
        ordre: number
    }>

    type FacturePaiement = Partial<{
        __id: number
        id: number
        type: string
        montant: number
        date_banque: Date
        reference: string
        banque: string
        valide: boolean
    }>

    //#endregion

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

    //#region MEMBERS

    type Adherent = Partial<{
        __id: number
        id: number
        nom: string
        prenom: string
        datenaissance: Date
        male: boolean
        adresse: string
        codepostal: string
        ville: string
        numero_licence: string
        telephone_fixe: string
        telephone_mobile: string
        email: string
        adhesions: Adherent_Adhesion[]
        documents: Document[]
    }>

    type Adherent_Adhesion = Partial<{
        __id: number
        id: number
        valide: boolean
        adherent: Adherent
        section: ActiviteSection
        tarif: Tarif
        sessions: ActiviteSession[]
    }>

    type Document = Partial<{
        __id: number
        id: number
        type: string
        date_creation: Date
        libelle: string
        document: any
        validite: string
    }>

    //#endregion
}