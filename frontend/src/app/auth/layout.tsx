import RedirectBeforeAuth from "@/shared/hoc/RedirectBeforeAuth";

export default function NannyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  
  return (
    <>
      <RedirectBeforeAuth>
        {children}
      </RedirectBeforeAuth>
    </>
  );
}
