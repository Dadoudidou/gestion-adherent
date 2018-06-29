import * as React from "react"
import { Step, StepButton, Stepper } from "material-ui"

type StepperBarProps = {
    activeStep?: number
    onSelectStep?: (step: number) => void
}

export default ({ activeStep, onSelectStep }: StepperBarProps) => (
    <Stepper activeStep={activeStep}>
        <Step>
            <StepButton onClick={() => onSelectStep(0)}>
                Adhérents
            </StepButton>
        </Step>
        <Step>
            <StepButton onClick={() => onSelectStep(1)}>
                Facture
            </StepButton>
        </Step>
        <Step>
            <StepButton onClick={() => onSelectStep(2)}>
                Réglements
            </StepButton>
        </Step>
        <Step>
            <StepButton onClick={() => onSelectStep(3)}>
                Résumé
            </StepButton>
        </Step>
    </Stepper>
)