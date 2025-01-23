const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-6 dark:border-border md:px-8 md:py-0">
      <div className="px-4 max-w-screen-xl mx-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/samuelchen17/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Samuel Chen
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/samuelchen17/moto-blog-2"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
