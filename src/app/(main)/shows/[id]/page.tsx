import { notFound } from "next/navigation";
import { getShow } from "../actions";
import Image from "next/image";

interface PageProps {
  params: { id: string };
}

export default async function ShowPage({ params: { id } }: PageProps) {
  const show = await getShow(id);
  if (!show) {
    notFound();
  }

  console.log("Show from id and showPage function: ", show);

  return (
    <>
      <div className="flex min-h-screen w-full">
        <div className="min-w-full">
          {show ? (
            <div className="min-h-screen flex-col">
              <div>
                <h1 className="mb-5 text-3xl font-bold underline">
                  {show.showName}
                </h1>
                <div className="rounded-sm">
                  <Image
                    className="rounded-lg"
                    src={show.flyerLink}
                    alt={show.showName}
                    width={250}
                    height={200}
                    style={{
                      objectFit: "cover",
                      width: "250px",
                      height: "200px",
                    }}
                  />
                </div>
              </div>
              <div className="my-5">{show.showInfo}Show Info in this div</div>
            </div>
          ) : (
            <p>band not found</p>
          )}
        </div>
      </div>
    </>
  );
}
