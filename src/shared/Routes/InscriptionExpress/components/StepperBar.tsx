import * as React from "react"
import { Step, StepButton, Stepper } from "material-ui"

type StepperBarProps = {
    activeStep?: number
}

export default ({ activeStep }: StepperBarProps) => (
    <Stepper activeStep={activeStep}>
        <Step>
            <StepButton>
                Adhérents
            </StepButton>
        </Step>
        <Step>
            <StepButton>
                Facture
            </StepButton>
        </Step>
        <Step>
            <StepButton>
                Réglements
            </StepButton>
        </Step>
        <Step>
            <StepButton>
                Résumé
            </StepButton>
        </Step>
    </Stepper>
)