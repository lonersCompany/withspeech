import React from "react";
const LandingPage = () => {
  const appTitle = "Create video from article - simply";
  const appDefinition =
    "Lifelike AI speakers will synchronize your text and images with calm voice. Make presentation from your article in minutes not hours. WavePage support multiple languages -> English, German, French or Mandarin backed by Amazon Cloud Services.";
  return (
    <>
      <article
        id="content"
        data-key="{{page.key}}"
        className="container text-xl m-auto leading-snug px-2 bg-gray-900"
      >
        <div className="m-auto max-w-3xl mb-16">
          <p className="text-4xl font-light pt-32 mb-16">{appTitle}</p>

          <div className="mb-16">
            <img
              src="https://res.cloudinary.com/dhxmg9p4i/image/upload/v1591053105/blog/atom.png"
              alt=""
            />
          </div>

          <p className="text-2xl font-light mb-16">{appDefinition}</p>

          <p className="text-center mb-16">
            <a
              href="https://wavepage.netlify.app/doc/9fec123e-c15a-43a2-bfba-2720ce240085"
              className="text-2xl rounded-lg py-2 px-3 text-green-500 border-2 border-green-500"
            >
              Try beta version{" "}
              <span role="img" aria-label="" description="wave hand">
                🖖🏼
              </span>
            </a>
          </p>

          <div>
            <iframe
              width="100%"
              height="340"
              src="https://www.youtube.com/embed/Qa8Ro4dMgKA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </article>

      <section className="">
        <div className="max-w-lg m-auto mb-16">
          <div className="border-2 border-gray-700  rounded p-4 flex flex-col justify-between leading-normal">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="https://pbs.twimg.com/profile_images/1264719053282840576/A90GsbPX_400x400.jpg"
                alt="Avatar of Jonathan Reinink"
              />
              <div className="">
                <p className="leading-none">Schitacci</p>
                <p className="text-gray-600">
                  <a href="https://twitter.com/S_SCHITACCI">@S_SCHITACCI</a>
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="">
                I'm learning every day on the internet 👁️ I'm a visual learner
                and I love visualize concepts 📈 I develop wavepage for
                converting my favorite blogs into presentation mode and listen
                to them.
                <a className="text-blue-500" href="mailto:simon@loners.company">
                  simon@loners.company
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <p className="text-center text-2xl font-light mb-16">
          We will love to shape wavepage for your needs.
        </p>
        <p className="text-center">
          <a
            href="mailto:simon@loners.company"
            className="text-2xl rounded-lg py-2 px-3 text-green-500 border-2 border-green-500"
          >
            Contact me
          </a>
        </p>
      </section>

      <section className="py-16">
        <div className="text-center">
          <p className="leading-none mb-5">
            <a className="text-blue-500" href="mailto:simon@loners.company">
              simon@loners.company
            </a>
          </p>
          <p className="leading-none">
            <a className="text-blue-500" href="https://twitter.com/S_SCHITACCI">
              @S_SCHITACCI
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
