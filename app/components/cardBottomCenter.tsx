export default function CardBottomCenter({
  discritpion,
}: {
  discritpion: string;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 m-2 my-16 flex flex-row items-center justify-center rounded-xl bg-black bg-opacity-30 p-2 shadow-md lg:my-2">
      <span className="text-xl font-bold text-white">{discritpion}</span>
    </div>
  );
}
