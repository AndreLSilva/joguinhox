"use client";

import { Button } from "@/common/design-system/atoms/Button/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center gap-14 p-12">
      <h1 className="text-title-large text-blue-500">Joguinhox</h1>

      <div className="w-full max-w-96 space-y-8">
        <Button className="w-full" onClick={() => router.push("/stop-gourmet")}>
          Stop Gourmet
        </Button>
      </div>
    </main>
  );
}
