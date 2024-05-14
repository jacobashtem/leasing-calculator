import { calculateLeasingByCoefficient, calculateInstallments, calculateCoefficient } from '../services/calculateLeasingFee';


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { ageOfCar, carValue, drivePlus, calculatorType } = body;
    const carIsNew = ageOfCar >= 2023;
    let effectiveCarValue = carValue; 
    if (calculatorType === 'brutto') {
        effectiveCarValue = carValue / 1.23; 
    }
    const { coefficient, message } = calculateCoefficient(effectiveCarValue , carIsNew);
    if (coefficient === null) {
        return { message };
    }

    let finalLeasingFeeNetto = calculateLeasingByCoefficient(effectiveCarValue , coefficient);
    if (!drivePlus) {
        finalLeasingFeeNetto *= 1.11;  
    }
    const finalLeasingFeeInBrutto = (finalLeasingFeeNetto * 1.23).toFixed(2);
    const inTwoInstallments = calculateInstallments(finalLeasingFeeNetto, 200, 2, 2);
    const inFourInstallments = calculateInstallments(finalLeasingFeeNetto, 200, 4, 4);

    return {
        finalLeasingFeeInNetto: finalLeasingFeeNetto.toFixed(2),
        finalLeasingFeeInBrutto,
        inTwoInstallments,
        inFourInstallments
    };
});
