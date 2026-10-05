// JATS XML Rule functions
window.RULES = {};

window.RULES['xml-stylesheet'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    if (line.includes('<?xml-stylesheet')) {
      issues.push({
        ruleId: 'xml-stylesheet',
        line: i + 1,
        col: 1,
        length: line.trim().length,
        message: 'xml-stylesheet declaration found — should be removed',
        detail: parsed.getSnippet(i + 1)
      });
    }
  });
  return issues;
};

window.RULES['institution-content-type'] = function(parsed) {
  const issues = [];
  if (!parsed.dom) return issues;

  const ALLOWED = ['university', 'laboratory', 'dept', 'office'];
  const institutions = parsed.dom.querySelectorAll('institution');

  institutions.forEach(el => {
    const value = el.getAttribute('content-type');
    if (!value) return;
    if (ALLOWED.includes(value)) return;

    const lineNum = parsed.findLine('content-type="' + value + '"');
    issues.push({
      ruleId: 'institution-content-type',
      line: lineNum,
      col: 1,
      length: 1,
      message: `Invalid institution content-type "${value}" — allowed values: university, laboratory, dept, office`,
      detail: parsed.getSnippet(lineNum)
    });
  });

  return issues;
};

window.RULES['chapter-title-tag'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    if (line.includes('<chapter-title>')) {
      const lineNum = i + 1;
      issues.push({
        ruleId: 'chapter-title-tag',
        line: lineNum,
        col: 1,
        length: 1,
        message: '<chapter-title> tag is not allowed — use <article-title> instead',
        detail: parsed.getSnippet(lineNum)
      });
    }
  });
  return issues;
};

window.RULES['subj-group-type'] = function(parsed) {
  const issues = [];
  if (!parsed.dom) return issues;

  const groups = parsed.dom.querySelectorAll('subj-group');
  groups.forEach(el => {
    if (!el.hasAttribute('subj-group-type')) return;

    // Find the actual line in raw text
    const attrValue = el.getAttribute('subj-group-type');
    const lineNum = parsed.findLine('subj-group-type="' + attrValue + '"');
    if (!lineNum) return;

    issues.push({
      ruleId: 'subj-group-type',
      line: lineNum,
      col: 1,
      length: 1,
      message: 'subj-group-type attribute is not allowed — remove it from <subj-group>',
      detail: parsed.getSnippet(lineNum)
    });
  });

  return issues;
};

window.RULES['ref-list-id'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    if (/<ref-list\s+id=/i.test(line)) {
      issues.push({
        ruleId: 'ref-list-id',
        line: i + 1,
        col: 1,
        length: 1,
        message: '<ref-list> should not have an id attribute — remove it',
        detail: parsed.getSnippet(i + 1)
      });
    }
  });
  return issues;
};

window.RULES['counts-missing'] = function(parsed) {
  const issues = [];
  if (!parsed.dom) return issues;

  const articleMeta = parsed.dom.querySelector('article-meta');
  if (!articleMeta) return issues;

  const counts = articleMeta.querySelector('counts');
  if (counts) return issues;

  const lineNum = parsed.findLine('<article-meta>') || 1;
  issues.push({
    ruleId: 'counts-missing',
    line: lineNum,
    col: 1,
    length: 1,
    message: '<counts> tag is missing inside <article-meta>',
    detail: parsed.getSnippet(lineNum)
  });

  return issues;
};

window.RULES['list-type-none'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    if (line.includes('list-type="none"')) {
      const lineNum = i + 1;
      issues.push({
        ruleId: 'list-type-none',
        line: lineNum,
        col: 1,
        length: 1,
        message: '<list list-type="none"> is not allowed — use list-type="simple" instead',
        detail: parsed.getSnippet(lineNum)
      });
    }
  });
  return issues;
};

window.RULES['corresp-missing'] = function(parsed) {
  
  const issues = [];
  
  const hasCorresp = parsed.lines.some(line => line.includes('corresp="yes"'));
  if (hasCorresp) return issues;

  const contribLine = parsed.findLine('<contrib ');
  if (!contribLine) return issues;

  issues.push({
    ruleId: 'corresp-missing',
    line: contribLine,
    col: 1,
    length: 1,
    message: 'No corresponding author found — add corresp="yes" to the appropriate <contrib> element',
    detail: parsed.getSnippet(contribLine)
  });

  return issues;
};

