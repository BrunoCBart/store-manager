const errors = {
  nameNotValid: { error: { message: '"name" is required' }, status: 400 },
  nameLength: 
  { error: { message: '"name" length must be at least 5 characters long' }, status: 422 },
  quantityNotValid: { error: { message: '"quantity" is required' }, status: 400 },
  quantitySmallerThanOne: 
  { error: { message: '"quantity" must be greater than or equal to 1' }, status: 422 },

};

const isNameValid = (name) => !name || typeof name !== 'string';

const isNameLengthValid = (name, length) => name.length < length;

const isQuantityValid = (quantity) => typeof quantity !== 'number';

const isQuantityHigherThanZero = (quantity, length) => quantity < length;

const validateBody = (name, quantity) => {
  switch (true) {
    case isNameValid(name): return errors.nameNotValid;
    case isNameLengthValid(name, 5): return errors.nameLength;
    case isQuantityValid(quantity): return errors.quantityNotValid;
    case isQuantityHigherThanZero(quantity, 1): return errors.quantitySmallerThanOne;
    default: return {};
  }
};

module.exports = { validateBody };