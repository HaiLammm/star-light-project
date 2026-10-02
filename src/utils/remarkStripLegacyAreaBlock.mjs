// Từ 07/2026 biên tập viên dán tay một khối 【Setsubi-proについて】 (受付・対応エリア・TEL)
// vào cuối thân bài trên cockpit. Khối đó chỉ liệt kê 関東 — bỏ sót toàn bộ 関西 — và nay
// ArticleAreaBox đã render khối đúng từ REGIONAL_OFFICES cho mọi bài. Plugin này gỡ khối
// cũ lúc build để bài không nói hai điều khác nhau, trong khi cockpit dọn dần dữ liệu gốc.
//
// Chỉ gỡ khi khớp ĐỦ dấu hiệu, để không bao giờ cắt nhầm nội dung bài:
// đoạn `---` cuối cùng, ngay sau là 【Setsubi-pro…について】, phần còn lại ngắn và chứa
// đủ 受付／対応エリア／TEL cùng link tới /contact/.

const MAX_TAIL_NODES = 12;

function textOf(node) {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function hasContactLink(node) {
  if (node.type === 'link' && typeof node.url === 'string' && /\/contact\/?$/.test(node.url)) return true;
  return (node.children ?? []).some(hasContactLink);
}

export function isLegacyAreaTail(nodes) {
  const meaningful = nodes.filter((n) => textOf(n).replace(/[\s ]/g, '') !== '' || hasContactLink(n));
  if (meaningful.length === 0 || nodes.length > MAX_TAIL_NODES) return false;
  if (!/^【Setsubi-?pro.*について】$/i.test(textOf(meaningful[0]).trim())) return false;
  const text = nodes.map(textOf).join('\n');
  return ['受付', '対応エリア', 'TEL'].every((label) => text.includes(label)) && nodes.some(hasContactLink);
}

export function remarkStripLegacyAreaBlock() {
  return (tree) => {
    const children = tree.children ?? [];
    let breakIndex = -1;
    for (let i = children.length - 1; i >= 0; i--) {
      if (children[i].type === 'thematicBreak') {
        breakIndex = i;
        break;
      }
    }
    if (breakIndex < 0) return;
    if (isLegacyAreaTail(children.slice(breakIndex + 1))) {
      tree.children = children.slice(0, breakIndex);
    }
  };
}