window.RULES['fpage-entity'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    if (/<fpage>[^<]*&#x2013;[^<]*<\/fpage>/i.test(line)) {
      const lineNum = i + 1;
      issues.push({
        ruleId: 'fpage-entity',
        line: lineNum,
        col: 1,
        length: 1,
        message: '&#x2013; entity found inside <fpage> — split into <fpage> and <lpage> instead',
        detail: parsed.getSnippet(lineNum)
      });
    }
  });
  return issues;
};

window.RULES['kwd-trailing-comma'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    if (/<kwd>[^<]*,\s*<\/kwd>/i.test(line)) {
      const lineNum = i + 1;
      issues.push({
        ruleId: 'kwd-trailing-comma',
        line: lineNum,
        col: 1,
        length: 1,
        message: '<kwd> contains a trailing comma — remove the comma from inside the tag',
        detail: parsed.getSnippet(lineNum)
      });
    }
  });
  return issues;
};

window.RULES['month-invalid'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    const match = line.match(/<month>([^<]*)<\/month>/i);
    if (!match) return;
    const value = match[1];
    const num = Number(value);
    const isValidNumeric = /^\d{1,2}$/.test(value) && num >= 1 && num <= 12;
    if (isValidNumeric) return;

    const lineNum = i + 1;
    issues.push({
      ruleId: 'month-invalid',
      line: lineNum,
      col: 1,
      length: 1,
      message: `Invalid <month> value "${value}" — use numeric digits only (01-12)`,
      detail: parsed.getSnippet(lineNum)
    });
  });
  return issues;
};

window.RULES['id-alpha-suffix'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    const match = line.match(/id="([^"]*_\d+[a-z])"/i);
    if (!match) return;

    const lineNum = i + 1;
    issues.push({
      ruleId: 'id-alpha-suffix',
      line: lineNum,
      col: 1,
      length: 1,
      message: `ID "${match[1]}" has an alphabetic suffix — use sequential numeric IDs only`,
      detail: parsed.getSnippet(lineNum)
    });
  });
  return issues;
};

window.RULES['aff-label-tag'] = function(parsed) {
  const issues = [];
  let insideAff = false;

  parsed.lines.forEach((line, i) => {
    if (/<aff[\s>]/i.test(line)) insideAff = true;

    if (insideAff && /<label>/i.test(line)) {
      const lineNum = i + 1;
      issues.push({
        ruleId: 'aff-label-tag',
        line: lineNum,
        col: 1,
        length: 1,
        message: '<label> tag is not allowed inside <aff> — remove it',
        detail: parsed.getSnippet(lineNum)
      });
    }

    if (/<\/aff>/i.test(line)) insideAff = false;
  });

  return issues;
};

window.RULES['city-missing'] = function(parsed) {
  const issues = [];
  let insideAff = false;
  let affStartLine = null;
  let hasCity = false;

  parsed.lines.forEach((line, i) => {
    if (/<aff[\s>]/i.test(line)) {
      insideAff = true;
      affStartLine = i + 1;
      hasCity = false;
    }

    if (insideAff && /<city>/i.test(line)) hasCity = true;

    if (/<\/aff>/i.test(line)) {
      if (insideAff && !hasCity && affStartLine) {
        issues.push({
          ruleId: 'city-missing',
          line: affStartLine,
          col: 1,
          length: 1,
          message: '<city> tag is missing inside <aff> — add city information',
          detail: parsed.getSnippet(affStartLine)
        });
      }
      insideAff = false;
    }
  });

  return issues;
};

window.RULES['pub-format-missing'] = function(parsed) {
  const issues = [];
  parsed.lines.forEach((line, i) => {
    const match = line.match(/<element-citation[^>]*publication-type="(book|journal)"/i);
    if (!match) return;
    if (/publication-format=/i.test(line)) return;

    const lineNum = i + 1;
    issues.push({
      ruleId: 'pub-format-missing',
      line: lineNum,
      col: 1,
      length: 1,
      message: `<element-citation publication-type="${match[1]}"> is missing publication-format="print"`,
      detail: parsed.getSnippet(lineNum)
    });
  });
  return issues;
};

window.runRule = function(ruleId, parsed, enabled) {
  const config = window.RULES_CONFIG.find(r => r.id === ruleId);
  if (!config || !enabled) return [];
  const fn = window.RULES[ruleId];
  if (!fn) return [];
  return fn(parsed).map(r => ({
    ...r,
    severity: r.severity || config.severity,
    ruleName: config.name
  }));
};