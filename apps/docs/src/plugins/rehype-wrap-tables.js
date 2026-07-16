/**
 * Wraps every <table> in a horizontal scroll container at build time.
 * Covers JSX tables in MDX (which bypass MDXComponents.table).
 */
function normalizeClassName(className) {
  if (!className) {
    return [];
  }
  if (Array.isArray(className)) {
    return className.flatMap((value) => String(value).split(/\s+/));
  }
  return String(className).split(/\s+/);
}

function isWrappedTableParent(parent) {
  if (!parent || parent.type !== 'element' || parent.tagName !== 'div') {
    return false;
  }

  const classes = normalizeClassName(parent.properties?.className);
  return (
    classes.includes('table-scroll-wrapper') ||
    classes.some((name) => name.includes('tableContainer'))
  );
}

function wrapTables(node) {
  if (!node?.children?.length) {
    return;
  }

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];
    wrapTables(child);

    if (child?.type !== 'element' || child.tagName !== 'table') {
      continue;
    }

    if (isWrappedTableParent(node)) {
      continue;
    }

    node.children[index] = {
      type: 'element',
      tagName: 'div',
      properties: {
        className: ['table-scroll-wrapper'],
      },
      children: [child],
    };
  }
}

module.exports = function rehypeWrapTables() {
  return (tree) => {
    wrapTables(tree);
  };
};
