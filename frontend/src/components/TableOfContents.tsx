const TableOfContents = ({ toc }: { toc: { id: string; text: string }[] }) => {
  return (
    <nav className="table-of-contents">
      <ul>
        {toc.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
