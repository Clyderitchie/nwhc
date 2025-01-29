"use client";


import ShowList from "@/components/show/ShowList";


export default function Shows() {
   
  return (
    <>
      <div className="flex max-h-screen min-h-screen min-w-full items-start justify-center" style={{ maxWidth: '87%', minWidth: '87%' }}>
        <ShowList />
      </div>
    </>
  );
}
