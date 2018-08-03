import * as React from "react"
import { Step, StepButton, Stepper, StepLabel } from "material-ui"

type StepperBarProps = {
    activeStep?: number
    onSelectStep?: (step: number) => void
}

export default ({ activeStep, onSelectStep }: StepperBarProps) => (
    <Stepper activeStep={activeStep}>
        <Step>
            {activeStep < 2 ? 
                <StepButton onClick={() => onSelectStep(0)}>
                    Adhérents
                </StepButton>
            :
                <StepLabel>
                    Adhérents
                </StepLabel>
            }
        </Step>
        <Step>
            {activeStep < 2 ? 
                <StepButton onClick={() => onSelectStep(1)}>
                Facture
            </StepButton>
            :
                <StepLabel>
                    Facture
                </StepLabel>
            }
        </Step>
        <Step>
            {activeStep < 2 ? 
                <StepButton onClick={() => onSelectStep(2)}>
                Réglements
            </StepButton>
            :
                <StepLabel>
                    Réglements
                </StepLabel>
            }
        </Step>
        <Step>
            {activeStep < 2 ? 
                <StepButton onClick={() => onSelectStep(3)}>
                Résumé
            </StepButton>
            :
                <StepLabel>
                    Résumé
                </StepLabel>
            }
        </Step>
    </Stepper>
)