// server/services/leasingCalculations.ts

export function calculateCoefficient(carValue: number, carIsNew: boolean): { coefficient: number | null, message?: string } {
  const thresholds = [
      { threshold: 400000, coefficient: null, message: 'Dla samochodów powyżej 400000 zł netto składki nie szacujemy, ponieważ potrzebne jest dokładne wyliczenie składki u ubezpieczyciela.' },
      { threshold: 200000, coefficient: 2 },
      { threshold: 100000, coefficient: 4 },
      { threshold: 40000, coefficient: 5 },
      { threshold: 0, coefficient: 8 } 
  ];

  const found = thresholds.find(item => carValue > item.threshold);
  if (found && found.coefficient === null) {
      return { coefficient: null, message: found.message };
  }

  let coefficient = found ? found.coefficient : 8;
  if (!carIsNew) {
      coefficient += 1;
  }

  return { coefficient };
}

export function calculateLeasingByCoefficient(carValue: number, coefficient: number): number {
  return carValue * coefficient / 100;
}

export function calculateInstallments(total: number, increment: number, percentage: number, periods: number): { nettoTotal: string, bruttoTotal: string, nettoPerMonth: string, bruttoPerMonth: string } {
  let nettoTotal = (total + increment) * (1 + percentage / 100);
  let bruttoTotal = nettoTotal * ((1.23));
  return {
      nettoTotal: nettoTotal.toFixed(2),
      bruttoTotal: bruttoTotal.toFixed(2),
      nettoPerMonth: (nettoTotal / periods).toFixed(2),
      bruttoPerMonth: (bruttoTotal / periods).toFixed(2)
  };
}
