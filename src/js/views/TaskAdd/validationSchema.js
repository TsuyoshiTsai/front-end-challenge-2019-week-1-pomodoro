import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string()
    .max(10, `Can't enter over than 10 characters`)
    .trim()
    .required('Please enter task title.'),
  estimate: Yup.string(),
})
