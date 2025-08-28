import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white">
        <div className="relative w-screen md:h-[90vh] h-auto">
          {/* Blurred Background */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover blur-lg"
            src="/homePageBanner.jpg"
            alt=""
          />

          {/* Foreground Content */}
          <div className="relative mx-auto md:mt-10 md:w-[80vw] w-[90vw] md:h-[70vh] h-auto z-10">
            <img
              className="w-full h-auto max-h-[70vh] object-cover rounded-lg"
              src="/homePageBanner.jpg"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full z-20 bg-black opacity-20 shadow-gray-700 shadow-2xl rounded-lg"></div>

            {/* Text Content */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-center px-4">
              <div className="z-30">
                <div className="font-bold text-4xl md:text-5xl mb-2">Fan Pulse</div>
                <p className="my-2 text-sm md:text-base">
                  A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
                </p>
                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                  <Link
                    href="/about"
                    type="button"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
                 rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    About us
                  </Link>
                  <Link
                    href="/feedback"
                    type="button"
                    className="hidden md:inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 
                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
                 rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="bg-white h-1 opacity-10"></div>

      <div className="list ">
        <div className="connect_suppoters p-5 flex md:flex-row flex-col gap-20 w-[80vw] mx-auto ">
          <img className="border-2 border-gray-600" src="/support_creater.jpg" width={400} height={400} alt="" />
          <div className="flex flex-col gap-10">
            <h1 className="font-bold text-3xl underline">Connect with Your Supporters</h1>
            <span className="font-bold text-xl">Turn your audience into your biggest supporters. Whether you&apos;re an artist, gamer, or educator, give your fans a simple way to show love for your work.</span>
          </div>
        </div>
        <div className="bg-white h-1 opacity-10"></div>
        <div className="connect_suppoters p-5 flex md:flex-row flex-col gap-20 w-[80vw] mx-auto ">
          <img className="border-2 md:hidden block border-gray-600" src="/recive_payment.jpg" width={400} height={400} alt="" />
          <div className="flex flex-col gap-10">
            <h1 className="font-bold text-3xl underline">Receive Instant Contributions</h1>
            <span className="font-bold text-xl">Your fans can send you tips or contributions instantly no complex setup, no waiting. Just share your page and start receiving support right away.</span>
          </div>
          <img className="border-2 border-gray-600 md:block hidden" src="/recive_payment.jpg" width={400} height={400} alt="" />
        </div>
        <div className="bg-white h-1 opacity-10"></div>
        <div className="connect_suppoters p-5 flex md:flex-row flex-col gap-20 w-[80vw] mx-auto ">
          <img className="border-2 border-gray-600" src="/creative_journey.jpg" width={400} height={400} alt="" />
          <div className="flex flex-col gap-10">
            <h1 className="font-bold text-3xl underline">Grow Your Creative Journey</h1>
            <span className="font-bold text-xl">Use the funds to invest in better tools, create more content, and take your passion to the next level all powered by the people who believe in you.</span>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white w-full flex flex-col items-center py-14">
        <h2 className="text-3xl font-bold text-center mb-8">Learn More About Fund Rasing</h2>

        <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/2b-H6HWRtBo?si=NWO_BljK37FMYn1U"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>


    </>
  );
}