import RedirectAuthParent from "@/shared/hoc/RedirectAuthParent";


export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <RedirectAuthParent>
            <>
                {children}
            </>
        </RedirectAuthParent>
    </>
  );
}
