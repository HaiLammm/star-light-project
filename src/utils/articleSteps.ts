/**
 * Trích các cụm bước "**手順N：…**" trong markdown bài viết để phát HowTo JSON-LD.
 *
 * Chỉ nhận cụm có ≥2 bước dưới cùng một heading, và chỉ lấy đúng chữ đang hiển
 * thị (tên bước + gạch đầu dòng ngay sau nó). Structured data phải khớp nội dung
 * trên trang — không suy diễn "bước" từ văn xuôi.
 */
export interface ArticleStep {
  name: string;
  text: string;
}

export interface ArticleStepGroup {
  heading: string | null;
  steps: ArticleStep[];
}

const HEADING_RE = /^#{2,6}\s+(.+?)\s*$/;
const STEP_RE = /^\*\*(?:手順|ステップ|STEP)\s*[0-9０-９]+\s*[：:]\s*(.+?)\*\*\s*$/;
const LIST_ITEM_RE = /^\s*(?:[-*+]|\d+\.)\s+(.+)$/;

const toPlainText = (markdown: string) =>
  markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .trim();

export function extractStepGroups(markdown: string): ArticleStepGroup[] {
  const groups: ArticleStepGroup[] = [];
  let heading: string | null = null;
  let group: ArticleStepGroup | null = null;
  let step: { name: string; lines: string[] } | null = null;

  const closeStep = () => {
    if (step && group) group.steps.push({ name: step.name, text: step.lines.join('\n') || step.name });
    step = null;
  };
  const closeGroup = () => {
    closeStep();
    if (group && group.steps.length >= 2) groups.push(group);
    group = null;
  };

  for (const line of markdown.split('\n')) {
    const headingMatch = line.match(HEADING_RE);
    if (headingMatch) {
      closeGroup();
      heading = toPlainText(headingMatch[1]);
      continue;
    }

    const stepMatch = line.match(STEP_RE);
    if (stepMatch) {
      closeStep();
      group ??= { heading, steps: [] };
      step = { name: toPlainText(stepMatch[1]), lines: [] };
      continue;
    }

    if (!step || line.trim() === '') continue;
    const item = line.match(LIST_ITEM_RE);
    if (item) {
      step.lines.push(toPlainText(item[1]));
      continue;
    }
    // Đoạn văn thường sau danh sách: kết thúc bước, cụm vẫn mở tới heading kế tiếp.
    closeStep();
  }
  closeGroup();

  return groups;
}
