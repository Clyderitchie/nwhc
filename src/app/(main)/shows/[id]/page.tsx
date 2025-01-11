import { getShow } from "../actions";




interface PageProps {
    params: { id: string };
}

export default async function ShowPage({ params: { id } }: PageProps) {
    const show = await getShow(id)
}