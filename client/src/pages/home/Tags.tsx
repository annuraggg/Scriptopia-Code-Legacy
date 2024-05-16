const Tags = ({
  tags,
}: {
  tags: {
    [key: string]: number;
  };
}) => {
  return (
    <div className="bg-card mt-5 p-5 rounded-xl  w-[25vw] border animate__animated animate__fadeIn">
      <h2>Tags</h2>
      <div className="flex flex-wrap items-center gap-2 mt-5">
        {Object.keys(tags).map((tag) => (
          <div className="border px-3 py-2 text-xs rounded-full" key={tag}>
            {tag} - {tags[tag]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
