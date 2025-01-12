const HeadingTwoWrapper = ({ children }: { children: string }) => {
  return (
    <h2 className="font-bold text-2xl lg:text-4xl lg:mt-24 mt-16 py-4 lg:py-8">
      {children}
    </h2>
  );
};

export default HeadingTwoWrapper;
