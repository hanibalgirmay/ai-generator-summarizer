import logo from "../assets/sample-logo.png";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/hanibalgirmay/ai-generator-summarizer")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Article with AI
        <br className="max-md:hidden" />
        <span className="orange_gradient"> OpenAI GTP-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with summize, an open-source article summaryzer that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
