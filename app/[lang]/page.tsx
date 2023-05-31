import Background from "@/components/Background";
import { getDictionary } from "@/lib/dictionaries";

export default async function Home({ params }: {
  params: PageParams;
}) {
  const dict = await getDictionary(params.lang as any);
  return (
    <>
      <div>
        {dict.index.title}
      </div>
      <Background />
    </>
  );
}