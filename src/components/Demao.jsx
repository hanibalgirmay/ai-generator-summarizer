import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const articlesFromLocalstorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalstorage) {
      setAllArticles(articlesFromLocalstorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("__", article.url);
    const { data } = await getSummary({ arricleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updateAllArticle = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updateAllArticle);
      console.log(article);
      localStorage.setItem("articles", JSON.stringify(updateAllArticle));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src="https://s2.svgbox.net/hero-solid.svg?ic=link&color=000"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            required
            className="url_input peer"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <img
              src="https://s2.svgbox.net/octicons.svg?ic=search&color=000"
              className="w-3 h-5"
            />
          </button>
        </form>

        {/* Broswe URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div onClick={() => handleCopy(item.url)} className="copy_btn">
                <img
                  src={
                    copied === item.url
                      ? "https://s2.svgbox.net/octicons.svg?ic=copy&color=000"
                      : "https://s2.svgbox.net/hero-solid.svg?ic=clipboard-copy"
                  }
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src="https://s2.svgbox.net/loaders.svg?ic=circles&color=000"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen... <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p
                  className="font-inter font-medium text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: article.summary }}
                ></p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
