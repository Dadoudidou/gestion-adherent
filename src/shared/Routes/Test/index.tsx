import * as React from "react";


import DocumentTitle from "@shared/Components/Commons/DocumentTitle"
import Overdrive from "@shared/Services/Overdrive"

import Authenticated from "@shared/Services/Auth/Authenticated"
import Authorized from "@shared/Services/Auth/Authorized"

import { Button } from "material-ui"

import QueueAnim from "rc-queue-anim"
import { PermissionsList } from "@shared/Services/Auth/permissions";

import ActivitiesList from "@shared/Components/Components/Lists/ActivitiesList"
import ActivitiesPopUp from "@shared/Components/Components/Popups/ActivitiesPopup";

import DataTable from "@shared/Components/Commons/DataTable"

require("./index.scss");

export class TestComponent extends React.PureComponent<any, any>
{
    render(){
        return (
            <div>
                
                <ActivitiesPopUp 
                  open={true}
                  sections={[
                    {
                      "id": 1,
                      "nom": "President",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 1,
                        "nom": "Bureau",
                        "categorie": {
                          "id": 1,
                          "nom": "Bénévoles"
                        }
                      }
                    },
                    {
                      "id": 2,
                      "nom": "Trésorier",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 1,
                        "nom": "Bureau",
                        "categorie": {
                          "id": 1,
                          "nom": "Bénévoles"
                        }
                      }
                    },
                    {
                      "id": 3,
                      "nom": "Secrétaire",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 1,
                        "nom": "Bureau",
                        "categorie": {
                          "id": 1,
                          "nom": "Bénévoles"
                        }
                      }
                    },
                    {
                      "id": 4,
                      "nom": "Membre",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 1,
                        "nom": "Bureau",
                        "categorie": {
                          "id": 1,
                          "nom": "Bénévoles"
                        }
                      }
                    },
                    {
                      "id": 5,
                      "nom": "Encadrant",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 2,
                        "nom": "Encadrant",
                        "categorie": {
                          "id": 1,
                          "nom": "Bénévoles"
                        }
                      }
                    },
                    {
                      "id": 6,
                      "nom": "Minime",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 3,
                        "nom": "Natation",
                        "categorie": {
                          "id": 2,
                          "nom": "Compétition"
                        }
                      }
                    },
                    {
                      "id": 7,
                      "nom": "Cadet",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 3,
                        "nom": "Natation",
                        "categorie": {
                          "id": 2,
                          "nom": "Compétition"
                        }
                      }
                    },
                    {
                      "id": 8,
                      "nom": "Elite",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 3,
                        "nom": "Natation",
                        "categorie": {
                          "id": 2,
                          "nom": "Compétition"
                        }
                      }
                    },
                    {
                      "id": 9,
                      "nom": "Creps",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 3,
                        "nom": "Natation",
                        "categorie": {
                          "id": 2,
                          "nom": "Compétition"
                        }
                      }
                    },
                    {
                      "id": 10,
                      "nom": "Water-Polo",
                      "sessions": [
                        {
                          "id": 3,
                          "jour": 2,
                          "heure_debut": "20:15:00",
                          "heure_fin": "21:30:00",
                          "place": 50,
                          "lieu": {
                            "id": 1,
                            "nom": "Centre Nautique"
                          }
                        },
                        {
                          "id": 4,
                          "jour": 4,
                          "heure_debut": "20:00:00",
                          "heure_fin": "21:30:00",
                          "place": 50,
                          "lieu": {
                            "id": 1,
                            "nom": "Centre Nautique"
                          }
                        }
                      ],
                      "tarifs": [
                        {
                          id: 1,
                          nbsessionmin: 1,
                          nbsessionmax: 1,
                          montant: 90,
                          restriction_date_debut: new Date(2017,8,1),
                          restriction_date_fin: new Date(2018,11,31)
                        },
                        {
                          id: 2,
                          montant: 270,
                        },
                        {
                          id: 3,
                          nbsessionmin: 2,
                          nbsessionmax: 5,
                          montant: 90,
                          restriction_date_debut: new Date(2018,3,1),
                          restriction_date_fin: new Date(2018,5,30)
                        },
                        {
                          id: 4,
                          montant: 130,
                          nbsessionmin: 1,
                          nbsessionmax: 1,
                        },
                      ],
                      "activite": {
                        "id": 4,
                        "nom": "Water-Polo",
                        "categorie": {
                          "id": 2,
                          "nom": "Compétition"
                        }
                      }
                    },
                    {
                      "id": 11,
                      "nom": "Aquagym",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 5,
                        "nom": "Aquaforme",
                        "categorie": {
                          "id": 3,
                          "nom": "Loisir"
                        }
                      }
                    },
                    {
                      "id": 12,
                      "nom": "AquaPalming",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 5,
                        "nom": "Aquaforme",
                        "categorie": {
                          "id": 3,
                          "nom": "Loisir"
                        }
                      }
                    },
                    {
                      "id": 13,
                      "nom": "Adolescent",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 6,
                        "nom": "Natation",
                        "categorie": {
                          "id": 3,
                          "nom": "Loisir"
                        }
                      }
                    },
                    {
                      "id": 14,
                      "nom": "Adulte",
                      "sessions": [],
                      "tarifs": [],
                      "activite": {
                        "id": 6,
                        "nom": "Natation",
                        "categorie": {
                          "id": 3,
                          "nom": "Loisir"
                        }
                      }
                    }
                  ]}
                />
                
            </div>
        )
    }
}

export default class Test extends React.PureComponent<any, any>
{
    render(){
        return (
            <Authenticated>
                <DocumentTitle title="Test">
                    <div>
                        <QueueAnim type="top">
                            <Button key="1">Menu 1</Button>
                            <Button key="2">Menu 2</Button>
                            <Button key="3">Menu 3</Button>
                            <Authorized key="4" permissions={[ 1,3,53 ]}>
                                <Button >Menu 4</Button>
                            </Authorized>
                        </QueueAnim>
                    </div>
                </DocumentTitle>
            </Authenticated>
        )
    }
}


export class Test1 extends React.PureComponent<any, any>
{
    render(){
        return (
            <Authenticated>
                <DocumentTitle title="Deuxième test">
                    <div>
                        <Overdrive id="test">
                            <div className="bg">
                                Page Test 2
                            </div>
                        </Overdrive>
                        <p>
                            Simple test 2
                        </p>
                    </div>
                </DocumentTitle>
            </Authenticated>
        )
    }
}