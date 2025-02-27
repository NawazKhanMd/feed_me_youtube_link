"use client";
import ParentLayout from "@/components/parentLayout";

export default function GifPage() {

  return (
    <ParentLayout backTitle={"Back to player"}>
      <img
            src="/gifs/mrBean.gif"  // Adjust path if you use a sub-folder in the 'public' directory
            alt="Funny GIF"
            className="max-w-full h-[450px] object-contain"  // Adjust size here
          />
    </ParentLayout>
  );
}
