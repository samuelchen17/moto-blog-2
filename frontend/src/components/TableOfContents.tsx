import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TableOfContents = ({ toc }: { toc: { id: string; text: string }[] }) => {
  return (
    <>
      <aside className="hidden lg:block min-w-[350px] max-w-[350px] max-h-[400px] overflow-y-auto sticky top-16 self-start border rounded-md mr-8">
        <nav className="">
          <Card className="border-none">
            <CardHeader className="sticky top-0 z-10 border-b bg-white dark:bg-background">
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

      {/* lg and below */}
      <Accordion
        type="single"
        collapsible
        className="lg:hidden border rounded-md px-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Table of Contents</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-6 pt-4 border-t">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
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
