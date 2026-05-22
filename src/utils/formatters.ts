export function formatPrice(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

export function formatPriceRange(amount: number): string {
  return `${formatPrice(amount)}~`;
}

export function formatDate(date: string | Date): string {
  const resolvedDate = typeof date === 'string' ? new Date(date) : new Date(date);

  if (Number.isNaN(resolvedDate.getTime())) {
    throw new TypeError('Invalid date value');
  }

  return `${resolvedDate.getFullYear()}年${resolvedDate.getMonth() + 1}月${resolvedDate.getDate()}日`;
}

export function formatDateDot(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  if (Number.isNaN(d.getTime())) {
    throw new TypeError('Invalid date value');
  }
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}
