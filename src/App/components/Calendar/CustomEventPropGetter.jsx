// eslint-disable-next-line
import React from 'react';

import { isAfterToday } from 'utils/checkDays';

const CustomEventPropGetter = (event) => {
  if (event.status === 'Approved') {
    if (!isAfterToday(event.end)) {
      return {
        style: {
          backgroundColor: '#015249',
          opacity: '0.7'
        }
      }
    } else {
      return {
        style: {
          backgroundColor: '#015249'
        }
      }
    }
  } else if (event.status === 'Pending') {
    if (!isAfterToday(event.end)) {
      return {
        style: {
          backgroundColor: '#015249',
          opacity: '0.7'
        }
      }
    } else {
      return {
        style: {
          backgroundColor: '#984B43'
        }
      }
    }
  } else return {}
};

export default CustomEventPropGetter;