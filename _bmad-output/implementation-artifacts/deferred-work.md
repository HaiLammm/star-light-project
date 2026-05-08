# Deferred Work

## Deferred from: code review of story 1-2 (2026-05-08)

- formatDate uses runtime timezone (not JST) — may produce off-by-one dates on non-JST build servers. Consider explicit JST offset or Intl.DateTimeFormat with timeZone: 'Asia/Tokyo' when timezone-sensitive rendering is needed.
- generateFAQ([]) and generateBreadcrumb([]) produce empty schema arrays. Google requires ≥1 Question for FAQPage and ≥2 items for BreadcrumbList. Callers should guard against empty input or these functions should validate minimum lengths.
