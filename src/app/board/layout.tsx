import Link from "next/link";
import Image from "next/image";

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="max-w-sm mx-auto bg-bg min-h-screen">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-center py-3">3 najnowsze relacje</h2>
          {children}
        </div>
      </main>
      <div className="flex justify-center items-center">
        <Link
          href="/image"
          className="flex flex-col items-center justify-center fixed bottom-0 mb-5 hover:cursor-pointer"
        >
          <Image src={"/action-button.png"} height={70} width={70} alt="" />
        </Link>
      </div>
    </>
  );
}
