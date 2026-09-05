export interface AuthorConfig { name: string; kana: string; bioShort: string; bioLong: string; avatarPath: string; sameAs: readonly string[]; }
export const AUTHOR_CONFIG: AuthorConfig = Object.freeze({
  name: '編集部', kana: 'ヘンシュウブ', bioShort: '競馬をわかりやすく伝えるウマノミカタ編集部。',
  bioLong: '競馬を初めて学ぶ方にも、楽しみを深めたい方にも役立つ情報を、丁寧に編集してお届けします。',
  avatarPath: '/images/author-placeholder.svg', sameAs: Object.freeze([]),
});
