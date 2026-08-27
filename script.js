export function calculateAmount(source, count) {
  const match = source.match(/^\s*(\d+(?:[.,]\d+)?)\s*dl\s*$/i);
  if (!match) return null;

  const amount = Number(match[1].replace(',', '.')) * count;
  return `${Number(amount.toFixed(10)).toString().replace('.', ',')} dl`;
}

export function updateColumn(select) {
  const selects = [...document.querySelectorAll('.mop-count')];
  const methodIndex = selects.indexOf(select);
  const count = Number(select.value);

  document.querySelectorAll('tbody tr').forEach((row) => {
    const target = row.querySelectorAll('[data-calculated]')[methodIndex];
    const source = target?.previousElementSibling;
    if (!target || !source) return;

    const result = calculateAmount(source.textContent, count);
    if (result !== null) target.textContent = result;
  });
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('.mop-count').forEach((select) => {
    for (let count = 1; count <= 10; count += 1) {
      select.add(new Option(count, count, count === 10, count === 10));
    }
    select.addEventListener('change', () => updateColumn(select));
    updateColumn(select);
  });
}
