export function formatPriceNumber(amount: number): string {
  return amount.toLocaleString('ja-JP');
}

export function formatPrice(amount: number): string {
  return `¥${formatPriceNumber(amount)}`;
}

export function formatPriceRange(amount: number): string {
  return `${formatPrice(amount)}~`;
}

export function formatDate(date: string | Date): string {
  const resolvedDate = typeof date === 'string' ? new Date(date) : new Date(date);

  if (Number.isNaN(resolvedDate.getTime())) {
    throw new TypeError('Invalid date value');
  }

  const parts = new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(resolvedDate);
  const get = (type: string): string => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}年${get('month')}月${get('day')}日`;
}

export function formatDateDot(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  if (Number.isNaN(d.getTime())) {
    throw new TypeError('Invalid date value');
  }
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(d);
  const get = (type: string): string => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}.${get('month')}.${get('day')}`;
}
