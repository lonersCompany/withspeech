import React from "react";
const LandingPage = () => {
  return (
    <>
      <article
        id="content"
        data-key="{{page.key}}"
        className="max-w-4xl m-auto text-xl leading-snug px-2"
      >
        <p className=" text-3xl md:text-5xl font-light pt-16 mb-16">
          Turn article into video with AI speech{" "}
          {/* <span role="img" aria-label="" description="wave hand">
            🌀
          </span> */}
        </p>

        <div className="mb-16">
          <img
            src="https://res.cloudinary.com/dhxmg9p4i/image/upload/v1600686635/blog/wavepage-diagram.jpg"
            alt="wavepage turn artcile into video"
          />
        </div>

        <p className="text-2xl md:text-3xl  font-light mb-16">
          Type or copy your article, add the images and wavepage will make the
          presentation with AI speech - simply.
        </p>

        <p className="text-center mb-16">
          <a
            href="https://wavepage.netlify.app/doc/44da8dcd-c664-4662-9757-8e7019576404"
            className="text-4xl rounded-lg py-3 px-6 text-wite bg-green-500 hover:bg-green-400"
          >
            Try WavePage
            {/* <span role="img" aria-label="" description="wave hand">
              👀
            </span> */}
          </a>
        </p>
        <div className="mb-16">
          <iframe
            className="m-auto"
            title="app tutotrial"
            width="560"
            height="340"
            src="https://www.youtube.com/embed/hoiGSABYwBo"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </article>
    </>
  );
};

export default LandingPage;
