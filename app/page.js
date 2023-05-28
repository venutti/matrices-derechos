import Matrix from "@/components/Matrix";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl text-center">
        Composición max-min para matrices de 8x8
      </h1>
      <Matrix className="mt-4 mx-auto" />
    </main>
  );
}
