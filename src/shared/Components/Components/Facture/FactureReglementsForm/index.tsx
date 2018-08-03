import * as React from "react"
import { TextField, Typography } from "material-ui"
import FactureReglementForm from "./FactureReglementForm"
import * as moment from "moment"

type FactureReglementsFormProps = {
    facture: APIObjects.Facture
    onUpdateFacture: (facture: APIObjects.Facture) => void
}

type FactureReglementsFormState = {
    nbReglements?: number
}

class FactureReglementsForm extends React.PureComponent<FactureReglementsFormProps, FactureReglementsFormState>
{
    state = {
        nbReglements: 1
    }
    componentWillMount(){
        if(this.props.facture.paiements.length == 0){
            this.handle_onGenerate(1);
        }
    }
    handle_sum = () => {
        let _sum = 0;
        this.props.facture.details.forEach(x => _sum += x.montant ? x.montant : 0)
        return _sum;
    }
    handle_onGenerate = (nbReglement: number) => {
        let _paiements: APIObjects.FacturePaiement[] = [];
        let _sum = this.handle_sum();
        let _step = Math.floor(_sum / nbReglement);
        let _res = _sum;
        for(let i=0; i<nbReglement; i++){
            let _montant = _step;
            if(i==nbReglement-1){
                _montant = _sum - ((nbReglement-1) * _step);
            }
            _paiements.push({
                montant: _montant,
                date_banque: moment().add(i, "month").toISOString(),
                type: "cheque"
            })
        }
        this.props.onUpdateFacture({
            ...this.props.facture,
            paiements: _paiements
        })
    }
    render(){
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <Typography component="div">
                        <span>Nombre de mensualités </span>
                        <TextField 
                            style={{ marginLeft: "1em" }}
                            select
                            SelectProps={{ native: true }}
                            value={this.state.nbReglements}
                            onChange={(event) => { 
                                this.setState({ ...this.state, nbReglements: parseInt(event.target.value) }, () => {
                                    this.handle_onGenerate(this.state.nbReglements)
                                }) 
                            }}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </TextField>
                    </Typography>
                </div>
                {(this.props.facture.paiements || []).map((paiment, index) => (
                    <FactureReglementForm 
                        key={paiment.id || index} 
                        paiement={paiment}
                        onUpdatePaiement={(p) => {
                            this.props.onUpdateFacture({
                                ...this.props.facture,
                                paiements: this.props.facture.paiements.map((x, _index) => {
                                    if(_index != index) return x;
                                    return p
                                })
                            });
                        }}
                    />
                ))}
            </div>
        )
    }
}

export default FactureReglementsForm;