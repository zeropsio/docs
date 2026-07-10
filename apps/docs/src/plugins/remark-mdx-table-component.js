/**
 * Rewrites JSX <table> elements in MDX to <Table> so they use the
 * ResponsiveTable MDX component (scroll wrapper). Markdown pipe tables are
 * wrapped separately by rehype-wrap-tables.
 */
function visitMdxJsxTables(node) {
  if (!node?.children?.length) {
    return;
  }

  for (const child of node.children) {
    if (
      (child.type === 'mdxJsxFlowElement' ||
        child.type === 'mdxJsxTextElement') &&
      child.name === 'table'
    ) {
      child.name = 'Table';
    }

    visitMdxJsxTables(child);
  }
}

module.exports = function remarkMdxTableComponent() {
  return (tree) => {
    visitMdxJsxTables(tree);
  };
};
