import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string()
    .max(100, `Can't enter over than 100 characters`)
    .trim()
    .required('Please enter task title.'),
  estimateClocks: Yup.number().max(10, `Can't over than 10 tomatos.`),
})
