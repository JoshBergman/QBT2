const trimEXP = (expenses: [string, number][]) => {
  const exps = expenses.concat([]);
  const returnExpenses: [string, number][] = exps.map((exp) => {
    const trimmedTitle = exp[0].slice(4);
    const expAmount = exp[1];

    return [trimmedTitle, expAmount];
  });

  return returnExpenses;
};

export default trimEXP;
