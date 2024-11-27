const PMT = (rate, nper, pv, fv, type) => {
  /*
   * rate   - interest rate per month
   * nper   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  let pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (rate === 0) return -(pv + fv) / nper;

  pvif = Math.pow(1 + rate, nper);
  pmt = (-rate * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + rate;
  return pmt;
};

export default PMT;
