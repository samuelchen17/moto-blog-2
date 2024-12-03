const TableOfContents = ({ toc }: { toc: { id: string; text: string }[] }) => {
  return (
    <aside className="w-1/4 sticky top-16 self-start">
      <nav>
        <ul className="space-y-2">
          {toc.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default TableOfContents;
