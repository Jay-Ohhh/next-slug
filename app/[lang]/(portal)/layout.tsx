import Nav from "@/ui/home/Nav";
import Background from "@/components/Background";
import { getDictionary } from "@/lib/dictionaries";

export default async function Layout(props: {
  params: PageParams;
  modal?: any;
  children?: React.ReactNode;
}) {
  const dict = await getDictionary(props.params.lang as any);

  return (
    <div>
      {props.modal}
      <div className="flex min-h-screen flex-col">
        <Nav locale={props.params.lang} dict={dict} />
        {props.children}
        <Background />
      </div>
    </div>
  );
}