import _ from 'lodash';

/**
 * Helper function to clean strings
 * @param {string} string string to be converted
 * @returns {string} cleaned string
 */
export const clean = (string) => {
  let cleaned = _.escapeRegExp(_.escape(_.startCase(string)));
  return cleaned;
}