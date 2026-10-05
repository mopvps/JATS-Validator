// JATS XML Parser
window.JatsParser = {
  parse(rawText) {
    const lines = rawText.split(/\r\n|\r|\n/);

    let dom = null;
    let parseError = null;

    // Remove DOCTYPE to avoid external DTD loading
    const cleanedText = rawText.replace(/<!DOCTYPE[^>[]*(\[[^\]]*\])?>/i, '');

    try {
      const domParser = new DOMParser();
      dom = domParser.parseFromString(cleanedText, 'application/xml');
      const errNode = dom.querySelector('parsererror');
      if (errNode) {
        parseError = errNode.textContent;
        // Fallback: try parsing as HTML to get partial DOM
        dom = domParser.parseFromString(cleanedText, 'text/html');
      }
    } catch (e) {
      parseError = e.message;
    }

    function findLine(searchStr, startFrom = 0) {
      for (let i = startFrom; i < lines.length; i++) {
        if (lines[i].includes(searchStr)) return i + 1;
      }
      return null;
    }

    function findAllLines(searchStr) {
      const found = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(searchStr)) found.push(i + 1);
      }
      return found;
    }

    function findLineByRegex(pattern, startFrom = 0) {
      for (let i = startFrom; i < lines.length; i++) {
        if (pattern.test(lines[i])) return i + 1;
      }
      return null;
    }

    function getSnippet(lineNum) {
      const line = lines[lineNum - 1] || '';
      const trimmed = line.trim();
      return trimmed.length > 80 ? trimmed.slice(0, 80) + '...' : trimmed;
    }

    return {
      raw: rawText,
      lines,
      dom,
      parseError,
      findLine,
      findAllLines,
      findLineByRegex,
      getSnippet
    };
  }
};