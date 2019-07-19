import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string()
    .max(50, "Can't enter over than ${max} characters") // eslint-disable-line
    .trim()
    .required('Please enter task title.'),
  estimateClocks: Yup.number().max(10, "Can't over than ${max} tomatos."), // eslint-disable-line
})
