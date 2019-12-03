export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Campo obrigatório.',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidCPFCNPJ': 'CPF/CNPJ inválido.',
      'invalidEmailAddress': 'Endereço de e-mail inválido',
      'invalidPassword': 'Senha Inválida. Senha precisa conter pelo menos 6 caracteres, e ao menos um número.',
      'minlength': `Tamanho mínimo é de ${validatorValue.requiredLength} caracteres.`,
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static validarCPF_CNPJ(control) {
    if (control.value == null) {
      return null;
    }
    let auxValorInicial = control.value;

    if (auxValorInicial.value == "") {
      return null;
    }

    if (((auxValorInicial.length == 11) && (auxValorInicial == 11111111111) || (auxValorInicial == 22222222222) ||
      (auxValorInicial == 33333333333) || (auxValorInicial == 44444444444) || (auxValorInicial == 55555555555) ||
      (auxValorInicial == 66666666666) || (auxValorInicial == 77777777777) || (auxValorInicial == 88888888888) ||
      (auxValorInicial == 99999999999))) {
      return { 'invalidCPFCNPJ': true };
    }

    if (!((auxValorInicial.length == 11) || (auxValorInicial.length == 14))) {
      return { 'invalidCPFCNPJ': true };
    }

    var checkOK = "0123456789";
    var checkStr = auxValorInicial;
    var allValid = true;
    var allNum = "";
    for (let i = 0; i < checkStr.length; i++) {
      let ch = checkStr.charAt(i);
      for (var j = 0; j < checkOK.length; j++)
        if (ch == checkOK.charAt(j))
          break;
      if (j == checkOK.length) {
        allValid = false;
        break;
      }
      allNum += ch;
    }
    if (!allValid) {
      return { 'invalidCPFCNPJ': true };
    }

    var chkVal = allNum;
    var prsVal = parseFloat(allNum);
    if (chkVal != "" && !(prsVal > 0)) {
      return { 'invalidCPFCNPJ': true };
    }

    if (auxValorInicial.length == 11) {
      var tot = 0;

      for (let i = 2; i <= 10; i++)
        tot += i * parseInt(checkStr.charAt(10 - i));

      if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(9))) {
        return { 'invalidCPFCNPJ': true };
      }

      tot = 0;

      for (let i = 2; i <= 11; i++)
        tot += i * parseInt(checkStr.charAt(11 - i));

      if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(10))) {
        return { 'invalidCPFCNPJ': true };
      }
    } else {
      var tot = 0;
      var peso = 2;

      for (let i = 0; i <= 11; i++) {
        tot += peso * parseInt(checkStr.charAt(11 - i));
        peso++;
        if (peso == 10) {
          peso = 2;
        }
      }

      if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(12))) {
        return { 'invalidCPFCNPJ': true };
      }

      tot = 0;
      peso = 2;

      for (let i = 0; i <= 12; i++) {
        tot += peso * parseInt(checkStr.charAt(12 - i));
        peso++;
        if (peso == 10) {
          peso = 2;
        }
      }

      if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(13))) {
        return { 'invalidCPFCNPJ': true };
      }
    }
    return null;
  }
}