import { notFound } from "next/navigation";
import { getShow } from "../actions";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
              <div className="my-5">{show.band?.bandName}</div>
              <div className="my-5">{show.showLocation}</div>
              <div className="my-5">{show.showTime}</div>
              <div className="my-5">{show.showInfo}Show Info in this div</div>
              <div className="my-5">
                {show.link && show.link.length > 0 ? (
                  show.link.map((link) => (
                    <div key={link.id}>
                      <Button>
                        <Link
                          href={link.shop ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ShoppingBasket />
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No links</p>
                )}
              </div>
            </div>
          ) : (
            <p>band not found</p>
          )}
        </div>
      </div>
    </>
  );
}
