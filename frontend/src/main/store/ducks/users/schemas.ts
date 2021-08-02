import * as yup from 'yup';

const schemaNew = yup.object().shape({
  name: yup.string().required('Preencha o campo nome'),
  email: yup.string().email().required('Preencha o campo com um e-mail válido'),

});

const schemaLogin = yup.object().shape({

  email: yup.string().email().required('Preencha o campo com um e-mail válido'),
	senha: yup.string().required('Informa uma senha'),

});


export default {
	schemaNew,
	schemaLogin
}
