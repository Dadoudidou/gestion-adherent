import * as React from "react";


import DocumentTitle from "@shared/Components/Commons/DocumentTitle"
import Overdrive from "@shared/Services/Overdrive"

import Authenticated from "@shared/Services/Auth/Authenticated"
import Authorized from "@shared/Services/Auth/Authorized"

import { Button } from "material-ui"

import QueueAnim from "rc-queue-anim"
import { PermissionsList } from "@shared/Services/Auth/permissions";

import ActivitiesList from "@shared/Components/Components/Lists/ActivitiesList"

require("./index.scss");

export class TestComponent extends React.PureComponent<any, any>
{
    render(){
        return (
            <div>
                <ActivitiesList 
                    sections={[
                        {
                          "id": 1,
                          "nom": "President",
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