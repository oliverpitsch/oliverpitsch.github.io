import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-amber-100">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-.02em] text-center sm:text-left text-amber-600">
        Pitsch.me will be right back.
        </h1>
          
      </main>
      
    </div>
  );
}
