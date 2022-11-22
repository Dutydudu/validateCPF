class ValidateForm {
    constructor() {
        this.form = document.querySelector('#form');
        this.event();
    }

    event() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.validFields();
        const validPassword = this.validPassword();

        if(validFields && validPassword) {
            alert('Formulario enviado.');
            this.form.submit();
        }
    }

    validPassword() {
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');

        if(password.value != repeatPassword.value) {
            valid = false;
            this.createsError(password, 'Campos senha e repetir senha precisam ser iguais');
            this.createsError(repeatPassword, 'Campos senha e repetir senha precisam ser iguais')
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createsError(password, 'Senha precisa conter entre 6 e 12 caracteres')
        }

        return valid;
    }

    validFields() {
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText;
            
            if(!field.value) {
                this.createsError(field, `Campo "${label}" nao pode estar em branco.`)
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.validateCPF(field)) valid = false;
            }

            if(field.classList.contains('user')) {
                if(!this.validateUser(field)) valid = false;
            }
        }

        return valid;
    }

    validateUser(field) {
        const user = field.value;
        let valid = true;

        if(user.length < 3 || user.length > 12) {
            this.createsError(field, 'Usuario precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }
        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createsError(field, 'Nome de usuario precisa conter apenas letras e/ou numeros.');
            valid = false;
        }
        return valid;
    }

    validateCPF(field) {
        const cpf = new ValidateCPF(field.value);

        if(!cpf.valida()) {
            this.createsError(field, 'CPF Invalido.');
            return false;
        }

        return true;
    }

    createsError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valid = new ValidateForm();
