import React from "react";
const LandingPage = () => {
  const appTitle = "Wavepage is editor for multimedia";
  const appDefinition = "";
  return (
    <>
      <article
        id="content"
        data-key="{{page.key}}"
        className="max-w-3xl m-auto text-xl leading-snug px-2"
      >
        <p className="text-4xl font-light pt-16 mb-16">
          Wavepage is editor for{" "}
          <a href="https://youtu.be/Q5eY9k3v4mE?t=68" className="">
            multimedia learning
          </a>
        </p>

        <p className="text-2xl font-light mb-16">
          Add text with images and audio layer will automatically synchronize.
          Convert internet knowleadge into better learning experience - simply
        </p>

        <div className="mb-16">
          <img
            src="https://res.cloudinary.com/dhxmg9p4i/image/upload/v1591053105/blog/atom.png"
            alt=""
          />
        </div>

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

        <div className="mb-16">
          <iframe
            className="m-auto"
            width="560"
            height="340"
            src="https://www.youtube.com/embed/YVEuU6gbvqI"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-2xl font-light mb-16">
          Basic premise with multimedia learning is that we can learn more
          deeply from words and pictures together than we can from just words
          alone. This basic premise might explain why so many people are able to
          pick up new hobbies or learn new skills from YouTube videos. When
          learning to knit, the video of an expert knitter creating a scarf
          along with their verbal explanation helps a novice understand and
          learn.
        </p>

        <section className="">
          <p className="text-2xl font-light mb-16">
            If you have any question just
          </p>
          <p className="text-center mb-16">
            <a
              href="mailto:simon@loners.company"
              className="text-2xl rounded-lg py-2 px-3 text-green-500 border-2 border-green-500"
            >
              Contact me :)
            </a>
          </p>
        </section>
      </article>

      <div className="max-w-lg m-auto mb-16">
        <div className="border-2 border-gray-700  rounded p-4 flex flex-col justify-between leading-normal">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="https://pbs.twimg.com/profile_images/1264719053282840576/A90GsbPX_400x400.jpg"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="">
              <p className="leading-none">Šimon Bařák</p>
              <p className="text-gray-600">
                <a href="https://twitter.com/S_SCHITACCI">@S_SCHITACCI</a>
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="">
              Visual learner working on a tool for multimedia learning. I
              started with the editor for text-to-speech. Test it till make it
              🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
