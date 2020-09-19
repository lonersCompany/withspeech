import React from "react";
const LandingPage = () => {
  return (
    <>
      <article
        id="content"
        data-key="{{page.key}}"
        className="max-w-3xl m-auto text-xl leading-snug px-2"
      >
        <p className="text-5xl font-light pt-16 mb-16">
          Create tutorial form article{" "}
          <span role="img" aria-label="" description="wave hand">
            🧙‍♀️
          </span>
        </p>

        <div className="mb-16">
          <img
            src="https://res.cloudinary.com/dhxmg9p4i/image/upload/v1598195565/blog/atom.jpg"
            alt=""
          />
        </div>

        <p className="text-2xl font-light mb-16">
          Wavepage convert article into presentation with AI voices. Write the
          aticle add the images and AI will make presentation with vocie-over -
          simply.
        </p>

        <p className="text-center mb-16">
          <a
            href="https://wavepage.netlify.app/doc/202a401e-de3d-404d-8d3d-76213fae73c0"
            className="text-4xl rounded-lg py-2 px-4 text-wite bg-green-500 border-2 border-green-500"
          >
            Go to editor
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
            src="https://www.youtube.com/embed/YVEuU6gbvqI"
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
