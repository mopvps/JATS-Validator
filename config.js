// JATS XML Rule config
window.RULES_CONFIG = [
  {
    id: 'xml-stylesheet',
    name: 'XML Stylesheet Declaration',
    description: 'Flags <?xml-stylesheet?> processing instruction — should be removed from JATS XML files.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'institution-content-type',
    name: 'Institution Content-Type',
    description: 'Flags <institution> tags with invalid content-type values. Allowed: university, laboratory, dept, office.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'chapter-title-tag',
    name: 'Chapter Title Tag',
    description: 'Flags <chapter-title> tag — not allowed in JATS XML. Use <article-title> instead.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'subj-group-type',
    name: 'Subject Group Type Attribute',
    description: 'Flags <subj-group> elements that have a subj-group-type attribute — it should be removed.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'ref-list-id',
    name: 'Ref-List ID Check',
    description: 'Flags <ref-list> elements that have an id attribute — it should be removed.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'counts-missing',
    name: 'Counts Tag Missing',
    description: 'Flags when <counts> tag is missing inside <article-meta>.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'list-type-none',
    name: 'List Type None',
    description: 'Flags <list list-type="none"> — not allowed in JATS XML. Use list-type="simple" instead.',
    enabled: true,
    severity: 'error',
    category: 'Structure'
  },
  {
    id: 'corresp-missing',
    name: 'Corresponding Author Missing',
    description: 'Flags when no <contrib> element has corresp="yes" — one author must be marked as corresponding.',
    enabled: true,
    severity: 'error',
    category: 'Affiliations'
  },
  {
    id: 'fpage-entity',
    name: 'FPage Entity Check',
    description: 'Flags &#x2013; entity found inside <fpage> tag — should be split into <fpage> and <lpage>.',
    enabled: true,
    severity: 'error',
    category: 'References'
  },
  {
    id: 'kwd-trailing-comma',
    name: 'Keyword Trailing Comma',
    description: 'Flags <kwd> elements that contain a trailing comma — commas should not appear inside <kwd> tags.',
    enabled: true,
    severity: 'error',
    category: 'Keywords'
  },
  {
    id: 'month-invalid',
    name: 'Invalid Month Value',
    description: 'Flags <month> tags with non-numeric values — only digits 01-12 are allowed.',
    enabled: true,
    severity: 'error',
    category: 'References'
  },
  {
    id: 'id-alpha-suffix',
    name: 'ID Alphabetic Suffix',
    description: 'Flags id attributes ending with an alphabetic suffix after numbers (e.g. _ref_056a) — use sequential numeric IDs only.',
    enabled: true,
    severity: 'error',
    category: 'References'
  },
  {
    id: 'aff-label-tag',
    name: 'Label Tag in Affiliation',
    description: 'Flags <label> tag found inside <aff> element — not allowed in JATS XML.',
    enabled: true,
    severity: 'error',
    category: 'Affiliations'
  },
  {
    id: 'city-missing',
    name: 'City Tag Missing in Affiliation',
    description: 'Flags <aff> elements that do not contain a <city> tag.',
    enabled: true,
    severity: 'error',
    category: 'Affiliations'
  },
  {
    id: 'pub-format-missing',
    name: 'Publication Format Missing',
    description: 'Flags <element-citation> with publication-type="book" or "journal" that is missing publication-format="print".',
    enabled: true,
    severity: 'error',
    category: 'References'
  }
];