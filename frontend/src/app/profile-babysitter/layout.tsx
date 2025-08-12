import RedirectAuthBabysitter from "@/shared/hoc/RedirectBabysitter";

export default function NannyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <RedirectAuthBabysitter>
            <>
                {children}
            </>
        </RedirectAuthBabysitter>
    </>
  );
}
