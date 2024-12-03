import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TableOfContents = ({ toc }: { toc: { id: string; text: string }[] }) => {
  return (
    <aside className="min-w-[300px] h-auto overflow-y-auto sticky top-16 self-start">
      <nav>
        <Card>
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a className="hover:font-bold" href={`#${heading.id}`}>
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
