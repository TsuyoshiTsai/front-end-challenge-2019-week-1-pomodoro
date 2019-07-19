import * as Yup from 'yup'
import { SECONDS_OF_MINUTE, MAX_WORK_MINUTES, MAX_BREAK_MINUTES } from '../../constants/Time'

export default Yup.object().shape({
  work: Yup.number()
    .positive(`Must to be positive integer.`)
    .integer(`Must to be positive integer.`)
    .min(2, 'Must more than ${min}.') // eslint-disable-line
    .max(SECONDS_OF_MINUTE * MAX_WORK_MINUTES, 'Must less than ${max}.') // eslint-disable-line
    .required('Please enter work seconds.'),
  break: Yup.number()
    .positive(`Must to be positive integer.`)
    .integer(`Must to be positive integer.`)
    .min(2, 'Must more than ${min}.') // eslint-disable-line
    .max(SECONDS_OF_MINUTE * MAX_BREAK_MINUTES, 'Must less than ${max}.') // eslint-disable-line
    .required('Please enter break seconds.'),
})
