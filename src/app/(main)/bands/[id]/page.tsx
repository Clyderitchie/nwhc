import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { bandDataSelect } from "@/lib/types";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { id: string };
}

const getBand = cache(async (id: string) => {
  const band = await prisma.band.findFirst({
    where: {
      id: id,
    },
    select: bandDataSelect,
  });

  if (!band) notFound();
  return band;
});

export default async function BandPage({ params: { id } }: PageProps) {
  const { user } = await validateRequest();

  const band = await getBand(id);
  console.log("Band from Id and bandPage function: ", band);

  return (
    <>
      <div>{band ? <div>{band.bandName}</div> : <p>band not found</p>}</div>
    </>
  );
}
