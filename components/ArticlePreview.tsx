export const ArticlePreview = () => (
  <div className="flex flex-col md:flex-row md:items-center">
    <div className="mb-14 md:mb-0 md:mr-10 lg:mr-20 lg:max-w-[600px] 2xl:max-w-[700px]">
      <h2 className="text-3xl lg:text-4xl xl:text-5xl text-amber-900 mb-4">
        Why should you <br /> have a cat?
      </h2>
      <div className="w-12 h-[4px] bg-amber-900 mb-10"></div>
      <p className="lg:text-lg xl:text-xl">
        Having a cat around you can actually trigger the release of calming chemicals in your body
        which lower your stress and anxiety levels.
        <br />
        <br />
        Owning a cat can bring unconditional love and companionship to your life. Having a feline
        friend can also help to relieve stress and improve your heart health. Owning a cat can be an
        extremely rewarding relationship.
      </p>
    </div>
    <div className="columns-2 gap-4">
      <img src="/images/image-2.png" className="w-full mb-4" alt="Cat" />
      <img src="/images/image-3.png" className="w-[70%] float-right" alt="Cat" />
      <img src="/images/image-1.png" className="w-full float-right" alt="Cat" />
    </div>
  </div>
);
