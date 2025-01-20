// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   //   useSidebar,
// } from "@/components/ui/sidebar";

// import { useAppSelector } from "@/redux/hooks";
// import { RootState } from "@/redux/store";

// export default function DashNavUser({}) {
//   const { currentUser } = useAppSelector(
//     (state: RootState) => state.persisted.user
//   );

//   //   const { isMobile } = useSidebar();

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <SidebarMenuButton
//           size="lg"
//           //   className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//         >
//           <Avatar className="h-8 w-8 rounded-lg">
//             <AvatarImage
//               src={currentUser?.user.profilePicture}
//               alt={currentUser?.user.username}
//             />
//             <AvatarFallback className="rounded-lg">
//               {currentUser?.user.username}
//             </AvatarFallback>
//           </Avatar>
//           <div className="grid flex-1 text-left text-sm leading-tight">
//             <span className="truncate font-semibold">
//               {currentUser?.user.username}
//             </span>
//             <span className="truncate text-xs">{currentUser?.user.email}</span>
//           </div>
//         </SidebarMenuButton>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }
