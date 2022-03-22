import * as Yup from 'yup';

export const displayNameSchema = Yup.object().shape({
  displayname: Yup.string()
    .max(255)
    .required('Display name is required'),
  }
)

export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .max(255)
    .required('Phone number is required'),
  }
)

export const registerScheme = Yup.object().shape({
  sipURL: Yup.string()
    .max(255)
    .required('sipURL is required'),
  sipPassword: Yup.string()
    .max(255)
    .required('sipPassword is required'),
  webSocket: Yup.string()
    .max(255)
    .required('webSocketURL is required'),
  viaTranport:Yup.string()
    .max(255)


  }
)