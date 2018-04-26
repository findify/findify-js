export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export const camelize = s => s.split('-').map(capitalize).join('');
