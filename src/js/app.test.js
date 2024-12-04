import { isValidCard } from './components/validator';
import { isCardSystem } from './components/cardsystems';

test.each([
  ['2201382000000039', [{id: 22, type: 'mir', digits: [16, 19]}], true],
  ['4916107242367353', [{id: 4, type: 'visa', digits: [16, 16]}], false],
  ['553690229280618', [{id: 5, type: 'master', digits: [16, 16]}], false],
  ['3543264456106731244', [{id: 35, type: 'jcb', digits: [16, 19]}], true],
])('.add(%i)', (value, system, expected) => {
  expect(isValidCard(value, system)).toBe(expected);
});

test.each([
  ['2201382000000039', [{id: 22, type: 'mir', digits: [16, 19]}]],
  ['4916107242367553', [{id: 4, type: 'visa', digits: [16, 16]}]],
  ['5536902292830618', [{id: 5, type: 'master', digits: [16, 16]}]],
  ['3543264456106731244', [{id: 35, type: 'jcb', digits: [16, 19]}]],
  ['3643264456106731244', false],
])('.add card number %i expect %o', (value, expected) => {
  expect(isCardSystem(value)).toEqual(expected);
});
