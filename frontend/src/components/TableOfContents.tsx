import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TableOfContents = ({ toc }: { toc: { id: string; text: string }[] }) => {
  return (
    <aside className="min-w-[350px] max-w-[350px] max-h-[400px] overflow-y-auto sticky top-16 self-start border rounded-md mr-14">
      <nav className="">
        <Card className="border-none">
          <CardHeader className="sticky top-0 bg-white z-10 border-b">
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <ul className="space-y-6">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a
                    className="hover:font-bold"
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(heading.id);
                      if (target) {
                        const offset = 96;
                        const top =
                          target.getBoundingClientRect().top +
                          window.scrollY -
                          offset;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </nav>
    </aside>
  );
};

export default TableOfContents;

// const TableOfContents = ({ toc }: { toc: { id: string; text: string }[] }) => {
//     return (
//       <aside className="min-w-[300px] h-auto overflow-y-auto sticky top-16 self-start outline">
//         <nav>
//           <ul className="space-y-2">
//             {toc.map((heading) => (
//               <li key={heading.id}>
//                 <a href={`#${heading.id}`}>{heading.text}</a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>
//     );
//   };
