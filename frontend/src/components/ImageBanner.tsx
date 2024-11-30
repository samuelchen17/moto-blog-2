const ImageBanner = ({ img }: { img: string }) => {
  return (
    <>
      <img
        alt="image banner"
        src={img}
        className="w-full object-cover h-[300px] max-h-[600px] md:h-full filter contrast-125 brightness-75"
      />
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
    </>
  );
};

export default ImageBanner;
