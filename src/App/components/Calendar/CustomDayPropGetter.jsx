// eslint-disable-next-line
import React from 'react';

const CustomDayPropGetter = (date) => {
  if (date.getDay() === 0 || date.getDay() === 6) {
    return {
      style: {
        backgroundColor: '#f7edef'
      }
    }
  } else return {}
};

export default CustomDayPropGetter;