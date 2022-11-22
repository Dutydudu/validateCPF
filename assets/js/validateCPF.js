class ValidateCPF {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cleanCpf', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfSent.replace(/\D+/g, '')
    });
  }

  isSequence() {
    return this.cleanCpf.charAt(0).repeat(11) === this.cleanCpf;
  }

  generateNewCpf() {
    const cpfWithoutDigits = this.cleanCpf.slice(0, -2);
    const firstDigit = ValidateCPF.geraDigito(cpfWithoutDigits);
    const secondtDigit = ValidateCPF.geraDigito(cpfWithoutDigits + firstDigit);
    this.newCPF = cpfWithoutDigits + firstDigit + secondtDigit;
  }

  static geraDigito(cpfWithoutDigits) {
    let total = 0;
    let reverse = cpfWithoutDigits.length + 1;

    for(let stringNumerical of cpfWithoutDigits) {
      total += 
      reverse * Number(stringNumerical);
      reverse--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  valida() {
    if(!this.cleanCpf) return false;
    if(typeof this.cleanCpf !== 'string') return false;
    if(this.cleanCpf.length !== 11) return false;
    if(this.isSequence()) return false;
    this.generateNewCpf();

    return this.newCPF === this.cleanCpf;
  }
}
