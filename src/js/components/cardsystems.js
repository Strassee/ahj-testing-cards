import { systems } from "./systems";

export function isCardSystem(value) {
  const foundsystems = systems.filter(item => 
    String(item.id).length >= value.length ? String(item.id).slice(0, value.length) === value : value.slice(0, String(item.id).length) === String(item.id)
  );
    return foundsystems.length !== 0 ? foundsystems : false;
}